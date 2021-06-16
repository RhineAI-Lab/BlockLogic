"ui";


$ui.layout(
<frame w="*" h="*">
    <text id="tv" text="HelloWorld"/>
</frame>
);
ui.tv.attr('textSize','18sp');
ui.tv.attr('textColor','#000000');




//------ 图形块结构记录 请勿随意修改 ------
/*<xml xmlns="https://BLogic.AutoJs.org/xml"><block type="ui_layout" x="30" y="170"><value name="UI_XML"><shadow type="ui_xml"><field name="TEXT">&lt;frame&gt;&amp;#10;&lt;/frame&gt;</field></shadow><block type="ui_xml"><field name="TEXT">&lt;frame w="*" h="*"&gt;&amp;#10;    &lt;text id="tv" text="HelloWorld"/&gt;&amp;#10;&lt;/frame&gt;</field></block></value><next><block type="ui_set_attr"><field name="ID">tv</field><value name="NAME"><shadow type="text"><field name="TEXT">textSize</field></shadow></value><value name="VALUE"><shadow type="text"><field name="TEXT">18sp</field></shadow></value><next><block type="ui_set_attr"><field name="ID">tv</field><value name="NAME"><shadow type="text"><field name="TEXT">textColor</field></shadow></value><value name="VALUE"><shadow type="text"><field name="TEXT">#000000</field></shadow></value></block></next></block></next></block></xml>*/
