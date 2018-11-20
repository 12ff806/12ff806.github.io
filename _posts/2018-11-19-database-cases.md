---
layout: post
tree: passive
notes: active
projects: passive
title: 数据库使用案例
date: 2018-11-19
---


{::options auto_ids="false" /}


## 简介 ##

数据库的简单应用


## 前期准备 ##

假设数据库用户名、密码和数据库都为"test"，在"test"数据库中创建一张数据表"test"，以下用sqlalchemy来创建：

~~~python3
from sqlalchemy import (
    MetaData, Table, Column, Integer, String, Date, DateTime
)
from sqlalchemy.sql import func

meta = MetaData()

# 定义数据表"test"的结构
test = Table(
    "test", meta,
    
    Column('id', Integer),
    Column('code', String(18), primary_key=True, nullable=True),
    Column('name', String(50), nullable=True),
    Column('create_time', DateTime, server_default=func.now()),
    Column('update_time', DateTime, server_default=func.now(), onupdate=func.now())
)

# 连接本地数据库"test"
DSN = "mysql+pymysql://{user}:{password}@{host}:{port}/{database}"
DB_URL = DSN.format(user='test', password='test', host='127.0.0.1', port='3306', database='test')
db_engine = create_engine(DB_URL)

# 创建数据库表"test"
def create_tables(engine=db_engine):
    meta = MetaData()
    tables = [test,]
    meta.create_all(bind=engine, tables=tables)
    
# 删除数据库表"test"
def drop_tables(engine=db_engine):
    meta = MetaData()
    tables = [test,]
    meta.drop_all(bind=engine, tables=tables)

if __name__ == "__main__":
    drop_tables(engine=db_engine)
    create_tables(engine=db_engine)

~~~


## 将字段"id"设为自增 ##

因为"id"字段不是主键，默认并不是自增的，需要修改表定义。

在Mysql中：

~~~sql
$ mysql -h 127.0.0.1 -utest -p
mysql> show databases;
mysql> use test;
mysql> show tables;
mysql> desc test;
mysql> ALTER TABLE test CHANGE id id INT(11) NOT NULL AUTO_INCREMENT, ADD key(id);
~~~

在Postgresql中：

~~~sql
BEGIN;
CREATE SEQUENCE test_id_seq INCREMENT BY 1 MINVALUE 1 NO MAXVALUE START WITH 1;
ALTER TABLE test
    ALTER COLUMN id SET DEFAULT nextval('test_id_seq');
COMMIT;
~~~


## 自动填充"update_time"字段 ##

如上述使用sqlalchemy定义表中使用"onupdate=func.now()"的方式，在mysql和pg中测试都不奏效。所以下面用触发器的方式来实现：

在mysql中：

~~~sql
DELIMITER $$
CREATE TRIGGER test_update_time_trigger
BEFORE UPDATE
ON test
FOR EACH ROW
BEGIN
    SET NEW.update_time = now();
END$$
DELIMITER ;
~~~

在postgresql中：

~~~sql
-- 定义更新函数
BEGIN;
CREATE OR REPLACE FUNCTION update_time_modified_function()
RETURNS TRIGGER
AS
$$
BEGIN
    NEW.update_time = clock_timestamp();
    RETURN NEW;
END;
$$
language 'plpgsql';

-- 将更新函数应用在触发器上
CREATE TRIGGER test_update_time_trigger
BEFORE UPDATE
ON test
FOR EACH ROW
EXECUTE PROCEDURE update_time_modified_function();
~~~


## 自动生成"code"字段值 ##

在每次插入新记录的时候自动生成"code"字段的值。字段"code"值由一个字母"T"和一个占8位的数字组成，例如："T00000001"/"T00000012"。同样需要用触发器来实现：

在mysql中，不能定义序列，所以首先得实现一个自增序列。下面先创建一个表来存储当前的序列值：

~~~sql
CREATE TABLE `sequence_for_test` (
    `sequence_name`  varchar(64) NOT NULL COMMENT '序列名称',
    `value`  bigint NOT NULL DEFAULT 0 COMMENT '当前值',
    PRIMARY KEY (`sequence_name`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
;
~~~

向序列表中插入十条数据来记录序列值：

~~~sql
INSERT INTO sequence_for_test(sequence_name, value) VALUES 
('TEST_CODE_SEQUENCE_1', -9),
('TEST_CODE_SEQUENCE_2', -8),
('TEST_CODE_SEQUENCE_3', -7),
('TEST_CODE_SEQUENCE_4', -6),
('TEST_CODE_SEQUENCE_5', -5),
('TEST_CODE_SEQUENCE_6', -4),
('TEST_CODE_SEQUENCE_7', -3),
('TEST_CODE_SEQUENCE_8', -2),
('TEST_CODE_SEQUENCE_9', -1),
('TEST_CODE_SEQUENCE_10', 0);
~~~

接下来定义触发器。在每次插入新数据前，随机获取序列表中的任意一条记录的值，在此值的基础上加10作为当前的序列值来拼"code"字段的值。然后更新序列表中的记录。函数"NEXT_VAL"实现如下：

~~~sql
DELIMITER $$
CREATE FUNCTION NEXT_VAL(sequence_name varchar(64))
RETURNS bigint
BEGIN
    DECLARE current_val bigint;
    SET current_val = 0;
    -- 排他锁 会影响高并发性能 这也是建十组序列数据来记录的原因
    SELECT s.value INTO current_val FROM sequence_for_test s WHERE s.sequence_name = sequence_name FOR UPDATE;
    UPDATE sequence_for_test s SET s.value = s.value + 10 WHERE s.sequence_name = sequence_name;
    RETURN current_val + 10;
END$$
DELIMITER ;
~~~

触发器实现如下：

~~~sql
DELIMITER $$
CREATE TRIGGER test_code_auto_fill_trigger
BEFORE INSERT
ON test
FOR EACH ROW
BEGIN
    DECLARE nid bigint;
    SET @nid := NEXT_VAL(CONCAT('TEST_CODE_SEQUENCE_',CAST(FLOOR(10*RAND()+1) AS CHAR(2))));
    SET NEW.member_code := CONCAT('T', RIGHT(CONCAT('0000000', CAST(@nid AS CHAR(8))), 8));
END$$
DELIMITER ;
~~~


下面来看看在postgresql中的实现。因为"test"表中的"id"字段是自增的，这里借用"id"的值来生成"code"的值：

~~~sql
-- 定义生成函数
BEGIN;
CREATE OR REPLACE FUNCTION test_code_auto_fill()
RETURNS TRIGGER
AS
$$
DECLARE
    nid integer;
BEGIN
    -- NEW.id 的值已经等于 nextval('id_sequence_name') 的值了
    nid := NEW.id;
    NEW.member_code := 'T' || right('0000000' || cast(nid as varchar), 8);
    raise notice '%, id:%, member_code:%', TG_NAME, NEW.id, NEW.member_code;
    RETURN NEW;
END;
$$
LANGUAGE 'plpgsql';

-- 创建触发器调用生成函数
CREATE TRIGGER test_code_auto_fill_trigger
BEFORE INSERT
ON test
FOR EACH ROW
EXECUTE PROCEDURE test_code_auto_fill();
COMMIT;
~~~

为什么在mysql中没有使用"id"字段来生成"code"字段的值，而用表的方式创建了一个序列？这是因为在给"test"表插入记录前（即"BEFORE INSERT"）， 此时"NEW.id"的值为空的，不等于自增后的值，所以没办法使用。
