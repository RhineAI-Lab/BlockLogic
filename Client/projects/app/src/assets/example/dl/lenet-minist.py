import torch
from torchvision import transforms
from torchvision import datasets
from torch.utils import data
from torch import nn

EPOCHS = None
trans = None
net = None
LR = None
train_loader = None
test_loader = None
BATCH_SIZE = None
device = None

class MyModule(nn.Module):
    def __init__(self):
        super(MyModule, self).__init__()
    def forward(self, x):
        return x


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
test_datasets = datasets.$A0(root=$A1, train=False, download=$A2, transform=trans)
test_loader = data.DataLoader(test_datasets, batch_size=$A3, shuffle=False)
net = MyModule()



#------ 图形块结构记录 请勿随意修改 ------
"""<xml xmlns="https://logic.autojs.org/xml"><variables><variable type="Number" id="p}j*:grKH_lse0*vmlI5">EPOCHS</variable><variable type="Transforms" id="J.pI3`?(fq`=H4QNG)8s">trans</variable><variable type="Module" id="z-^Kkbx_Y7[8p%BS;NQZ">net</variable><variable type="Number" id="VT7FBuFk7tIkjZ=$I[$+">LR</variable><variable type="DataLoader" id="-_``}~[45xmtk,~p_mg_">train_loader</variable><variable type="DataLoader" id="i-wZ=?)*LugZ5e2]nM9y">test_loader</variable><variable type="Number" id="Yp/peRX$9oJAYN{A0%QF">BATCH_SIZE</variable><variable id="8u~!6cngUk3zLPx/@;G,">device</variable></variables><block type="variables_set_number" id="Q^)B8M+AXz/VE|YVv+tw" x="310" y="150"><field name="VAR" id="p}j*:grKH_lse0*vmlI5" variabletype="Number">EPOCHS</field><value name="VALUE"><shadow type="math_number" id="C@-p=z2JQ?`?P/kIA40$"><field name="NUM">5</field></shadow></value><next><block type="variables_set_number" id="H[ygz;8xpN!0Nv7tY|2h"><field name="VAR" id="VT7FBuFk7tIkjZ=$I[$+" variabletype="Number">LR</field><value name="VALUE"><shadow type="math_number" id="8;u%C!X7hF[NIB#`1eZY"><field name="NUM">0.001</field></shadow></value><next><block type="variables_set_number" id="jgtCMkgDWtd+dB;w)u[6"><field name="VAR" id="Yp/peRX$9oJAYN{A0%QF" variabletype="Number">BATCH_SIZE</field><value name="VALUE"><shadow type="math_number" id="jUK0pQMR?@se,QkRCM+/"><field name="NUM">32</field></shadow></value><next><block type="variables_set" id="FS^i7,:ML}V6QJ^lwe#k"><field name="VAR" id="8u~!6cngUk3zLPx/@;G,">device</field><value name="VALUE"><block type="modules_device" id="7@miNnitZzTdEPR7dc_0"><field name="A0">'cuda' if torch.cuda.is_available() else 'cpu'</field></block></value></block></next></block></next></block></next></block><block type="transforms_set" id="B)tH1#b)av1kHt!r/z--" x="310" y="310"><field name="VAR" id="J.pI3`?(fq`=H4QNG)8s" variabletype="Transforms">trans</field><value name="VALUE"><block type="transforms_compose" id=",r0/{RYi+I}HAf}?*u4F"><mutation items="2"></mutation><value name="ADD0"><block type="transforms_toTensor" id="oFT$k:7xU;5A9#rQ^[vv"></block></value><value name="ADD1"><block type="transforms_Normalize" id="aVRS_fZlg8^]$SQcZABZ"><value name="A0"><shadow type="math_number" id="/n[eZ-iV|X.7z77D.rT@"><field name="NUM">0.2</field></shadow></value><value name="A1"><shadow type="math_number" id="cF)cDQuXZcvkt;!-97,X"><field name="NUM">0.3</field></shadow></value></block></value></block></value><next><block type="data_mix_create" id="s0e*OtH=uY{f7W$lXAL."><field name="A0">MNIST</field><field name="A2">TRUE</field><field name="A4" id="-_``}~[45xmtk,~p_mg_" variabletype="DataLoader">train_loader</field><field name="A6" id="i-wZ=?)*LugZ5e2]nM9y" variabletype="DataLoader">test_loader</field><value name="A1"><shadow type="text" id="Vg+bIpbG0Cs%=|_ZZ7S^"><field name="TEXT">./data</field></shadow></value><value name="A3"><shadow type="math_number" id="%~iLM?I/chUL94mCWYtK"><field name="NUM">16</field></shadow></value><value name="A5"><block type="transforms_get" id=",,Iq}bFA9*4t%UhER^^_"><field name="VAR" id="J.pI3`?(fq`=H4QNG)8s" variabletype="Transforms">trans</field></block></value><value name="A7"><block type="transforms_get" id="TY7$XvE#B|Wj6KdCQ]Io"><field name="VAR" id="J.pI3`?(fq`=H4QNG)8s" variabletype="Transforms">trans</field></block></value></block></next></block><block type="modules_define" id="}v-jZWn0W~|qPnC]EXUP" x="310" y="550"><field name="VAR" id="z-^Kkbx_Y7[8p%BS;NQZ" variabletype="Module">net</field></block></xml>"""
