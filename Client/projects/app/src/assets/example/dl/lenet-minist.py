import torch
from torchvision import transforms
from torchvision import datasets
from torch.utils import data
from torch import nn
from torch import optim

trans = None
conv = None
epoch = None
EPOCHS = None
learner = None
train_loader = None
test_loader = None
fc = None
data = None
LR = None
net = None
BATCH_SIZE = None
x = None
imgs = None
labels = None
preds = None
device = None
n = None
loss = None


EPOCHS = 5
LR = 0.001
BATCH_SIZE = 32
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

trans = transforms.Compose([
  transforms.ToTensor(),
  transforms.Normalize(mean=(0.2,),std=(0.3,))
])
train_datasets = datasets.MNIST(root='./data', train=True, download=True, transform=trans)
train_loader = data.DataLoader(train_datasets, batch_size=16, shuffle=True)
test_datasets = datasets.MNIST(root='./data', train=False, download=True, transform=trans)
test_loader = data.DataLoader(test_datasets, batch_size=16, shuffle=False)

conv = nn.Sequential(
  nn.Conv2d(1, 6, 5),
  nn.Sigmoid(),
  nn.MaxPool2d(2),
  nn.Conv2d(1, 6, 5),
  nn.Sigmoid(),
  nn.MaxPool2d(2)
)
fc = nn.Sequential(
  nn.Linear(256, 120),
  nn.Sigmoid(),
  nn.Linear(120, 84),
  nn.Sigmoid(),
  nn.Linear(84, 10)
)
class MyModule(nn.Module):
  def __init__(self):
    super(MyModule, self).__init__()
    self.conv = conv
    self.fc = fc
  def forward(self, x):
    x = self.conv(x)
    n = x.shape[0]
    x.view([n, -1])
    x = self.fc(x)
    return x
net = MyModule()
net = net.to(device)
print(net)

learner = nn.CrossEntropyLoss(), optim.Adam(net.parameters(), LR)

for epoch in range(1,EPOCHS+1):
  for data in train_loader:
    imgs, labels = datapreds = net(imgs)
    optimizer, loss_f = learner
    l = loss_f(labels, preds)
    optimizer.zero_grad()
    l.backward()
    optimizer.step()
    loss = l.cpu().item()



#------ 图形块结构记录 请勿随意修改 ------
"""<xml xmlns="https://logic.autojs.org/xml"><variables><variable type="Transforms" id="J.pI3`?(fq`=H4QNG)8s">trans</variable><variable type="Module" id="Ce;.s~`mDcis|o`~cP:#">conv</variable><variable id="I(FQv?0@2!tB:?Srtjb*">epoch</variable><variable type="Number" id="p}j*:grKH_lse0*vmlI5">EPOCHS</variable><variable type="Learner" id="GhE8o*ag{}/Ts(#(UH(-">learner</variable><variable type="DataLoader" id="-_``}~[45xmtk,~p_mg_">train_loader</variable><variable type="DataLoader" id="i-wZ=?)*LugZ5e2]nM9y">test_loader</variable><variable type="Module" id="gz)s]G@{[P_)FN[.O=?5">fc</variable><variable id="LU5^[:.*m)u]r_1_0ES#">data</variable><variable type="Number" id="VT7FBuFk7tIkjZ=$I[$+">LR</variable><variable type="Module" id="z-^Kkbx_Y7[8p%BS;NQZ">net</variable><variable type="Number" id="Yp/peRX$9oJAYN{A0%QF">BATCH_SIZE</variable><variable type="Tensor" id="gD]`$#^c;~WG6%GR;cvk">x</variable><variable type="Tensor" id="CeIoG9V},xE?XMm5VeP@">imgs</variable><variable type="Tensor" id="Pg5gTp=p5*WmMIeLD#x#">labels</variable><variable type="Tensor" id="GH3X;;e#~/2CO|$Y1xaM">preds</variable><variable id="8u~!6cngUk3zLPx/@;G,">device</variable><variable type="Number" id="HIL.^w_;T,@$=3+t,vL]">n</variable><variable type="Number" id="LAG3?in7hMy+dd/aJ+5]">loss</variable></variables><block type="variables_set_number" id="Q^)B8M+AXz/VE|YVv+tw" x="310" y="150"><field name="VAR" id="p}j*:grKH_lse0*vmlI5" variabletype="Number">EPOCHS</field><value name="VALUE"><shadow type="math_number" id="C@-p=z2JQ?`?P/kIA40$"><field name="NUM">5</field></shadow></value><next><block type="variables_set_number" id="H[ygz;8xpN!0Nv7tY|2h"><field name="VAR" id="VT7FBuFk7tIkjZ=$I[$+" variabletype="Number">LR</field><value name="VALUE"><shadow type="math_number" id="8;u%C!X7hF[NIB#`1eZY"><field name="NUM">0.001</field></shadow></value><next><block type="variables_set_number" id="jgtCMkgDWtd+dB;w)u[6"><field name="VAR" id="Yp/peRX$9oJAYN{A0%QF" variabletype="Number">BATCH_SIZE</field><value name="VALUE"><shadow type="math_number" id="jUK0pQMR?@se,QkRCM+/"><field name="NUM">32</field></shadow></value><next><block type="variables_set" id="FS^i7,:ML}V6QJ^lwe#k"><field name="VAR" id="8u~!6cngUk3zLPx/@;G,">device</field><value name="VALUE"><block type="modules_device" id="7@miNnitZzTdEPR7dc_0"><field name="A0">'cuda' if torch.cuda.is_available() else 'cpu'</field></block></value></block></next></block></next></block></next></block><block type="transforms_set" id="B)tH1#b)av1kHt!r/z--" x="310" y="310"><field name="VAR" id="J.pI3`?(fq`=H4QNG)8s" variabletype="Transforms">trans</field><value name="VALUE"><block type="transforms_compose" id=",r0/{RYi+I}HAf}?*u4F"><mutation items="2"></mutation><value name="ADD0"><block type="transforms_toTensor" id="oFT$k:7xU;5A9#rQ^[vv"></block></value><value name="ADD1"><block type="transforms_Normalize" id="aVRS_fZlg8^]$SQcZABZ"><value name="A0"><shadow type="math_number" id="/n[eZ-iV|X.7z77D.rT@"><field name="NUM">0.2</field></shadow></value><value name="A1"><shadow type="math_number" id="cF)cDQuXZcvkt;!-97,X"><field name="NUM">0.3</field></shadow></value></block></value></block></value><next><block type="data_mix_create" id="s0e*OtH=uY{f7W$lXAL."><field name="A0">MNIST</field><field name="A2">TRUE</field><field name="A4" id="-_``}~[45xmtk,~p_mg_" variabletype="DataLoader">train_loader</field><field name="A6" id="i-wZ=?)*LugZ5e2]nM9y" variabletype="DataLoader">test_loader</field><value name="A1"><shadow type="text" id="Vg+bIpbG0Cs%=|_ZZ7S^"><field name="TEXT">./data</field></shadow></value><value name="A3"><shadow type="math_number" id="%~iLM?I/chUL94mCWYtK"><field name="NUM">16</field></shadow></value><value name="A5"><block type="transforms_get" id=",,Iq}bFA9*4t%UhER^^_"><field name="VAR" id="J.pI3`?(fq`=H4QNG)8s" variabletype="Transforms">trans</field></block></value><value name="A7"><block type="transforms_get" id="TY7$XvE#B|Wj6KdCQ]Io"><field name="VAR" id="J.pI3`?(fq`=H4QNG)8s" variabletype="Transforms">trans</field></block></value></block></next></block><block type="modules_sequential_create_e" id="-.XF)0cdm[d4{%+pML]d" x="310" y="530"><field name="A0" id="Ce;.s~`mDcis|o`~cP:#" variabletype="Module">conv</field><statement name="A1"><block type="modules_sequential" id="s3o}71h*SHFJAi7weF!4"><mutation items="6"></mutation><value name="ADD0"><block type="layers_conv" id="!5TV}x3BQ3tWE|sx4PQ|"><field name="A0">2d</field><field name="A1">1</field><field name="A2">6</field><field name="A3">5</field></block></value><value name="ADD1"><block type="layers_sigmoid" id="h~WDi;qGbis!1`-Y_j81"></block></value><value name="ADD2"><block type="layers_pool" id="uh0rct[@0Sird8la!Te="><field name="A0">Max</field><field name="A1">2d</field><field name="A2">2</field></block></value><value name="ADD3"><block type="layers_conv" id=")cP%vfyBI6uIs6ll;[O6"><field name="A0">2d</field><field name="A1">1</field><field name="A2">6</field><field name="A3">5</field></block></value><value name="ADD4"><block type="layers_sigmoid" id="^6#n:$~j-.F)L%%$p^A~"></block></value><value name="ADD5"><block type="layers_pool" id="4u`9LQyPm5#fz]6m6NU("><field name="A0">Max</field><field name="A1">2d</field><field name="A2">2</field></block></value></block></statement><next><block type="modules_sequential_create_e" id="#_g[1N}2g#wd=WVTL.#Z"><field name="A0" id="gz)s]G@{[P_)FN[.O=?5" variabletype="Module">fc</field><statement name="A1"><block type="modules_sequential" id="(QmH%?XpI%Go0|I2;-d*"><mutation items="5"></mutation><value name="ADD0"><block type="layers_linear" id="[:lQoj#z}Vs:];x_i(/b"><field name="A0">256</field><field name="A1">120</field></block></value><value name="ADD1"><block type="layers_sigmoid" id="niYYwyLAsBq~d:q@JkG."></block></value><value name="ADD2"><block type="layers_linear" id="auo/sIj09nyTJ%GO0=@5"><field name="A0">120</field><field name="A1">84</field></block></value><value name="ADD3"><block type="layers_sigmoid" id="9VDc!z]XSF:N_,b^B?);"></block></value><value name="ADD4"><block type="layers_linear" id="6)kB+!NHD+!cr4ThP2JG"><field name="A0">84</field><field name="A1">10</field></block></value></block></statement><next><block type="modules_define" id="}v-jZWn0W~|qPnC]EXUP"><field name="VAR" id="z-^Kkbx_Y7[8p%BS;NQZ" variabletype="Module">net</field><statement name="INIT"><block type="class_attr_set" id="?tu)8n*1c~{vg%eAt$5]"><field name="A0">conv</field><value name="A1"><block type="modules_get" id="MK]S!(gZ3YHEe{zbfAOq"><field name="VAR" id="Ce;.s~`mDcis|o`~cP:#" variabletype="Module">conv</field></block></value><next><block type="class_attr_set" id="WyI$]usM9^eF,+z*c_D/"><field name="A0">fc</field><value name="A1"><block type="modules_get" id="mOpTf$pRYMj~A--(Pi@P"><field name="VAR" id="gz)s]G@{[P_)FN[.O=?5" variabletype="Module">fc</field></block></value></block></next></block></statement><value name="INPUT"><block type="tensor_get" id="y`H8^-e1x4{[|b-$z{^u"><field name="A0" id="gD]`$#^c;~WG6%GR;cvk" variabletype="Tensor">x</field></block></value><statement name="FORWARD"><block type="tensor_set" id="UAR.,R*(zgY2^?m_4DD3"><field name="A0" id="gD]`$#^c;~WG6%GR;cvk" variabletype="Tensor">x</field><value name="A1"><block type="class_attr_call" id="{(FWpPT{wSgy6Gc0XPXi"><field name="A0">conv</field><value name="A1"><block type="tensor_get" id="Od78~uVT}6nrpPfk(dnR"><field name="A0" id="gD]`$#^c;~WG6%GR;cvk" variabletype="Tensor">x</field></block></value></block></value><next><block type="variables_set_number" id="Cf@|Sq[Lqi{xxA*DG:!s"><field name="VAR" id="HIL.^w_;T,@$=3+t,vL]" variabletype="Number">n</field><value name="VALUE"><shadow xmlns="https://logic.autojs.org/xml" type="math_number" id="u:*0(8BY%2w_Ep5B99:3"><field name="NUM">0</field></shadow><block type="lists_getIndex_new2" id="qdvV|fqtJ9$`{D]pf]p,"><field name="MODE">GET</field><field name="INDEX">FIRST</field><value name="LIST"><block type="tensor_shape_get" id="K^%K:pmw)U]xO4[+c6+^"><field name="A0" id="gD]`$#^c;~WG6%GR;cvk" variabletype="Tensor">x</field></block></value></block></value><next><block type="tensor_shape_set" id="tc^XO)TD{;o,96ZnO/sP"><field name="A0" id="gD]`$#^c;~WG6%GR;cvk" variabletype="Tensor">x</field><value name="A1"><block type="lists_create_with" id="F*vQHGHLw`WI(/(Q=%I2"><mutation items="2"></mutation><value name="ADD0"><block type="variables_get_number" id="DzYZN?h3^Vc`Ty@Xvd/A"><field name="VAR" id="HIL.^w_;T,@$=3+t,vL]" variabletype="Number">n</field></block></value><value name="ADD1"><block type="math_number" id="{jtAnu{n[*pgfGc^gbGu"><field name="NUM">-1</field></block></value></block></value><next><block type="tensor_set" id="[h#OIhU]h(Q3P}sRs^/l"><field name="A0" id="gD]`$#^c;~WG6%GR;cvk" variabletype="Tensor">x</field><value name="A1"><block type="class_attr_call" id="~DZ|E#:8Tn7k+:Vd?r}s"><field name="A0">fc</field><value name="A1"><block type="tensor_get" id="+;vc{e-)~rVtPGx,eYk["><field name="A0" id="gD]`$#^c;~WG6%GR;cvk" variabletype="Tensor">x</field></block></value></block></value></block></next></block></next></block></next></block></statement><value name="OUTPUT"><block type="tensor_get" id="kMvK!}ph[etyEtw)5eu}"><field name="A0" id="gD]`$#^c;~WG6%GR;cvk" variabletype="Tensor">x</field></block></value><next><block type="modules_module_to_device" id="V}DlF^v`=wGk/[^)uh|T"><value name="A0"><block type="modules_get" id="-kpSJ:mJHM3OxJ%;,g7d"><field name="VAR" id="z-^Kkbx_Y7[8p%BS;NQZ" variabletype="Module">net</field></block></value><value name="A1"><block type="variables_get" id="WQzl$j7QF;s9cKsfAr.("><field name="VAR" id="8u~!6cngUk3zLPx/@;G,">device</field></block></value><next><block type="text_print" id="85-d)=n.q:`~Og;fbOsw"><value name="TEXT"><shadow xmlns="https://logic.autojs.org/xml" type="text" id="~$cOfm-6O))49jT](~{*"><field name="TEXT">abc</field></shadow><block type="modules_get" id="DFKovRv$W}N/i{n~8y?@"><field name="VAR" id="z-^Kkbx_Y7[8p%BS;NQZ" variabletype="Module">net</field></block></value></block></next></block></next></block></next></block></next></block><block type="learner_create" id="NndlG_z+Ey)1cm~UGvKx" x="310" y="1370"><field name="A0" id="GhE8o*ag{}/Ts(#(UH(-" variabletype="Learner">learner</field><value name="A1"><block type="loss_new" id=";=BxCT)N@wrz2lRi_`Tr"><field name="A0">CrossEntropyLoss</field></block></value><value name="A2"><block type="optimizer_new" id="n5#{LrkCc-dlP9rkEBJ9"><field name="A0">Adam</field><value name="A1"><block type="modules_get" id="cS)B`5f=4lcq^Qx3S=a."><field name="VAR" id="z-^Kkbx_Y7[8p%BS;NQZ" variabletype="Module">net</field></block></value><value name="A2"><block type="variables_get_number" id=":(lcE_=ECr(85tRYM!eB"><field name="VAR" id="VT7FBuFk7tIkjZ=$I[$+" variabletype="Number">LR</field></block></value></block></value></block><block type="controls_loops_range" id="2trE:.XDI3`ZIFuMND2I" x="310" y="1490"><field name="A0" id="I(FQv?0@2!tB:?Srtjb*">epoch</field><value name="A1"><shadow type="math_number" id="oIB`]E;qjnxi#~__*wlo"><field name="NUM">1</field></shadow></value><value name="A2"><shadow type="math_number" id="c9MD.}BMyOZx0_8dw$pW"><field name="NUM">10</field></shadow><block type="variables_get_number" id="=OEXOp!CWE6C/Y$#4f`*"><field name="VAR" id="p}j*:grKH_lse0*vmlI5" variabletype="Number">EPOCHS</field></block></value><statement name="A3"><block type="controls_forEach" id="7[@L?VBGvO(WQ!*kRGys"><field name="VAR" id="LU5^[:.*m)u]r_1_0ES#">data</field><value name="LIST"><block type="variables_get" id="o(mX~*RrvXvd2y]+A^%y"><field name="VAR" id="-_``}~[45xmtk,~p_mg_" variabletype="DataLoader">train_loader</field></block></value><statement name="DO"><block type="variables_split" id="{w@/C0.CWPB_#5!Qj|9O"><mutation items="2"></mutation><field name="VAR" id="LU5^[:.*m)u]r_1_0ES#">data</field><value name="ADD0"><block type="tensor_get" id="Rwk0dX[}M8wt|c}3Y#eg"><field name="A0" id="CeIoG9V},xE?XMm5VeP@" variabletype="Tensor">imgs</field></block></value><value name="ADD1"><block type="tensor_get" id="E*{0}/{W!ZJLY;H.pr:3"><field name="A0" id="Pg5gTp=p5*WmMIeLD#x#" variabletype="Tensor">labels</field></block></value><next><block type="tensor_set" id="Y*/HJlKjufVveU9@v1rY"><field name="A0" id="GH3X;;e#~/2CO|$Y1xaM" variabletype="Tensor">preds</field><value name="A1"><block type="modules_call" id="ZnxEk2FSrVJu}0{Q?Bxc"><field name="VAR" id="z-^Kkbx_Y7[8p%BS;NQZ" variabletype="Module">net</field><value name="INPUT"><block type="tensor_get" id="lJ#cvF-{5x_Pw!JNMxsv"><field name="A0" id="CeIoG9V},xE?XMm5VeP@" variabletype="Tensor">imgs</field></block></value></block></value><next><block type="learner_use" id="xY#C^L2qgr}n:2qrNjYA"><field name="A0" id="GhE8o*ag{}/Ts(#(UH(-" variabletype="Learner">learner</field><value name="A1"><block type="tensor_get" id="`@-LO`BIX#oe$baE=vgs"><field name="A0" id="Pg5gTp=p5*WmMIeLD#x#" variabletype="Tensor">labels</field></block></value><value name="A2"><block type="tensor_get" id="B]apQT}Dp(WmRwOJ!RV-"><field name="A0" id="GH3X;;e#~/2CO|$Y1xaM" variabletype="Tensor">preds</field></block></value><value name="A3"><block type="variables_get_number" id="|Q$=:@h01C`1i_QZK%iE"><field name="VAR" id="LAG3?in7hMy+dd/aJ+5]" variabletype="Number">loss</field></block></value></block></next></block></next></block></statement></block></statement></block></xml>"""
