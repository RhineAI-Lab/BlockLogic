var name;


//获取到对方的名字，并储存到变量中
name = dialogs.rawInput('你的名字是？', '');
//获得到向对方名字后向对方问好
dialogs.alert(('你好' + String(name)), '');




//------ 图形块结构记录 请勿随意修改 ------
/*<xml xmlns="https://BLogic.AutoJs.org/xml"><variables><variable id="~Y51x.g%@O[6(V.h[UR8">name</variable></variables><block type="explain" x="30" y="70"><field name="TEXT">获取到对方的名字，并储存到变量中</field><next><block type="variables_set"><field name="VAR" id="~Y51x.g%@O[6(V.h[UR8">name</field><value name="VALUE"><block type="dialogs_input"><field name="TYPE">rawInput</field><value name="TITLE"><shadow type="text"><field name="TEXT">你的名字是？</field></shadow></value><value name="CONTENT"><shadow type="text"><field name="TEXT"></field></shadow></value></block></value><next><block type="explain"><field name="TEXT">获得到向对方名字后向对方问好</field><next><block type="puzzle"><value name="VALUE"><block type="dialogs_alert"><field name="TYPE">alert</field><value name="TITLE"><shadow type="text"><field name="TEXT">你好</field></shadow><block type="text_join"><mutation items="2"></mutation><value name="ADD0"><block type="text"><field name="TEXT">你好</field></block></value><value name="ADD1"><block type="variables_get"><field name="VAR" id="~Y51x.g%@O[6(V.h[UR8">name</field></block></value></block></value><value name="CONTENT"><shadow type="text"><field name="TEXT"></field></shadow></value></block></value></block></next></block></next></block></next></block></xml>*/
