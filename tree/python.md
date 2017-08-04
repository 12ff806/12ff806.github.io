---
layout: tree
tree: active
notes: passive
projects: passive
title: Python
date: 2017-07-12
---


{::options auto_ids="false" /}


## Python 基础

* 基础数据类型
  * 数字
    * 整型
    * 浮点
  * 字符串
  * bytes
  * 布尔
    * True
    * False
  * 列表 (可变的/切片/可迭代/列表生成式)
  * 元组 (不可变/可迭代/切片)
  * 字典 (可迭代)
  * 集合
  * None
* 变量
* 常量
* 字符编码
* 控制语句
  * if else
  * for
  * while
* 函数
  * 函数参数
    * 位置参数
    * 默认参数
    * 可变参数 (tuple)
    * 关键字参数 (dist)
    * 命名关键字参数
    * 参数组合
  * 高阶函数
    * map/reduce
    * filter
    * sorted
  * 返回函数 Closure
  * lambda 匿名函数
  * 装饰器
  * 偏函数
  * 递归函数 (栈溢出的问题)
    * 阶乘
    * 汉诺塔
* generator
  * (http://pyzh.readthedocs.io/en/latest/the-python-yield-keyword-explained.html)
  * (http://blog.theerrorlog.com/yield-from-in-python-3.html)
* iterator
* 模块
  * 使用模块
  * 安装第三方模块
* 面向对象
  * 类和实例
  * 访问限制(私有属性)
  * 继承和多态
  * 获取对象信息
  * 实例属性和类属性
  * 使用 \_\_slots\_\_
  * 使用 @property
  * 多重继承
  ^
  * 定制类
  * 使用枚举类 
  * 使用元类
  {: .important }


## 错误/调试/测试

* 错误处理
* 调试
* 单元测试
* 文档测试


## IO操作

* 文件读写
* StringIO
* BytesIO
* 操作文件和目录
* 序列化
* json


## 进程和线程

* 多进程
* 多线程
* ThreadLocal
* 进程 vs 线程
* 分布式进程


## 正则表达式


## virtualenv


## 常用内建模块

* datetime
* collections
* base64
* struct
* hashlib
* itertools
* contextlib
* XML
* HTMLParser
* urllib


## 常用第三方模块

* PIL (Pillow)


## 图形界面

* tkinter


## 网络编程

* TCP/IP 简介
* TCP 编程
* UDP 编程


## 电子邮件

* SMTP 发送邮件
* POP3 收取邮件


## 数据库

* SQLite
* MySQL
* SQLAlchemy


## Web开发

* HTTP 协议简介
* HTML 简介
* WSGI 接口
* Flask 框架
* 模板引擎
* links
  * (http://www.cnblogs.com/oceansea/p/5939453.html)
  * (https://spacewander.github.io/explore-flask-zh/index.html)


## 异步IO

* 协程
* asyncio
* async/await
* aiohttp
* links
  * (http://www.dabeaz.com/coroutines)
  * (http://www.dabeaz.com/coroutines/Coroutines.pdf)
  * (https://ipfans.github.io/2015/10/coroutines-with-async-and-await-syntax-chinese)


## python 设计模式

* (https://yq.aliyun.com/articles/70448?utm_campaign=wenzhang&utm_medium=article&utm_source=QQ-qun&utm_content=m_11961)
* (https://yq.aliyun.com/articles/70418?utm_campaign=wenzhang&utm_medium=article&utm_source=QQ-qun&utm_content=m_11962)
* (https://yq.aliyun.com/articles/70417?utm_campaign=wenzhang&utm_medium=article&utm_source=QQ-qun&utm_content=m_11130)
* (https://yq.aliyun.com/articles/70416?utm_campaign=wenzhang&utm_medium=article&utm_source=QQ-qun&utm_content=m_11963)
* (https://yq.aliyun.com/articles/70451?utm_campaign=wenzhang&utm_medium=article&utm_source=QQ-qun&utm_content=m_11964)
* (https://yq.aliyun.com/articles/70738?utm_campaign=wenzhang&utm_medium=article&utm_source=QQ-qun&utm_content=m_11965)
* (https://yq.aliyun.com/articles/70737?utm_campaign=wenzhang&utm_medium=article&utm_source=QQ-qun&utm_content=m_11966)
* (https://yq.aliyun.com/articles/70536?utm_campaign=wenzhang&utm_medium=article&utm_source=QQ-qun&utm_content=m_11967)
* (https://yq.aliyun.com/articles/70532?utm_campaign=wenzhang&utm_medium=article&utm_source=QQ-qun&utm_content=m_11968)
* (https://yq.aliyun.com/articles/70535?utm_campaign=wenzhang&utm_medium=article&utm_source=QQ-qun&utm_content=m_11422)
* (https://yq.aliyun.com/articles/70529?utm_campaign=wenzhang&utm_medium=article&utm_source=QQ-qun&2017315&utm_content=m_13620)
* (https://yq.aliyun.com/articles/71072?utm_campaign=wenzhang&utm_medium=article&utm_source=QQ-qun&2017315&utm_content=m_13621)
* (https://yq.aliyun.com/articles/71071?utm_campaign=wenzhang&utm_medium=article&utm_source=QQ-qun&2017315&utm_content=m_13622)
* (https://yq.aliyun.com/articles/71074?utm_campaign=wenzhang&utm_medium=article&utm_source=QQ-qun&2017315&utm_content=m_13623)
* (https://yq.aliyun.com/articles/71070?utm_campaign=wenzhang&utm_medium=article&utm_source=QQ-qun&2017315&utm_content=m_13624)
* (https://yq.aliyun.com/articles/71073?utm_campaign=wenzhang&utm_medium=article&utm_source=QQ-qun&2017315&utm_content=m_13625)
* (https://yq.aliyun.com/articles/71069?utm_campaign=wenzhang&utm_medium=article&utm_source=QQ-qun&2017315&utm_content=m_13626)
* (https://yq.aliyun.com/articles/71068?utm_campaign=wenzhang&utm_medium=article&utm_source=QQ-qun&2017315&utm_content=m_13627)
* (https://yq.aliyun.com/articles/71075?utm_campaign=wenzhang&utm_medium=article&utm_source=QQ-qun&2017315&utm_content=m_13628)
* (https://yq.aliyun.com/articles/71066?utm_campaign=wenzhang&utm_medium=article&utm_source=QQ-qun&2017315&utm_content=m_13629)
* (https://yq.aliyun.com/articles/71065?utm_campaign=wenzhang&utm_medium=article&utm_source=QQ-qun&2017315&utm_content=m_13630)
* (https://yq.aliyun.com/articles/71199?spm=5176.100239.blogrightarea71065.20.2HNSXH)
* (https://yq.aliyun.com/articles/71198?spm=5176.100239.blogrightarea71199.19.RvOO6g)
* (https://yq.aliyun.com/articles/71197?spm=5176.100239.blogrightarea71198.21.pK1m5H)


## 爬虫

* 网络基础
* http 协议
* urllib requests
* headers cookie session https
* xml html 解析: BeautifulSoup htmlparse
* json 解析: json
* pdf 解析: 
* excel 解析: 
* Scrapy
* PhantomJS
* Selenium
* 反爬策略
* 反反爬的方案
* 代理 tor adsl 处理 IP 封禁的方式
* 多线程 多进程 异步
* 分布式爬虫 (日采集多少W)
* 分布式数据库 mysql mongodb redis
* 模拟登录 支付宝
* 验证码 字符验证码 滑动验证码 12306验证码
* 增量数据爬取 增量式抓取
* 爬虫架构设计
* books
  * Python网络数据采集.pdf
* links
  * (http://aosabook.org/en/500L/a-web-crawler-with-asyncio-coroutines.html)
  * (http://drafts.damnever.com/2015/A-Web-Crawler-With-asyncio-Coroutines.html)
  * (https://compiletoi.net/fast-scraping-in-python-with-asyncio)
  * (http://cuiqingcai.com/category/technique/python)
  * (http://xchaoinfo.github.io)
  * (https://yq.aliyun.com/articles/26043?utm_campaign=wenzhang&utm_medium=article&utm_source=QQ-qun&utm_content=m_11234)
  * (https://yq.aliyun.com/articles/26030?utm_campaign=wenzhang&utm_medium=article&utm_source=QQ-qun&utm_content=m_11235)
  * (https://yq.aliyun.com/articles/26050?utm_campaign=wenzhang&utm_medium=article&utm_source=QQ-qun&utm_content=m_11236)
* proxy ip
  * (http://www.xicidaili.com/nn/)


## 项目

* awesome-python-webapp
  * (https://www.liaoxuefeng.com/wiki/0014316089557264a6b348958f449949df42a6d3a2e542c000/001432170876125c96f6cc10717484baea0c6da9bee2be4000)
* 500 Lines or Less
  * (http://www.aosabook.org/en/index.html)
  * (https://github.com/aosabook/500lines)
* Let’s Build A Web Server
  * (https://ruslanspivak.com/lsbaws-part1)
  * (https://ruslanspivak.com/lsbaws-part2)
  * (https://ruslanspivak.com/lsbaws-part3)
  * (http://codingpy.com/article/build-a-simple-web-server-part-one)
  * (http://codingpy.com/article/build-a-simple-web-server-part-two)
  * (http://codingpy.com/article/build-a-simple-web-server-part-three)
* Let’s Build A Simple Interpreter
  * (https://ruslanspivak.com/lsbasi-part1)
  * (https://ruslanspivak.com/lsbasi-part2)
  * (https://ruslanspivak.com/lsbasi-part3)
  * (https://ruslanspivak.com/lsbasi-part4)
  * (https://ruslanspivak.com/lsbasi-part5)
  * (https://ruslanspivak.com/lsbasi-part6)
  * (https://ruslanspivak.com/lsbasi-part7)
  * (https://ruslanspivak.com/lsbasi-part8)
  * (https://ruslanspivak.com/lsbasi-part9)
  * (https://ruslanspivak.com/lsbasi-part10)
  * (https://ruslanspivak.com/lsbasi-part11)
  * (https://ruslanspivak.com/lsbasi-part12)
  * (https://ruslanspivak.com/lsbasi-part13)
  * (https://ruslanspivak.com/lsbasi-part14)
  * (http://blog.jobbole.com/88152)
  * (http://blog.jobbole.com/88347)
  * (http://blog.jobbole.com/90055)
  * (http://blog.jobbole.com/94326)
  * (http://blog.jobbole.com/94686)
  * (http://blog.jobbole.com/95145)
* 爬取在线教程制作成 PDF
  * (https://foofish.net/python-crawler-html2pdf.html)
  * (https://github.com/lzjun567/crawler_html2pdf/tree/master/pdf)
* fuck-login
  * (https://github.com/xchaoinfo/fuck-login)
* show-me-the-code
  * (https://github.com/Yixiaohan/show-me-the-code)
* zhihuSayHi
  * (https://github.com/nekocode/zhihuSayHi)
* Django blog
  * (http://zmrenwu.com/category/django-blog-tutorial)
  * (https://github.com/zmrenwu/django-blog-tutorial)
* 微信机器人
  * (http://wxpy.readthedocs.io/zh/latest/index.html)
* 一个全栈增长工程师的练手项目集
  * (https://github.com/phodal/ideabook)
  * (http://ideabook.phodal.com)
* 30天尝试新事情
  * (http://30daydo.com)
  * (https://github.com/Rockyzsu?tab=repositories)
* python_koans
  * https://github.com/gregmalcolm/python_koans
* pip-pop
  * (https://github.com/kennethreitz/pip-pop)
* envoy
  * (https://github.com/kennethreitz/envoy)
* Records: SQL for Humans
  * (https://github.com/kennethreitz/records)
* pluginbase
  * (https://github.com/mitsuhiko/pluginbase)
* pipsi
  * (https://github.com/mitsuhiko/pipsi)
* unp
  * (https://github.com/mitsuhiko/unp)
* cheat
  * (https://github.com/chrisallenlane/cheat)
* Blinker
  * (https://github.com/jek/blinker)
* platter
  * (https://github.com/mitsuhiko/platter)
* Tablib: format-agnostic tabular dataset library
  * (https://github.com/kennethreitz/tablib)
* python-patterns
  * (https://github.com/faif/python-patterns)
* werkzeug
  * (https://github.com/pallets/werkzeug)
* Bottle: Python Web Framework
  * (https://github.com/bottlepy/bottle)
* tinydb
  * (https://github.com/msiemens/tinydb)
* peewee
  * (https://github.com/coleifer/peewee)
* click
  * (https://github.com/pallets/click)
* flask-sqlalchemy
  * (https://github.com/mitsuhiko/flask-sqlalchemy)
* httpbin
  * (https://github.com/kennethreitz/httpbin)
* psdash
  * (https://github.com/Jahaja/psdash)
* flask-website
  * (https://github.com/pallets/flask-website)
* warehouse
  * (https://github.com/pypa/warehouse)
  * (https://pypi.org)
* Discover Flask
  * (https://github.com/realpython/discover-flask)
* The Flask Mega-Tutorial
  * (https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world)
* Jinja2
  * (https://github.com/pallets/jinja)
* redis-py
  * (https://github.com/andymccurdy/redis-py)
* PyMongo
  * (https://github.com/mongodb/mongo-python-driver)
* redash
  * (https://github.com/getredash/redash)
* robobrowser
  * (https://github.com/jmcarp/robobrowser)
* explainshell
  * (https://github.com/idank/explainshell)
* Tomorrow
  * (https://github.com/madisonmay/Tomorrow)
* sh
  * (https://github.com/amoffat/sh)
* sandman
  * (https://github.com/jeffknupp/sandman)
* gunicorn
  * (https://github.com/benoitc/gunicorn)
* path.py
  * (https://github.com/jaraco/path.py)
* sorted_containers
  * (https://github.com/grantjenks/sorted_containers)
* Open Mining
  * (https://github.com/mining/mining)
* Wagtail CMS
  * (https://github.com/wagtail/wagtail)
* huey - a little task queue
  * (https://github.com/coleifer/huey)
* Flask API
  * (http://www.flaskapi.org)
* Super Mario Bros Level 1
  * (https://github.com/justinmeister/Mario-Level-1)
* Algorithms in Python
  * (https://github.com/prakhar1989/Algorithms)
* rumps
  * (https://github.com/jaredks/rumps)
* psdash
  * (https://github.com/Jahaja/psdash)
* Base 16 for IPython Notebook
  * (https://github.com/nsonnad/base16-ipython-notebook)
* Jarvis
  * (https://github.com/debugger22/Jarvis)
* Python Practice Projects
  * (http://pythonpracticeprojects.com)
* Flask Foundation
  * (https://github.com/JackStouffer/Flask-Foundation)
* stellar
  * (https://github.com/fastmonkeys/stellar)
* percol
  * (https://github.com/mooz/percol)
* magpie
  * (https://github.com/charlesthomas/magpie)
* Explore Flask
  * (https://exploreflask.com/en/latest)
* The Stolen Crown: A mini-RPG
  * (https://github.com/justinmeister/The-Stolen-Crown-RPG)
* Django-quicky
  * (https://github.com/sametmax/django-quicky)
* doitlive
  * (https://github.com/sloria/doitlive)
* Data Science 45-min Intros
  * (https://github.com/DrSkippy/Data-Science-45min-Intros)
* battleschool
  * (https://github.com/spencergibb/battleschool)
* Awesome Python
  * (https://github.com/vinta/awesome-python)
* Nylas Sync Engine
  * (https://github.com/nylas/sync-engine)
* Awesome Machine Learning
  * (https://github.com/josephmisiti/awesome-machine-learning)
* python-fields
  * (https://github.com/ionelmc/python-fields)
* Must-watch videos about Python
  * (https://github.com/s16h/py-must-watch)
* awesome-django
  * (https://github.com/rosarior/awesome-django)
* Toga
  * (https://pybee.org/project/projects/libraries/toga)
* Doorman
  * (https://github.com/halitalptekin/doorman)
* vim-bootstrap
  * (https://github.com/avelino/vim-bootstrap)
* flask-xxl
  * (https://github.com/jstacoder/flask-xxl)
* Awesome SQLAlchemy
  * (https://github.com/dahlia/awesome-sqlalchemy)
* Lenscap
  * (https://github.com/honza/lenscap)
* Schematics
  * (https://github.com/schematics/schematics)
* Home Assistant
  * (https://github.com/home-assistant/home-assistant)
* Tortilla
  * (https://github.com/redodo/tortilla)
* iterstuff
  * (https://github.com/mobify/iterstuff)


