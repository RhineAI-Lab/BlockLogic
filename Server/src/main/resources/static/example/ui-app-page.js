"ui";

var color;


color = '#009688';
$ui.layout(
<drawer id="drawer">
    <vertical>
        <appbar>
        <toolbar id="toolbar" title="示例"/>
        <tabs id="tabs"/>
    </appbar>
    <viewpager id="viewpager">
        <frame>
            <text text="第一页内容" textColor="black" textSize="16sp"/>
        </frame>
        <frame>
            <text text="第二页内容" textColor="red" textSize="16sp"/>
        </frame>
        <frame>
            <text text="第三页内容" textColor="green" textSize="16sp"/>
        </frame>
    </viewpager>
    </vertical>
    <vertical layout_gravity="left" bg="#ffffff" w="280">
        <img w="280" h="200" scaleType="fitXY" src="http://images.shejidaren.com/wp-content/uploads/2014/10/023746fki.jpg"/>
        <list id="menu">
            <horizontal bg="?selectableItemBackground" w="*">
                <img w="50" h="50" padding="16" src="{{this.icon}}" tint="{{color}}"/>
                <text textColor="black" textSize="15sp" text="{{this.title}}" layout_gravity="center"/>
            </horizontal>
        </list>
    </vertical>
</drawer>
);

//创建选项菜单(右上角)
ui.emitter.on("create_options_menu", menu => {
    menu.add("设置");
    menu.add("关于");
});
//监听选项菜单点击
ui.emitter.on("options_item_selected", (e, item) => {
    switch (item.getTitle()) {
        case "设置":
            toast("还没有设置");
            break;
        case "关于":
            alert("关于", "Auto.js界面模板 v1.0.0");
            break;
    }
    e.consumed = true;
});
activity.setSupportActionBar(ui.toolbar);

//设置滑动页面的标题
ui.viewpager.setTitles(["标签一", "标签二", "标签三"]);
//让滑动页面和标签栏联动
ui.tabs.setupWithViewPager(ui.viewpager);

//让工具栏左上角可以打开侧拉菜单
ui.toolbar.setupWithDrawer(ui.drawer);

ui.menu.setDataSource([{
    title: "选项一",
    icon: "@drawable/ic_android_black_48dp"
},
    {
        title: "选项二",
        icon: "@drawable/ic_settings_black_48dp"
    },
    {
        title: "选项三",
        icon: "@drawable/ic_favorite_black_48dp"
    },
    {
        title: "退出",
        icon: "@drawable/ic_exit_to_app_black_48dp"
    }
]);

ui.menu.on("item_click", item => {
    switch (item.title) {
        case "退出":
            ui.finish();
            break;
    }
})




//------ 图形块结构记录 请勿随意修改 ------
/*<xml xmlns="https://BLogic.AutoJs.org/xml"><variables><variable id="]YDX0P3;w98Da5+Y48r6">color</variable></variables><block type="variables_set" x="50" y="70"><field name="VAR" id="]YDX0P3;w98Da5+Y48r6">color</field><value name="VALUE"><block type="text"><field name="TEXT">#009688</field></block></value><next><block type="ui_layout"><value name="UI_XML"><shadow type="ui_xml"><field name="TEXT">&lt;drawer id="drawer"&gt;&amp;#10;    &lt;vertical&gt;&amp;#10;        &lt;appbar&gt;&amp;#10;        &lt;toolbar id="toolbar" title="示例"/&gt;&amp;#10;        &lt;tabs id="tabs"/&gt;&amp;#10;    &lt;/appbar&gt;&amp;#10;    &lt;viewpager id="viewpager"&gt;&amp;#10;        &lt;frame&gt;&amp;#10;            &lt;text text="第一页内容" textColor="black" textSize="16sp"/&gt;&amp;#10;        &lt;/frame&gt;&amp;#10;        &lt;frame&gt;&amp;#10;            &lt;text text="第二页内容" textColor="red" textSize="16sp"/&gt;&amp;#10;        &lt;/frame&gt;&amp;#10;        &lt;frame&gt;&amp;#10;            &lt;text text="第三页内容" textColor="green" textSize="16sp"/&gt;&amp;#10;        &lt;/frame&gt;&amp;#10;    &lt;/viewpager&gt;&amp;#10;    &lt;/vertical&gt;&amp;#10;    &lt;vertical layout_gravity="left" bg="#ffffff" w="280"&gt;&amp;#10;        &lt;img w="280" h="200" scaleType="fitXY" src="http://images.shejidaren.com/wp-content/uploads/2014/10/023746fki.jpg"/&gt;&amp;#10;        &lt;list id="menu"&gt;&amp;#10;            &lt;horizontal bg="?selectableItemBackground" w="*"&gt;&amp;#10;                &lt;img w="50" h="50" padding="16" src="{{this.icon}}" tint="{{color}}"/&gt;&amp;#10;                &lt;text textColor="black" textSize="15sp" text="{{this.title}}" layout_gravity="center"/&gt;&amp;#10;            &lt;/horizontal&gt;&amp;#10;        &lt;/list&gt;&amp;#10;    &lt;/vertical&gt;&amp;#10;&lt;/drawer&gt;</field></shadow></value><next><block type="puzzle_block"><field name="TEXT">&amp;#10;//创建选项菜单(右上角)&amp;#10;ui.emitter.on("create_options_menu", menu =&gt; {&amp;#10;    menu.add("设置");&amp;#10;    menu.add("关于");&amp;#10;});&amp;#10;//监听选项菜单点击&amp;#10;ui.emitter.on("options_item_selected", (e, item) =&gt; {&amp;#10;    switch (item.getTitle()) {&amp;#10;        case "设置":&amp;#10;            toast("还没有设置");&amp;#10;            break;&amp;#10;        case "关于":&amp;#10;            alert("关于", "Auto.js界面模板 v1.0.0");&amp;#10;            break;&amp;#10;    }&amp;#10;    e.consumed = true;&amp;#10;});&amp;#10;activity.setSupportActionBar(ui.toolbar);&amp;#10;&amp;#10;//设置滑动页面的标题&amp;#10;ui.viewpager.setTitles(["标签一", "标签二", "标签三"]);&amp;#10;//让滑动页面和标签栏联动&amp;#10;ui.tabs.setupWithViewPager(ui.viewpager);&amp;#10;&amp;#10;//让工具栏左上角可以打开侧拉菜单&amp;#10;ui.toolbar.setupWithDrawer(ui.drawer);&amp;#10;&amp;#10;ui.menu.setDataSource([{&amp;#10;    title: "选项一",&amp;#10;    icon: "@drawable/ic_android_black_48dp"&amp;#10;},&amp;#10;    {&amp;#10;        title: "选项二",&amp;#10;        icon: "@drawable/ic_settings_black_48dp"&amp;#10;    },&amp;#10;    {&amp;#10;        title: "选项三",&amp;#10;        icon: "@drawable/ic_favorite_black_48dp"&amp;#10;    },&amp;#10;    {&amp;#10;        title: "退出",&amp;#10;        icon: "@drawable/ic_exit_to_app_black_48dp"&amp;#10;    }&amp;#10;]);&amp;#10;&amp;#10;ui.menu.on("item_click", item =&gt; {&amp;#10;    switch (item.title) {&amp;#10;        case "退出":&amp;#10;            ui.finish();&amp;#10;            break;&amp;#10;    }&amp;#10;})&amp;#10;</field></block></next></block></next></block></xml>*/
