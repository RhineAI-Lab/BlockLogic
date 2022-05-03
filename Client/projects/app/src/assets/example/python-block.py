import math
import random

num = None
i = None
a = None

# 暂无注释
def doSomething():
  global num, i, a
  for i in range(1, 11):
    print(random.random())


# emmmm
num = math.sqrt(2)
a = []
if num > 0:
  a[0] = 0
for count in range(10):
  doSomething()
  print('abc')



#------ 图形块结构记录 请勿随意修改 ------
"""<xml xmlns="https://logic.autojs.org/xml"><variables><variable type="Number" id="3oSK;NiOUw(9L.iw;5r?">num</variable><variable id="xk^LM/-z,@+pZ6!tM(ob">i</variable><variable id="]YuNNDmfEL?#oo~%b+mN">a</variable></variables><block type="explain" id="$ylKKyqbztbb~s){tU(i" x="110" y="70"><field name="TEXT">emmmm</field><next><block type="variables_set_number" id="uzXW?_*Zdt!kh8,AP4cf"><field name="VAR" id="3oSK;NiOUw(9L.iw;5r?" variabletype="Number">num</field><value name="VALUE"><shadow xmlns="https://logic.autojs.org/xml" type="math_number" id="VGYVe*^lOlO~xRhvf*HF"><field name="NUM">0</field></shadow><block type="math_constant" id="P`7@o}S,:Q!|~02hl=lg"><field name="CONSTANT">SQRT2</field></block></value><next><block type="variables_set" id="z+vnYGW*%Dk[QPkF+#,k"><field name="VAR" id="]YuNNDmfEL?#oo~%b+mN">a</field><value name="VALUE"><block type="lists_new_coll" id="zln%uz^9ugyH%H98Kx6u"><field name="MODE">list</field></block></value><next><block type="controls_if" id="GcWS+XkD-HanV~gg^!nd"><value name="IF0"><block type="math_number_property" id="moYZ/:IGTfvFF9={(XJN"><mutation divisor_input="false"></mutation><field name="PROPERTY">POSITIVE</field><value name="NUMBER_TO_CHECK"><shadow xmlns="https://logic.autojs.org/xml" type="math_number" id="[dXe+_`uwS9:IFbhrL#2"><field name="NUM">0</field></shadow><block type="variables_get_number" id="1$[X,8Fe]o(vZ5AB|cL_"><field name="VAR" id="3oSK;NiOUw(9L.iw;5r?" variabletype="Number">num</field></block></value></block></value><statement name="DO0"><block type="lists_setValue_new2" id="fLdG+qaAawnOU}uBlj{U"><field name="INDEX">FIRST</field><value name="LIST"><block type="variables_get" id="+:iQZX`w6P}L4ju50_hZ"><field name="VAR" id="]YuNNDmfEL?#oo~%b+mN">a</field></block></value><value name="VALUE"><shadow type="math_number" id="bLBC5m8n:7nkWZFgwm84"><field name="NUM">0</field></shadow></value></block></statement><next><block type="controls_repeat_ext" id="FdUv{kp$!*}$p1Gvihpz"><value name="TIMES"><shadow type="math_number" id="62.@tA*t]yAZbeJRUSt6"><field name="NUM">10</field></shadow></value><statement name="DO"><block type="procedures_callnoreturn" id="HUrxYJbEJ=gOWlLK2s0|"><mutation name="doSomething"></mutation><next><block type="text_print" id="}-)(wSFdHRnGrci):%Sc"><value name="TEXT"><shadow type="text" id="kSGy=E5uWxeMJzt:v|sD"><field name="TEXT">abc</field></shadow></value></block></next></block></statement></block></next></block></next></block></next></block></next></block><block type="procedures_defnoreturn" id="N89@a~4C|*F4l/,T(QLf" x="110" y="410"><field name="NAME">doSomething</field><comment pinned="false" h="80" w="160">暂无注释</comment><statement name="STACK"><block type="controls_for" id="j,,dc}j.s3crxQ1aVn/X"><field name="VAR" id="xk^LM/-z,@+pZ6!tM(ob">i</field><value name="FROM"><shadow type="math_number" id="T9`Z,dgG#?_[,F*Uib,@"><field name="NUM">1</field></shadow></value><value name="TO"><shadow type="math_number" id="YwxHpyBE2cIV2pw*B~1O"><field name="NUM">10</field></shadow></value><value name="BY"><shadow type="math_number" id="VY:xeK1g.m=Ttr?z0NDa"><field name="NUM">1</field></shadow></value><statement name="DO"><block type="text_print" id="9$Qa9#.2Upmh.aG,lCPP"><value name="TEXT"><shadow xmlns="https://logic.autojs.org/xml" type="text" id="okRIbM0H~49Ru{(#A9rr"><field name="TEXT">abc</field></shadow><block type="math_random_float" id="c=3D5cMwjnpi0)FNAmt}"></block></value></block></statement></block></statement></block></xml>"""
