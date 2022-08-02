# -*- coding:utf-8 -*-
import cv2
from aip import AipFace

i = None

cap = cv2.VideoCapture(0)

face_client = AipFace(APP_ID, API_KEY, SECRET_KEY)


APP_ID = 'APP_ID_XXX'
API_KEY = 'API_KEY_XXX'
SECRET_KEY = 'SECRET_KEY_XXX'

face_detect_result = face.detect(cap.read())
for i in range(1,face_detect_result['face_num']+1):
  print(face_detect_result['face_list'][i][msg])


face_search_result = face.search(cap.read(), 'GROUP_A')
if False:
  print(face_search_result['user_list'][0][user_info])

len(face_search_result['user_list']) > 0



#------ 图形块结构记录 请勿随意修改 ------
"""<xml xmlns="https://logic.autojs.org/xml"><variables><variable type="Number" id="Gf!l(oE`HswcZ7:b^V-g">i</variable></variables><block type="bdai_set_aas" id="sc4?UedtzrmZU5L#)wt-" x="90" y="-10"><value name="A0"><shadow type="text" id="(m_!2xfoe)86twp:#0m_"><field name="TEXT">APP_ID_XXX</field></shadow></value><value name="A1"><shadow type="text" id="*i|3m=]8qb7jR:9{D$J6"><field name="TEXT">API_KEY_XXX</field></shadow></value><value name="A2"><shadow type="text" id="_;:{2ly_/F;bC^fNNi{^"><field name="TEXT">SECRET_KEY_XXX</field></shadow></value></block><block type="bdai_face_detect" id="CiIz{)Dg68XFcETu@Tr+" x="90" y="130"><value name="A0"><block type="cv2_cap_get" id="kI)qI!u#H+i5Zulg.6%4"></block></value><next><block type="controls_loops_range" id=":.}6$Dme@uJ7I8,Ef+|Q"><field name="A0" id="Gf!l(oE`HswcZ7:b^V-g" variabletype="Number">i</field><value name="A1"><shadow type="math_number" id="AHHl,)6Y:LC`^@rC^7,]"><field name="NUM">1</field></shadow></value><value name="A2"><shadow type="math_number" id="gd;uH?8o:Vp{*s@+)Re0"><field name="NUM">10</field></shadow><block type="bdai_face_detect_num" id="Cw_PFKX?a^4tV(ZFy]te"></block></value><statement name="A3"><block type="text_output_more" id="bC2(dhqzkY@8S[8^oK0x"><mutation items="1"></mutation><value name="ADD0"><block type="bdai_face_detect_detail" id="~*PKZLwB*7rB7}ui0t]P"><field name="A1">msg</field><value name="A0"><block type="variables_get_number" id="b^~#8!3P/Q6#.E~8:S^k"><field name="VAR" id="Gf!l(oE`HswcZ7:b^V-g" variabletype="Number">i</field></block></value></block></value></block></statement></block></next></block><block type="bdai_face_search" id=":au(M5g@=E9N}kUD]mo," x="90" y="290"><value name="A0"><block type="cv2_cap_get" id="g?yvNef$tZ3I=;qZyt?B"></block></value><value name="A1"><shadow type="text" id="|[aG$Dx7(yIgLQTG{,~z"><field name="TEXT">GROUP_A</field></shadow></value><next><block type="controls_if" id="{Lxa9@BcMMel2{Z!ZRn0"><statement name="DO0"><block type="text_output_more" id="9YZ/WzQq|E{u$~S6iwro"><mutation items="1"></mutation><value name="ADD0"><block type="bdai_face_search_detail" id="s8AbUAK/1]^l=aw7NMX3"><field name="A0">user_info</field></block></value></block></statement></block></next></block><block type="bdai_face_search_success" id="e=Ohn]W=m$5wdzBM|+Q3" x="230" y="450"></block></xml>"""
