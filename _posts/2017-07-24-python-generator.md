---
layout: post
tree: passive
notes: active
projects: passive
title: Python 生成器
date: 2017-07-24
---

## 生成器表达式

生成器表达式跟列表生成式很像, 只需要将列表生成式的方括号换成圆括号, 就成了生成器表达式. 一个生成器表达式返回一个 generator 对象. generator 保存的是生成算法, 而不是具体的值, 这样的好处就是可以节省内存空间. 下面就来创建一个 generator:

~~~sh
>>> g = (x for x in range(10))
>>> g
<generator object <genexpr> at 0x7fa03b4000f8>
>>> from collections import Generator
>>> isinstance(g, Generator)
True
~~~

可以通过 next() 函数来获取 generator 的下一个返回值. 每次调用 next(g), 就计算出 g 的下一个值.

~~~sh
>>> next(g)
0
>>> next(g)
1
>>> next(g)
2
>>> next(g)
3
~~~

调用 next() 函数可以获取 generator 的值, 是因为 generator 对象实现了 \_\_next\_\_() 方法, 调用 next(g) 就等价于 g.\_\_next\_\_():

~~~sh
>>> hasattr(g, "__next__")
True
>>> g.__next__()
4
>>> g.__next__()
5
>>> g.__next__()
6
~~~

除了使用 next() 函数, 生成器自身还有一个 send() 方法也可以获取 generator 的值, 调用 next(g) 就相当于 g.send(None).

当生成式计算到最后一个值, 没有更多的值时, 生成器会抛出 StopIteration 的异常. 

~~~sh
>>> hasattr(g, "send")
True
>>> g.send(None)
7
>>> g.send(None)
8
>>> g.send(None)
9
>>> g.send(None)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
StopIteration
~~~

上面获取生成式的值都是一个一个去获取, 非常麻烦. 实际上还可以通过 for 循环来遍历所有的值, 因为 generator 是可迭代对象:

~~~sh
>>> g = (x for x in range(10))
>>> hasattr(g, "__iter__")
True
>>> from collections import Iterable
>>> isinstance(g, Iterable)
True
>>> for i in g:
...     print(i)
... 
0
1
2
3
4
5
6
7
8
9
~~~


## 生成器函数和 yield 表达式

如果生成算法比较复杂, 用生成器表达是无法实现时, 还可以使用生成器函数来实现. 下面用生成器函数实现 Fibonacci:

~~~python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-


def fib(num):
    a, b = 0, 1
    i = 0 
    while i < num:
        yield b
        a, b = b, a + b 
        i = i + 1
    return "Done"
~~~

包含 yield 表达式的函数不是一个普通的函数, 而是一个 generator. 生成器函数使用 yield 表达式来返回一个值. 生成器函数和普通函数执行流程不一样. 普通函数是顺序执行, 执行完所有语句或者遇到 return 语句就返回. 而生成器函数在初次调用 next() 函数或者 send() 方法的时候才开始执行, 遇到 yield 表达式返回, 下次执行时从上次返回的 yield 语句处继续执行. 调用普通函数返回的是函数返回结果, 而 generator 函数的"调用"实际返回一个 generator 对象:

~~~sh
>>> g = fib(8)
>>> g
<generator object fib at 0x7f23cc91db48>
~~~

同样使用 next() 函数, \_\_next\_\_() 方法 和 send() 方法来获取生成器的值:

~~~sh
>>> next(g)
1
>>> next(g)
1
>>> next(g)
2
>>> next(g)
3
>>> g.__next__()
5
>>> g.__next__()
8
>>> g.send(None)
13
>>> g.send(None)
21
>>> g.send(None)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
StopIteration: Done
~~~

使用 for 循环来遍历:

~~~sh
>>> g = fib(6)
>>> for i in g:
...     print(i)
... 
1
1
2
3
5
8
~~~

但是使用 for 循环遍历不能获取到生成器函数的 return 语句的返回值, 从上面的 StopIteration 异常中来看, 返回值包含在其中, 所以可以通过捕获异常来获取返回值:

~~~sh
>>> g = fib(6)
>>> while True:
...     try:
...         print(next(g))
...     except StopIteration as e:
...         print(e.value)
...         break
... 
1
1
2
3
5
8
Done
~~~

下面实现一个函数生成器, 依次返回杨辉三角中的每一行(把每一行当成一个list):

~~~python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-


def triangle(max):
    n = 0 
    l = [1] 
    while n < max:
        yield l
        l.append(0)
        l = [l[i-1]+l[i] for i in range(len(l))]
        n = n + 1
    return "Done"

g = triangle(10)
while True:
    try:
        x = next(g)
        print(x)
    except StopIteration as e:
        print(e.value)
        break
~~~

输出结果:

~~~sh
[1]
[1, 1]
[1, 2, 1]
[1, 3, 3, 1]
[1, 4, 6, 4, 1]
[1, 5, 10, 10, 5, 1]
[1, 6, 15, 20, 15, 6, 1]
[1, 7, 21, 35, 35, 21, 7, 1]
[1, 8, 28, 56, 70, 56, 28, 8, 1]
[1, 9, 36, 84, 126, 126, 84, 36, 9, 1]
Done
~~~


## 生成器的方法

先来看个例子:

~~~sh
>>> def echo(value=None):
...     print("Execution starts when 'next()' is called for the first time.")
...     try:
...         while True:
...             try:
...                 value = (yield value)
...             except Exception as e:
...                 value = e
...     finally:
...         print("Don't forget to clean up when 'close()' is called.")
... 
>>> g = echo(1)
>>> g
<generator object echo at 0x7fa8807bff10>
>>> next(g)
Execution starts when 'next()' is called for the first time.
1
>>> print(next(g))
None
>>> print(g.send(3))
3
>>> print(g.send("hello sin"))
hello sin
>>> g.throw(TypeError, "spam")
TypeError('spam',)
>>> g.close()
Don't forget to clean up when 'close()' is called.
~~~

generator.send(value)

yield 表达式不仅可以发送值, 还能接收值. 生成器的 send(value) 方法会发送一个值(参数 value)给生成器函数, 这个参数 value 就会被当前的 yield 表达式接收成为它的值. 同时 send(value) 方法会返回生成器 yield 的下一个值, 或者当生成器没有值的时候抛出 StopIteration 异常. 如果在 generator 刚生成的时候就调用 send() 方法, 那么 send() 的参数就必须使用 None, 因为这是时候生成器里还没有 yield 表达式能够接收这个参数 value.

generator.throw(type[, value[, traceback]])

在生成器上次停止的地方抛出一个 type (参数 type) 类型的异常, 并且返回生成器的下一个值. 如果正好生成器没有值了, 就会抛出 StopIteration 的异常. 如果生成器函数没有捕获 throw() 方法传送的异常, 或者生成器函数抛出了一个不一样的异常, 那么这个异常会传递给调用者.

generator.close()

在生成器上次停止的地方抛出一个 GeneratorExit 异常, 生成器函数就会优雅地退出, 停止 yield a value 给调用者. 如果生成器已经是退出的, 那调用 close() 方法就不会做任何事情.


## yield from

当使用 yield from \<expr\> 语句时, 表示将 yield from 后面的表达式作为一个子迭代器, 由子迭代器产生的所有的值直接传递给当前生成器方法的调用者. 通过 send 方法传递的值或者 throw() 方法传递的异常都直接传递给底层迭代器, 如果它具有适当的方式来处理的话. 如果没有适当的处理方式, 那么 send() 方法将抛出 AttributeError 异常或者 TypeError 异常, throw() 方法将立马抛出正传递的异常.


## 异步生成器函数

pass


