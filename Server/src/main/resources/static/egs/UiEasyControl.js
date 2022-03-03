"ui";


$ui.layout(
<frame w="*"h="*">
    <vertical
        w="auto"
        h="auto"
        layout_gravity="center">
        <text
            id="tv"
            text="HelloWorld"
            textSize="20sp"
            textColor="black"
            gravity="center"/>
        <button
            id="btn"
            text="中文"/>
    </vertical>
</frame>
);
ui.mainBtn.on("click",()=>{
  ui.tv.setText('你好世界');
});




//------ 图形块结构记录 请勿随意修改 ------
/*<xml xmlns="https://BLogic.AutoJs.org/xml"><block type="ui_layout" x="170" y="110"><value name="UI_XML"><shadow type="ui_xml"><field name="TEXT">&lt;frame w="*"h="*"&gt;&amp;#10;    &lt;vertical&amp;#10;        w="auto"&amp;#10;        h="auto"&amp;#10;        layout_gravity="center"&gt;&amp;#10;        &lt;text&amp;#10;            id="tv"&amp;#10;            text="HelloWorld"&amp;#10;            textSize="20sp"&amp;#10;            textColor="black"&amp;#10;            gravity="center"/&gt;&amp;#10;        &lt;button&amp;#10;            id="mainBtn"&amp;#10;            text="中文"/&gt;&amp;#10;    &lt;/vertical&gt;&amp;#10;&lt;/frame&gt;</field></shadow></value><next><block type="ui_btn_on_click"><field name="ID">mainBtn</field><statement name="STAT"><block type="ui_text_set_text"><field name="ID">tv</field><value name="TEXT"><shadow type="text"><field name="TEXT">你好世界</field></shadow></value></block></statement></block></next></block></xml>*/
