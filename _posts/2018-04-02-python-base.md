---
layout: post
tree: passive
notes: active
projects: passive
title: Python 基础
date: 2018-04-02
---


## 参数传递

~~~python3
a = 1
def fun(a):
    a = 2
fun(a)
print(a)    # 1
~~~

~~~python3
a = [1]
def fun(a):
    a = [2]
fun(a)
print(a)    # [1]
~~~

~~~python3
a = []
def fun(a):
    a.append(1)
fun(a)
print(a)    # [1]
~~~


## 元类

元类就是创建类的东西。元类创建类，类创建实例。用class定义类本质上是使用内建函数type来创建。type函数的定义为：

~~~python3
type(类名, 父类的元组, 包含属性的字典)
~~~

type就是python的内建元类。当然，也可以创建自己的元类，在定义类的时候添加一个\_\_metaclass\_\_属性。如果一个类C中定义了\_\_metaclass\_\_属性，Python就会在内存中通过\_\_metaclass\_\_创建一个名字为C的类对象。如果Python没有找到\_\_metaclass\_\_，它会继续在C继承的父类中寻找\_\_metaclass\_\_，并尝试做和前面同样的操作。如果Python在任何父类中都找不到\_\_metaclass\_\_，它就会在模版层次中去寻找\_\_metaclass\_\_，并尝试做同样的动作。如果还是找不到\_\_metaclass\_\_，Python就会用内置的type来创建这个类对象。

现在的问题就是，如何用\_\_metaclass\_\_来创建一个类呢？type，或者任何使用到type或者子类化type的东西都可以。


## 类方法和静态方法

Python中有三种方法，实例方法、类方法(classmethod)、静态方法(staticmethod)

~~~python3
def foo(x):
    print("executing foo(%s)" % (x,))

class A(object):
    def foo(self, x):
        print("executing foo(%s, %s)" % (self, x))
    
    @classmethod
    def class_foo(cls, x):
        print("executing class_foo(%s, %s)" % (cls, x))
      
    @staticmethod
    def static_foo(x):
        print("executing static_foo(%s)" % (x,))

a = A()
~~~

<table>
<tr>
<td>\</td><td>实例方法</td><td>类方法</td><td>静态方法</td>
</tr>
<tr>
<td>a=A()</td><td>a.foo(x)</td><td>a.class_foo(x)</td><td>a.static_foo(x)</td>
</tr>
<tr>
<td>A</td><td>不可用</td><td>A.class_foo(x)</td><td>A.static_foo(x)</td>
</tr>
</table>


## 类变量和实例变量

类变量就是供类使用的，实例变量就是供实例使用的。

~~~python3
class Person:
    name = "aaa"

p1 = Person()
p2 = Person()
p1.name = "bbb"
print(p1.name)    # bbb
print(p2.name)    # aaa
print(Person.name)    # aaa
~~~

~~~python3
class Person:
    name = []

p1 = Person()
p2 = Person()
p1.name.append(1)
print(p1.name)    # [1]
print(p2.name)    # [1]
print(Person.name)    # [1]
~~~


## Python自省

获得对象的类型、属性等，比如type(), dir(), getattr(), hasattr(), isinstance(), id().


## 私有属性

~~~python3
class MyClass():
    def __init__(self):
        self.__superprivate = "Hello"
        self._semiprivate = "World"

mc = MyClass()
print(mc.__superprivate)    # AttributeError: myClass instance has no attribute '__superprivate'
print(mc._semiprivate)    # World
print(mc.__dict__)    # {'_MyClass__superprivate': 'Hello', '_semiprivate': 'World'}
~~~

\_\_foo\_\_: Python内部的名字，用来区别其他用户自定义的命名。能直接访问。

\_\_foo: 私有属性，不能直接访问。

\_foo: 一种用来指定私有变量的命名约定。可直接访问，但不建议。


## 字符串格式化：% 和 .format

~~~python3
"Hi there %s" % name
~~~

如果name恰好是一个元组：(1, 2, 3)，它会抛出TypeError异常。为了保证它总是正确的，可以这么做：

~~~python3
"Hi there %s" % (name, )
~~~


## 函数参数及\*args & \**kwargs

用\*args和\*\*kwargs只是为了方便。当你不确定你的函数里将要传递多少参数的时候，可以使用*args，它可以传递任意数量的参数。相似的，\*\*kwargs允许你使用没有事先定义的参数名：

~~~python3
def print_everything(*args):
    for count, thing in enumerate(args):
        print("{0}. {1}".format(count, thing))
        
print_everything("apple", "banana", "cabbage")
~~~

~~~python3
def table_things(**kwargs):
    for name, value in kwargs.items():
        print("{0} = {1}".format(name, value))

table_things(apple="fruit", cabbage="vegetable")
~~~

\*args和\**kwargs可以同时在函数中使用，顺序必须是：必选参数、默认参数、可变参数、命名关键字参数、关键字参数。

~~~python3
def f1(a, b, c=0, *args, **kwargs):
    print("a =", a, "b =", b, "c =", c, "args =", args, "kwargs =", kwargs)
    
def f2(a, b, c=0, *, d, **kwargs):
    print("a =", a, "b =", b, "c =", c, "d =", d, "kwargs =", kwargs)
~~~


## copy & deepcopy

~~~python3
import copy

a = [1, 2, 3, 4, ["a", "b"]]
b = a
c = copy.copy(a)
d = copy.deepcopy(a)

a.append(5)
a[4].append("c")

print("a =", a)
print("b =", b)
print("c =", c)
print("d =", d)

# output:
> a = [1, 2, 3, 4, ["a", "b", "c"], 5]
> b = [1, 2, 3, 4, ["a", "b", "c"], 5]
> c = [1, 2, 3, 4, ["a", "b", "d"]]
> d = [1, 2, 3, 4, ["a", "b"]]
~~~


## \_\_new\_\_ & \_\_init\_\_

* 创建一个新实例时调用\_\_new\_\_，初始化一个实例时用\_\_init\_\_。
* 先调用\_\_new\_\_，后调用\_\_init\_\_。
* \_\_new\_\_是一个静态方法，\_\_init\_\_是一个实例方法。
* \_\_new\_\_方法返回一个创建的实例，\_\_init\_\_什么都不返回。


## 单例模式

实现一, 通过改写\_\_new\_\_方法来实现：

~~~python3
class Singleton(object):
    def __new__(cls, *args, **kwargs):
        if not hasattr(cls, _instance):
            cls._instance = super(Singleton, cls).__new__(cls, *args, **kwargs)
        return cls._instance

class MyClass(Singleton):
    pass
~~~

实现二，通过import实现：

~~~python3
# singleton.py
class Singleton(object):
    def foo(self):
        pass
 
my_singleton = Singleton()

# to use
from singleton import my_singleton
my_singleton.foo()
~~~

实现三，通过装饰器来实现：

~~~python3
def singleton(cls, *args, **kwargs):
    instance = {}
    def getinstance():
        if cls not in instance:
            instance[cls] = cls(*args, **kwargs)
        return instance[cls]
    return getinstance
    
@singleton
class MyClass(object):
    pass
~~~

实现四，通过改写属性字典来实现：

~~~python3
class Singleton(object):
    _state = {}
    def __new__(cls, *args, **kwargs):
        ob = super(Singleton, cls).__new__(cls, *args, **kwargs)
        ob.__dict__ = cls._state
        return ob

class MyClass(Singleton):
    pass
~~~


## super方法

super并不是指父类，而是MRO中的下一个类。super其实干的是这件事：

~~~python3
def super(cls, inst):
    mro = inst.__class__.mro()
    return mro[mro.index(cls) + 1]
~~~


## GIL

由于GIL的存在，对于任何Python程序，不管处理器有多少核，任何时候都只有一个线程在执行。


## 列表生成式

~~~python3
d = [x**2 for x in range(10)]
~~~


## 字典生成式

~~~python3
d = {key: value for (key, value) in iterable}
~~~


## 集合生成式

~~~python3
d = {x**2 for x in range(10)}
~~~


## \_\_future\_\_

用来兼容python2和python3，如在python2中使用print()函数

~~~python2
from __future__ import print_function

print("print function in python2")
~~~


## for-else语句

for循环后可以接一个else从句，这个else从句会在循环正常结束时执行。即循环没有遇到任何的break。


## Python中的作用域

变量作用域分为局部作用域，嵌套作用域，全局作用域，内置作用域。
在函数内部修改全局变量需要使用"global"关键字
在函数内部修改嵌套作用域变量需要使用"nonlocal"关键字


## 垃圾回收机制


## with 上下文管理器

### 用类实现

### 用生成器实现


## 闭包


## 匿名函数


## 函数式编程


## 函数缓存


## 装饰器

### 用函数实现

### 用类实现


## 鸭子类型


## 新式类和旧式类


## 多进程 & 多线程


## 迭代器和生成器


## 协程和异步IO


## select & poll & epoll


## C扩展

