import { defineBlocksWithDt } from '../../register';

defineBlocksWithDt(`

prefix: class
style: class_blocks

define
定义类(input:MyClass)
{}
Python
class $A0():\\n$A1

new: any
构造类(input:MyClass)
Python
$A0()

define_func
定义类方法(input:func)
{}
Python
def $A0(self):\\n$A1

define_func_init
定义初始化方法
{}
Python
def __init__(self):\\n$A0

define_func_call
定义调用方法{any}
{}
Python
def __call__(self,$A0):\\n$A1

func_return
返回{any}
Python
return $A0

attr_set
设置属性(input:attr)为{any}
Python
self.$A0 = $A1

attr_get:any
属性(input:attr)
Python
self.$A0

attr_call:any
调用属性(input:attr){any}
Python
self.$A0($A1)

`);
