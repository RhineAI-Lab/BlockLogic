# -*- coding:utf-8 -*-
import torch

x = None
y_true = None
y = None


x = torch.rand([1000]) * 10
y_true = x * 2 + 6
y = y_true + torch.randn([1000])



#------ 图形块结构记录 请勿随意修改 ------
"""<xml xmlns="https://logic.autojs.org/xml"><variables><variable type="Tensor" id="RPy_qD6p]*%K!)UTb}ZT">x</variable><variable type="Tensor" id="P7?ylm$[ojwcA(jGgFd2">y_true</variable><variable type="Tensor" id="L(7vd*PnSZ*SXpW*hb6A">y</variable></variables><block type="tensor_set" id="otI96Y%.tTs:)G7SU.#o" x="70" y="210"><field name="A0" id="RPy_qD6p]*%K!)UTb}ZT" variabletype="Tensor">x</field><value name="A1"><block type="math_calculate" id=".UVGrJQlBwG[EG!_cXEu"><field name="A1">*</field><value name="A0"><shadow type="math_number" id="j3-A-9AYt;R))I2#~}sj"><field name="NUM">1</field></shadow><block type="tensor_create_shape" id="(/-QOxsht7=,l49u0uXK"><field name="A0">rand</field><value name="A1"><block type="lists_new_num" id="d2A3$iooHYAXNRM9d0QV"><mutation items="1"></mutation><field name="ADD0">1000</field></block></value></block></value><value name="A2"><shadow type="math_number" id="{=,QO6D~1neb6d*pb%T8"><field name="NUM">10</field></shadow></value></block></value><next><block type="tensor_set" id="a.$^rZ:]gFl]YTLp%fb@"><field name="A0" id="P7?ylm$[ojwcA(jGgFd2" variabletype="Tensor">y_true</field><value name="A1"><block type="math_calculate" id="`MP[I4:3!#[/I$=]+?8x"><field name="A1">+</field><value name="A0"><shadow type="math_number"><field name="NUM">1</field></shadow><block type="math_calculate" id="Sde[bWe(QgL1UX/T4XZz"><field name="A1">*</field><value name="A0"><shadow type="math_number"><field name="NUM">1</field></shadow><block type="tensor_get" id="KT|So[ld3$pEefnt=5|w"><field name="A0" id="RPy_qD6p]*%K!)UTb}ZT" variabletype="Tensor">x</field></block></value><value name="A2"><shadow type="math_number" id="~`gG!%H5biQ{{GxRX6*3"><field name="NUM">2</field></shadow></value></block></value><value name="A2"><shadow type="math_number" id=";Uk}qq)g|;mjr9#0mh3{"><field name="NUM">6</field></shadow></value></block></value><next><block type="tensor_set" id="W^G|2F6b!w/l-j08+,R^"><field name="A0" id="L(7vd*PnSZ*SXpW*hb6A" variabletype="Tensor">y</field><value name="A1"><block type="math_calculate" id="sh57-9K2U^aMO};)5`1_"><field name="A1">+</field><value name="A0"><shadow type="math_number" id="{eTLxu!adZ_kD+D;`2F9"><field name="NUM">1</field></shadow><block type="tensor_get" id="=TBe%}3LPeu+qG-{ZH~^"><field name="A0" id="P7?ylm$[ojwcA(jGgFd2" variabletype="Tensor">y_true</field></block></value><value name="A2"><shadow type="math_number" id="c^pNX@S]$$5i{pJ{=3dc"><field name="NUM">1</field></shadow><block type="tensor_create_shape" id="c77sy!x~GE72y#!9YJX0"><field name="A0">randn</field><value name="A1"><block type="lists_new_num" id="]tW#kO|0zA?VHD^usw+:"><mutation items="1"></mutation><field name="ADD0">1000</field></block></value></block></value></block></value></block></next></block></next></block></xml>"""
