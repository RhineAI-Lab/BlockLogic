a = None


a = 123
for count in range(10):
  pass
if a % 2 == 0:
  print('abc')



#------ 图形块结构记录 请勿随意修改 ------
"""<xml xmlns="https://logic.autojs.org/xml"><variables><variable id="]YuNNDmfEL?#oo~%b+mN">a</variable></variables><block type="variables_set" id="z+vnYGW*%Dk[QPkF+#,k" x="90" y="70"><field name="VAR" id="]YuNNDmfEL?#oo~%b+mN">a</field><value name="VALUE"><block type="math_number" id="YS5G+l6QCEoFI)u]hc3y"><field name="NUM">123</field></block></value><next><block type="controls_repeat_ext" id="FdUv{kp$!*}$p1Gvihpz"><value name="TIMES"><shadow type="math_number" id="62.@tA*t]yAZbeJRUSt6"><field name="NUM">10</field></shadow></value><next><block type="controls_if" id="GcWS+XkD-HanV~gg^!nd"><value name="IF0"><block type="math_number_property" id="moYZ/:IGTfvFF9={(XJN"><mutation divisor_input="false"></mutation><field name="PROPERTY">EVEN</field><value name="NUMBER_TO_CHECK"><shadow type="math_number" id="[dXe+_`uwS9:IFbhrL#2"><field name="NUM">0</field></shadow><block type="variables_get" id="?bV6VSxcaI^a9GD].Pwp"><field name="VAR" id="]YuNNDmfEL?#oo~%b+mN">a</field></block></value></block></value><statement name="DO0"><block type="text_print" id="}-)(wSFdHRnGrci):%Sc"><value name="TEXT"><shadow type="text" id="kSGy=E5uWxeMJzt:v|sD"><field name="TEXT">abc</field></shadow></value></block></statement></block></next></block></next></block></xml>"""
