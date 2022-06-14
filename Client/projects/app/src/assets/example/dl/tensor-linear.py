# -*- coding:utf-8 -*-
import torch
from torch.utils import data
from torch import nn
from torch import optim

features = None
net = None
learner = None
device = None
labels = None
device = None
noises = None
dataloader = None
x = None
y_true = None
y_pred = None
datasets = None
loss = None


device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

features = torch.rand([1000, 1]) * 10
labels = features * 2 + 6
noises = torch.randn_like(features)
labels = labels + noises
datasets = data.TensorDataset(features, labels)
dataloader = data.DataLoader(datasets, batch_size=16, shuffle=True)

net = nn.Sequential(
    nn.Linear(1, 1)
)
net = net.to(device)
print(net)

learner = nn.MSELoss(), optim.SGD(net.parameters(), 0.01)
for count in range(10):
    for iter_num, (x, y_true) in enumerate(dataloader):
        x, y_true = x.to(device), y_true.to(device)
        y_pred = net(x)
        loss_f, optimizer = learner
        l = loss_f(y_pred, y_true)
        optimizer.zero_grad()
        l.backward()
        optimizer.step()
        loss = l.cpu().item()
    print('loss: ', loss)
print(net.state_dict())



#------ 图形块结构记录 请勿随意修改 ------
"""<xml xmlns="https://logic.autojs.org/xml"><variables><variable type="Tensor" id="{~`lg6F3cI_8R#qY4i*8">features</variable><variable type="Module" id="U_=lU*a.LQ|UzQQ2{0TX">net</variable><variable type="Learner" id="vTI%sLknuD3hhJ*iAa-d">learner</variable><variable id="YwD(.[MXGCFslkd+$!sK">device</variable><variable type="Tensor" id=").X(*(cO1mYj0Gx4!{)R">labels</variable><variable type="Device" id="6A4g}gEBp?CF]l:8GvQ$">device</variable><variable type="Tensor" id="6y_8mQoT-{2bN4k^n;9_">noises</variable><variable type="DataLoader" id="4x!-[#rO9z8t4Fgqv8d8">dataloader</variable><variable type="Tensor" id="RPy_qD6p]*%K!)UTb}ZT">x</variable><variable type="Tensor" id="P7?ylm$[ojwcA(jGgFd2">y_true</variable><variable type="Tensor" id=";?/TJJ:-Pc1z/-Qu2`(c">y_pred</variable><variable type="Dataset" id="}){;/te(x,X__n:8[NR/">datasets</variable><variable type="Number" id="i/7+Kd95{eeuMFhVvdsk">loss</variable></variables><block type="variables_set" id="Cm[:oW^/:;]3WU?}5r;i" x="70" y="190"><field name="VAR" id="YwD(.[MXGCFslkd+$!sK">device</field><value name="VALUE"><block type="modules_device" id="3,p*~%ljG$?,k|vN)!6U"><field name="A0">'cuda' if torch.cuda.is_available() else 'cpu'</field></block></value></block><block type="tensor_set" id="otI96Y%.tTs:)G7SU.#o" x="70" y="250"><field name="A0" id="{~`lg6F3cI_8R#qY4i*8" variabletype="Tensor">features</field><value name="A1"><block type="math_calculate" id=".UVGrJQlBwG[EG!_cXEu"><field name="A1">*</field><value name="A0"><shadow xmlns="https://logic.autojs.org/xml" type="math_number" id="j3-A-9AYt;R))I2#~}sj"><field name="NUM">1</field></shadow><block type="tensor_create_shape" id="(/-QOxsht7=,l49u0uXK"><field name="A0">rand</field><value name="A1"><block type="lists_new_num" id="d2A3$iooHYAXNRM9d0QV"><mutation items="2"></mutation><field name="ADD0">1000</field><field name="ADD1">1</field></block></value></block></value><value name="A2"><shadow type="math_number" id="{=,QO6D~1neb6d*pb%T8"><field name="NUM">10</field></shadow></value></block></value><next><block type="tensor_set" id="a.$^rZ:]gFl]YTLp%fb@"><field name="A0" id=").X(*(cO1mYj0Gx4!{)R" variabletype="Tensor">labels</field><value name="A1"><block type="math_calculate" id="`MP[I4:3!#[/I$=]+?8x"><field name="A1">+</field><value name="A0"><shadow xmlns="https://logic.autojs.org/xml" type="math_number"><field name="NUM">1</field></shadow><block type="math_calculate" id="Sde[bWe(QgL1UX/T4XZz"><field name="A1">*</field><value name="A0"><shadow xmlns="https://logic.autojs.org/xml" type="math_number"><field name="NUM">1</field></shadow><block type="tensor_get" id="KT|So[ld3$pEefnt=5|w"><field name="A0" id="{~`lg6F3cI_8R#qY4i*8" variabletype="Tensor">features</field></block></value><value name="A2"><shadow type="math_number" id="~`gG!%H5biQ{{GxRX6*3"><field name="NUM">2</field></shadow></value></block></value><value name="A2"><shadow type="math_number" id=";Uk}qq)g|;mjr9#0mh3{"><field name="NUM">6</field></shadow></value></block></value><next><block type="tensor_set" id="Enn4GF5O{r+0]rcU637-"><field name="A0" id="6y_8mQoT-{2bN4k^n;9_" variabletype="Tensor">noises</field><value name="A1"><block type="tensor_create_like" id="j]5JN[[XGf2f(A,%.-Cr"><field name="A0">randn</field><value name="A1"><block type="tensor_get" id="-@ziK/cO~v]DqSs[eE[5"><field name="A0" id="{~`lg6F3cI_8R#qY4i*8" variabletype="Tensor">features</field></block></value></block></value><next><block type="tensor_set" id="W^G|2F6b!w/l-j08+,R^"><field name="A0" id=").X(*(cO1mYj0Gx4!{)R" variabletype="Tensor">labels</field><value name="A1"><block type="math_calculate" id="sh57-9K2U^aMO};)5`1_"><field name="A1">+</field><value name="A0"><shadow xmlns="https://logic.autojs.org/xml" type="math_number" id="{eTLxu!adZ_kD+D;`2F9"><field name="NUM">1</field></shadow><block type="tensor_get" id="=TBe%}3LPeu+qG-{ZH~^"><field name="A0" id=").X(*(cO1mYj0Gx4!{)R" variabletype="Tensor">labels</field></block></value><value name="A2"><shadow xmlns="https://logic.autojs.org/xml" type="math_number" id="c^pNX@S]$$5i{pJ{=3dc"><field name="NUM">1</field></shadow><block type="tensor_get" id=",sWYB=knkFWYqhd4#CRp"><field name="A0" id="6y_8mQoT-{2bN4k^n;9_" variabletype="Tensor">noises</field></block></value></block></value><next><block type="data_dataset_tensor_create" id="y(YWQ`:Jwt.6IMR67170"><field name="A0" id="}){;/te(x,X__n:8[NR/" variabletype="Dataset">datasets</field><value name="A1"><block type="tensor_get" id="LzXbB]R^`.BH4imc5qdC"><field name="A0" id="{~`lg6F3cI_8R#qY4i*8" variabletype="Tensor">features</field></block></value><value name="A2"><block type="tensor_get" id="TBr,XvJ`YFT%o87BC$HL"><field name="A0" id=").X(*(cO1mYj0Gx4!{)R" variabletype="Tensor">labels</field></block></value><next><block type="data_loader_create" id="{5[)Gts15H]B0bPaAo_z"><field name="A0" id="4x!-[#rO9z8t4Fgqv8d8" variabletype="DataLoader">dataloader</field><field name="A2">TRUE</field><value name="A1"><block type="data_var_dataset" id="CnUl-:-+8S8+DU^g)gr,"><field name="A0" id="}){;/te(x,X__n:8[NR/" variabletype="Dataset">datasets</field></block></value><value name="A3"><shadow type="math_number" id="zN]_|QE6Hyi(pAZ#Uu;="><field name="NUM">16</field></shadow></value></block></next></block></next></block></next></block></next></block></next></block><block type="modules_sequential_create_e" id="pRxE=:;TR:b4mDoqBAdb" x="70" y="570"><field name="A0" id="U_=lU*a.LQ|UzQQ2{0TX" variabletype="Module">net</field><statement name="A1"><block type="modules_sequential" id=")}zU_)~`huF;jX*P[$Hr"><mutation items="1"></mutation><value name="ADD0"><block type="layers_linear" id="aB%,j@2Yx=^vvN6Ltf:)"><field name="A0">1</field><field name="A1">1</field></block></value></block></statement><next><block type="modules_module_to_device" id="Be}v{ZL9KA}^v`32VG73"><field name="A1" id="6A4g}gEBp?CF]l:8GvQ$" variabletype="Device">device</field><value name="A0"><block type="modules_get" id="I3Sm)k8OKdx;+hNY{;QT"><field name="VAR" id="U_=lU*a.LQ|UzQQ2{0TX" variabletype="Module">net</field></block></value><next><block type="text_output_more" id="%FK|rPBh!.#omP(|Q;gv"><mutation items="1"></mutation><value name="ADD0"><block type="modules_get" id="U,@=Ec)Ek[w]O`2!OVp-"><field name="VAR" id="U_=lU*a.LQ|UzQQ2{0TX" variabletype="Module">net</field></block></value></block></next></block></next></block><block type="learner_create" id="v,72^uIf/O*u9h-3Qz%8" x="70" y="750"><field name="A0" id="vTI%sLknuD3hhJ*iAa-d" variabletype="Learner">learner</field><value name="A1"><block type="loss_new" id="8ks}7vQDB6V7l*1=cTB,"><field name="A0">MSELoss</field></block></value><value name="A2"><block type="optimizer_new" id="C%{?PXb_G#iL23w?^cW$"><field name="A0">SGD</field><value name="A1"><block type="modules_get" id="d{7k-)`OvLvdUYuokcmc"><field name="VAR" id="U_=lU*a.LQ|UzQQ2{0TX" variabletype="Module">net</field></block></value><value name="A2"><block type="math_number" id="p@Noz/;ro~Wp`^X}rXQP"><field name="NUM">0.01</field></block></value></block></value><next><block type="controls_repeat" id="=AatCn|kt~hm;9-+o2}|"><field name="TIMES">10</field><statement name="DO"><block type="data_for_dataloader" id="/4!?GvXR9NJ~$$+McuQ/"><mutation items="2"></mutation><field name="DATA_LOADER" id="4x!-[#rO9z8t4Fgqv8d8" variabletype="DataLoader">dataloader</field><field name="DEVICE" id="6A4g}gEBp?CF]l:8GvQ$" variabletype="Device">device</field><value name="ADD0"><block type="tensor_get" id="]_G~:Pa6g!OTzlff{`#H"><field name="A0" id="RPy_qD6p]*%K!)UTb}ZT" variabletype="Tensor">x</field></block></value><value name="ADD1"><block type="tensor_get" id="`F^eMfENT?36#J%%`!OY"><field name="A0" id="P7?ylm$[ojwcA(jGgFd2" variabletype="Tensor">y_true</field></block></value><statement name="STAT"><block type="tensor_set" id="u9a~eU-6K2-dJZ9[eElC"><field name="A0" id=";?/TJJ:-Pc1z/-Qu2`(c" variabletype="Tensor">y_pred</field><value name="A1"><block type="modules_call" id="7$LTj02f9a}(rV879a.]"><field name="VAR" id="U_=lU*a.LQ|UzQQ2{0TX" variabletype="Module">net</field><value name="INPUT"><block type="tensor_get" id="-wH,aocLe3YXxMH?xV`#"><field name="A0" id="RPy_qD6p]*%K!)UTb}ZT" variabletype="Tensor">x</field></block></value></block></value><next><block type="learner_use" id="F[G+ShhEhTScAi;L?UG0"><field name="A0" id="vTI%sLknuD3hhJ*iAa-d" variabletype="Learner">learner</field><value name="A1"><block type="tensor_get" id="2L2^3!@d)v[#uZHl.-P$"><field name="A0" id="P7?ylm$[ojwcA(jGgFd2" variabletype="Tensor">y_true</field></block></value><value name="A2"><block type="tensor_get" id="@$V=V3Wlp:/IFI9fMc[F"><field name="A0" id=";?/TJJ:-Pc1z/-Qu2`(c" variabletype="Tensor">y_pred</field></block></value><value name="A3"><block type="variables_get_number" id="/*`?]US$NS`(}?l1h~v7"><field name="VAR" id="i/7+Kd95{eeuMFhVvdsk" variabletype="Number">loss</field></block></value></block></next></block></statement><next><block type="text_output_more" id=";fTOl1bfANYO;m74P6%H"><mutation items="2"></mutation><value name="ADD0"><block type="text" id="b(}ojx,iD|:-iv;1RD%S"><field name="TEXT">loss: </field></block></value><value name="ADD1"><block type="variables_get_number" id="Y;)7F!7GiD1+y(/4)=ci"><field name="VAR" id="i/7+Kd95{eeuMFhVvdsk" variabletype="Number">loss</field></block></value></block></next></block></statement><next><block type="text_output_more" id="-(=[)t-UrG`Z4itgaC-c"><mutation items="1"></mutation><value name="ADD0"><block type="modules_get_para" id="74_sW5#9PP_9P]ZyGi2u"><field name="A0" id="U_=lU*a.LQ|UzQQ2{0TX" variabletype="Module">net</field></block></value></block></next></block></next></block></xml>"""
