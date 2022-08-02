import { defineBlocksWithDt } from '../../register';

defineBlocksWithDt(
  `

prefix: bdai
style: bdai_blocks
help: https://ai.baidu.com/

set_aas
设置 APP_ID {str}
设置 API_KEY {str}
设置 SECRET_KEY {str}
Python
APP_ID = $A0
API_KEY = $A1
SECRET_KEY = $A2

face_detect
执行人脸信息识别{Numpy: R}
Python
import: from aip import AipFace
import: face_client = AipFace(APP_ID, API_KEY, SECRET_KEY)
face_detect_result = face.detect($A0)

face_detect_num: num
人脸识别结果数量
Python
face_detect_result['face_num']

face_detect_detail: str
第{num}个人脸的[概览信息:msg/年龄:age]
Python
face_detect_result['face_list'][$A0][$A1]

face_search
执行人脸搜索{Numpy: R}
人脸库{str: R}
Python
import: from aip import AipFace
import: face_client = AipFace(APP_ID, API_KEY, SECRET_KEY)
face_search_result = face.search($A0, $A1)

face_search_success: Boolean
人脸识别有结果
Python
len(face_search_result['user_list']) > 0

face_search_detail: str
人脸识别结果[姓名:user_info/ID:user_id/置信度:score/分组:group_id]
Python
face_search_result['user_list'][0][$A0]

`,
  false,
);
