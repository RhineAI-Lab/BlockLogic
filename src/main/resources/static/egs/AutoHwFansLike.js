var btns, i;


auto.waitFor();
for (var count = 0; count < 10; count++) {
  btns = id('zan_layout').untilFind();
  var i_end = btns.length;
  var i_inc = 1;
  if (1 > i_end) {
    i_inc = -i_inc;
  }
  for (i = 1; i_inc >= 0 ? i <= i_end : i >= i_end; i += i_inc) {
    btns[(i - 1)].click();
    console.log(('点击' + String(i)));
  }
  id('recommend_listView').findOne().scrollForward();
  id('recommend_listView').findOne().scrollForward();
  console.log('翻页');
  sleep(1000);
}




//------ 图形块结构记录 请勿随意修改 ------
/*<xml xmlns="https://BLogic.AutoJs.org/xml"><variables><variable id="J1KIqz^E7^s96yT5bzFs">btns</variable><variable id="{?/n1=~8k$G8WzM5xG3*">i</variable></variables><block type="auto_wait_for" x="-110" y="110"><next><block type="controls_repeat_ext"><value name="TIMES"><shadow type="math_number"><field name="NUM">10</field></shadow></value><statement name="DO"><block type="variables_set"><field name="VAR" id="J1KIqz^E7^s96yT5bzFs">btns</field><value name="VALUE"><block type="widget_until_find"><value name="SELECTOR"><block type="widget_attr_selector"><field name="ATTR">id</field><field name="WAY"></field><value name="VALUE"><shadow type="text"><field name="TEXT">zan_layout</field></shadow></value></block></value></block></value><next><block type="controls_for"><field name="VAR" id="{?/n1=~8k$G8WzM5xG3*">i</field><value name="FROM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="TO"><shadow type="math_number"><field name="NUM">10</field></shadow><block type="lists_length"><value name="VALUE"><block type="variables_get"><field name="VAR" id="J1KIqz^E7^s96yT5bzFs">btns</field></block></value></block></value><value name="BY"><shadow type="math_number"><field name="NUM">1</field></shadow></value><statement name="DO"><block type="puzzle"><value name="VALUE"><block type="widget_operate"><field name="METH">click</field><value name="WIDGET"><block type="lists_getIndex"><mutation statement="false" at="true"></mutation><field name="MODE">GET</field><field name="WHERE">FROM_START</field><value name="VALUE"><block type="variables_get"><field name="VAR" id="J1KIqz^E7^s96yT5bzFs">btns</field></block></value><value name="AT"><block type="variables_get"><field name="VAR" id="{?/n1=~8k$G8WzM5xG3*">i</field></block></value></block></value></block></value><next><block type="console_output"><field name="TYPE">log</field><value name="CONTENT"><shadow type="text"><field name="TEXT"></field></shadow><block type="text_join"><mutation items="2"></mutation><value name="ADD0"><block type="text"><field name="TEXT">点击</field></block></value><value name="ADD1"><block type="variables_get"><field name="VAR" id="{?/n1=~8k$G8WzM5xG3*">i</field></block></value></block></value></block></next></block></statement><next><block type="puzzle"><value name="VALUE"><block type="widget_operate"><field name="METH">scrollForward</field><value name="WIDGET"><block type="widget_find_one"><value name="SELECTOR"><block type="widget_attr_selector"><field name="ATTR">id</field><field name="WAY"></field><value name="VALUE"><shadow type="text"><field name="TEXT">recommend_listView</field></shadow></value></block></value></block></value></block></value><next><block type="puzzle"><value name="VALUE"><block type="widget_operate"><field name="METH">scrollForward</field><value name="WIDGET"><block type="widget_find_one"><value name="SELECTOR"><block type="widget_attr_selector"><field name="ATTR">id</field><field name="WAY"></field><value name="VALUE"><shadow type="text"><field name="TEXT">recommend_listView</field></shadow></value></block></value></block></value></block></value><next><block type="console_output"><field name="TYPE">log</field><value name="CONTENT"><shadow type="text"><field name="TEXT">翻页</field></shadow></value><next><block type="globals_sleep"><value name="VALUE"><shadow type="math_number"><field name="NUM">1000</field></shadow></value></block></next></block></next></block></next></block></next></block></next></block></statement></block></next></block></xml>*/
