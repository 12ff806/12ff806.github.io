---
layout: post
tree: passive
notes: active
projects: passive
title: Kramdown 的语法
date: 2017-07-11
---


{::options auto_ids="false" /}

## 简介

kramdown有两种主要的元素类别: block-level 和 span-level. block-level 元素主要用来定义文档结构, span-level元素主要用来修饰文本.

## 标题

主要使用 \"#\" 号来标记标题内容, 几级标题就用几个 \"#\" 号. 分别对应 html 的 \"\<h1>\" \~ \"\<h6>\" 标签.

## 段落

直接输入的, 不使用任何标记的文本, 就像这里本身就是一个段落. 对应 html 的 \"<p>\" 标签.

## 块引用

使用 \">\" 来标记块. 对应 html 的 \"<blockquote>\" 标签. 块里可以使用任何的 block-level 元素, 像 \"#\" \"p\" 等.

## 代码块

一种方法是直接将代码块缩进4个空格或者1个Tab来表示代码块. 另一种方法是在代码的首尾使用 \"~~~\" 来包装代码段使其成为代码块. 对应的 html 的标签为 \"\<pre>\<code>\</code>\</pre>\"

## 列表

有序列表使用 \"数字+小数点+空格+列表项内容\" 来定义有序列表, 例如: \"1. blablabla\". 对应 html 的 \"\<ol><li></li></ol>\" 标签. 同一个列表项内容要使用相同的缩进.

无序列表使用 \"-\" \"+\" \"\*\" 来标记列表项, 后面要加个空格. 对应 html 的 \"<ul><li></li></ul>\" 标签.

## 链接

用 \"[]\" 包在需要添加链接的文本上, 再在其后用 \"()\" 添加链接地址. 例如: \[My Page](http://number92.tk). 对应 html 中的 \<a href=\"http://number92.tk\">My Page</a>. 

## 图片

类似链接的方式 \"\!\[\]\(\)\". \"[]\" 中的文本相当于 \"\<img>\" 的 \"alt\" 属性, \"()\" 中的文本相当于 \"\<img>\" 的 \"src\" 属性
