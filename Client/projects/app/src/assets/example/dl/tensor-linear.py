# -*- coding:utf-8 -*-
import torch
import torch.utils.data as Data
from torch.utils import data
from torch import nn

x = None
datasets = None
net = None
dataloader = None
device = None
y_true = None
noises = None


x = torch.rand([1000]) * 10
y_true = x * 2 + 6
noises = torch.randn([1000])
y_true = y_true + noises

datasets = Data.TensorDataset(x, y_true)
dataloader = data.DataLoader(datasets, batch_size=16, shuffle=True)

net = nn.Sequential(
    nn.Linear(1, 1)
)

for iter_num, (None, None) in enumerate(dataloader):
    None, None = None.to(device)None.to(device)



#------ 图形块结构记录 请勿随意修改 ------
"""<xml xmlns="https://logic.autojs.org/xml"><variables><variable type="Tensor" id="RPy_qD6p]*%K!)UTb}ZT">x</variable><variable type="Dataset" id="}){;/te(x,X__n:8[NR/">datasets</variable><variable type="Module" id="U_=lU*a.LQ|UzQQ2{0TX">net</variable><variable type="DataLoader" id="4x!-[#rO9z8t4Fgqv8d8">dataloader</variable><variable type="Device" id="6A4g}gEBp?CF]l:8GvQ$">device</variable><variable type="Tensor" id="P7?ylm$[ojwcA(jGgFd2">y_true</variable><variable type="Tensor" id="6y_8mQoT-{2bN4k^n;9_">noises</variable></variables><block type="tensor_set" id="otI96Y%.tTs:)G7SU.#o" x="70" y="210"><field name="A0" id="RPy_qD6p]*%K!)UTb}ZT" variabletype="Tensor">x</field><value name="A1"><block type="math_calculate" id=".UVGrJQlBwG[EG!_cXEu"><field name="A1">*</field><value name="A0"><shadow type="math_number" id="j3-A-9AYt;R))I2#~}sj"><field name="NUM">1</field></shadow><block type="tensor_create_shape" id="(/-QOxsht7=,l49u0uXK"><field name="A0">rand</field><value name="A1"><block type="lists_new_num" id="d2A3$iooHYAXNRM9d0QV"><mutation items="1"></mutation><field name="ADD0">1000</field></block></value></block></value><value name="A2"><shadow type="math_number" id="{=,QO6D~1neb6d*pb%T8"><field name="NUM">10</field></shadow></value></block></value><next><block type="tensor_set" id="a.$^rZ:]gFl]YTLp%fb@"><field name="A0" id="P7?ylm$[ojwcA(jGgFd2" variabletype="Tensor">y_true</field><value name="A1"><block type="math_calculate" id="`MP[I4:3!#[/I$=]+?8x"><field name="A1">+</field><value name="A0"><shadow xmlns="https://logic.autojs.org/xml" type="math_number"><field name="NUM">1</field></shadow><block type="math_calculate" id="Sde[bWe(QgL1UX/T4XZz"><field name="A1">*</field><value name="A0"><shadow xmlns="https://logic.autojs.org/xml" type="math_number"><field name="NUM">1</field></shadow><block type="tensor_get" id="KT|So[ld3$pEefnt=5|w"><field name="A0" id="RPy_qD6p]*%K!)UTb}ZT" variabletype="Tensor">x</field></block></value><value name="A2"><shadow type="math_number" id="~`gG!%H5biQ{{GxRX6*3"><field name="NUM">2</field></shadow></value></block></value><value name="A2"><shadow type="math_number" id=";Uk}qq)g|;mjr9#0mh3{"><field name="NUM">6</field></shadow></value></block></value><next><block type="tensor_set" id="Enn4GF5O{r+0]rcU637-"><field name="A0" id="6y_8mQoT-{2bN4k^n;9_" variabletype="Tensor">noises</field><value name="A1"><block type="tensor_create_shape" id="c77sy!x~GE72y#!9YJX0"><field name="A0">randn</field><value name="A1"><block type="lists_new_num" id="]tW#kO|0zA?VHD^usw+:"><mutation items="1"></mutation><field name="ADD0">1000</field></block></value></block></value><next><block type="tensor_set" id="W^G|2F6b!w/l-j08+,R^"><field name="A0" id="P7?ylm$[ojwcA(jGgFd2" variabletype="Tensor">y_true</field><value name="A1"><block type="math_calculate" id="sh57-9K2U^aMO};)5`1_"><field name="A1">+</field><value name="A0"><shadow xmlns="https://logic.autojs.org/xml" type="math_number" id="{eTLxu!adZ_kD+D;`2F9"><field name="NUM">1</field></shadow><block type="tensor_get" id="=TBe%}3LPeu+qG-{ZH~^"><field name="A0" id="P7?ylm$[ojwcA(jGgFd2" variabletype="Tensor">y_true</field></block></value><value name="A2"><shadow type="math_number" id="c^pNX@S]$$5i{pJ{=3dc"><field name="NUM">1</field></shadow><block type="tensor_get" id=",sWYB=knkFWYqhd4#CRp"><field name="A0" id="6y_8mQoT-{2bN4k^n;9_" variabletype="Tensor">noises</field></block></value></block></value></block></next></block></next></block></next></block><block type="data_dataset_tensor_create" id="y(YWQ`:Jwt.6IMR67170" x="70" y="410"><field name="A0" id="}){;/te(x,X__n:8[NR/" variabletype="Dataset">datasets</field><value name="A1"><block type="tensor_get" id="LzXbB]R^`.BH4imc5qdC"><field name="A0" id="RPy_qD6p]*%K!)UTb}ZT" variabletype="Tensor">x</field></block></value><value name="A2"><block type="tensor_get" id="TBr,XvJ`YFT%o87BC$HL"><field name="A0" id="P7?ylm$[ojwcA(jGgFd2" variabletype="Tensor">y_true</field></block></value><next><block type="data_loader_create" id="{5[)Gts15H]B0bPaAo_z"><field name="A0" id="4x!-[#rO9z8t4Fgqv8d8" variabletype="DataLoader">dataloader</field><field name="A2">TRUE</field><value name="A1"><block type="data_var_dataset" id="CnUl-:-+8S8+DU^g)gr,"><field name="A0" id="}){;/te(x,X__n:8[NR/" variabletype="Dataset">datasets</field></block></value><value name="A3"><shadow type="math_number" id="zN]_|QE6Hyi(pAZ#Uu;="><field name="NUM">16</field></shadow></value></block></next></block><block type="modules_sequential_create_e" id="pRxE=:;TR:b4mDoqBAdb" x="70" y="570"><field name="A0" id="U_=lU*a.LQ|UzQQ2{0TX" variabletype="Module">net</field><statement name="A1"><block type="modules_sequential" id=")}zU_)~`huF;jX*P[$Hr"><mutation items="1"></mutation><value name="ADD0"><block type="layers_linear" id="aB%,j@2Yx=^vvN6Ltf:)"><field name="A0">1</field><field name="A1">1</field></block></value></block></statement></block><block type="data_for_dataloader" id="/4!?GvXR9NJ~$$+McuQ/" x="70" y="690"><mutation items="2"></mutation><field name="DATA_LOADER" id="4x!-[#rO9z8t4Fgqv8d8" variabletype="DataLoader">dataloader</field><field name="DEVICE" id="6A4g}gEBp?CF]l:8GvQ$" variabletype="Device">device</field></block></xml>"""
