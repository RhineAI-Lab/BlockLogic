'use strict';

goog.provide('Blockly.Blocks.Ui');  // Deprecated
goog.provide('Blockly.Constants.Ui');

goog.require('Blockly');
goog.require('Blockly.Blocks');
goog.require('Blockly.FieldDropdown');
goog.require('Blockly.FieldLabel');
goog.require('Blockly.Mutator');

var colour = "#3c2eaf";
var baseHelpUrl = "https://pro.autojs.org/docs/#/zh-cn/ui?id=";

Blockly.defineBlocksWithJsonArray([
    {
        "type": "ui_layout",
        "message0": "显示布局 %1",
        "args0":[
            {"type":"input_value","name":"UI_XML","check":"UiXml"},
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": colour,
        "tooltip":"",
        "helpUrl": baseHelpUrl+"uilayoutxml"
    },{
        "type": "ui_layout_file",
        "message0": "显示布局文件 %1",
        "args0":[
            {"type":"input_value","name":"FILE_PATH","check":"String"},
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": colour,
        "tooltip":"",
        "helpUrl": baseHelpUrl+"uilayoutfilexmlfile"
    },{
        "type": "ui_xml",
        "message0": "布局 %1",
        "args0": [
            {"type": "field_multilinetext", "name": "TEXT", "text": "<frame>\n</frame>"}
        ],
        "output": "UiXml",
        "colour": colour,
        "tooltip": "XML页面布局",
    },{
        "type": "ui_set_attr",
        "message0": "设置控件 %1 属性 %2 值 %3",
        "args0": [
            {"type":"field_input","name": "ID","text":"id"},
            {"type":"input_value","name":"NAME","check":"String"},
            {"type":"input_value","name":"VALUE","check":"String","align": "right"},
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": colour,
        "tooltip": "设置控件属性",
        "helpUrl": baseHelpUrl+"attrname-value"
    },{
        "type": "ui_get_attr",
        "message0": "获取控件 %1 属性 %2",
        "args0": [
            {"type":"field_input","name": "ID","text":"id"},
            {"type":"input_value","name":"NAME","check":"String"},
        ],
        "output": "String",
        "colour": colour,
        "tooltip": "获取控件的属性",
        "helpUrl": baseHelpUrl+"attrname"
    },{
        "type": "ui_inflate",
        "message0": "渲染布局 %1 父视图(可选) %2 是否加入父视图 %3",
        "args0":[
            {"type":"input_value","name":"UI_XML","check":"UiXml","align": "right"},
            {"type":"input_value","name":"UI_PARENT","check":"UiView","align": "right"},
            {"type":"input_value","name":"IN_PARENT","check":"Boolean","align": "right"},
        ],
        "output": "UiView",
        "colour": colour,
        "tooltip":"渲染XML成视图。如果该View将作为某个View的子View，我们建议传入parent参数，这样在渲染时依赖于父视图的一些布局属性能够正确应用。",
        "helpUrl": baseHelpUrl+"uiinflatexml-parent-null-attachtoparent-false"
    }, {
        "type": "ui_run",
        "message0": "在UI线程运行 %1 %2",
        "args0": [
            {"type": "input_dummy"},
            {"type": "input_statement", "name": "STAT"}
        ],
        "colour": colour,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "在UI线程运行内容。",
        "helpUrl": baseHelpUrl+"uiruncallback",
    }, {
        "type": "ui_post",
        "message0": "%1 毫秒后 在UI线程运行 %2 %3",
        "args0": [
            {"type":"input_value","name":"TIME","check":"Number"},
            {"type": "input_dummy"},
            {"type": "input_statement", "name": "STAT"}
        ],
        "colour": colour,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "在UI线程运行内容。",
        "helpUrl": baseHelpUrl+"uipostcallback-delay-0",
    }, {
        "type": "ui_find_view",
        "message0": "根据Id查找View %1",
        "args0":[
            {"type":"input_value","name":"ID","check":"String"},
        ],
        "output":"UiView",
        "colour": colour,
        "tooltip":"设置当前界面的状态栏颜色。",
        "helpUrl": baseHelpUrl+"uifindviewid"
    }, {
        "type": "ui_is_ui_thread",
        "message0": "是否在UI线程",
        "output": "Boolean",
        "colour": colour,
        "tooltip":"返回是否在UI线程",
        "helpUrl": baseHelpUrl+"uiisuithread"
    }, {
        "type": "ui_finish",
        "message0": "结束UI活动",
        "previousStatement": null,
        "nextStatement": null,
        "colour": colour,
        "tooltip":"结束当前活动并销毁界面。",
        "helpUrl": baseHelpUrl+"uifinish"
    }, {
        "type": "ui_use_android_resources",
        "message0": "启用Android原生资源",
        "previousStatement": null,
        "nextStatement": null,
        "colour": colour,
        "tooltip":"启用使用Android的布局(layout)、绘图(drawable)、动画(anim)、样式(style)等资源的特性。启用该特性后，需在project.json中进行配置。",
        "helpUrl": baseHelpUrl+"uiuseandroidresources"
    }, {
        "type": "ui_set_content_view",
        "message0": "设置视图为当前视图 %1",
        "args0":[
            {"type":"input_value","name":"UI_VIEW","check":"UiView"},
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": colour,
        "tooltip":"将视图对象设置为当前视图。",
        "helpUrl": baseHelpUrl+"uiisuithread"
    }, {
        "type": "ui_register_widget",
        "message0": "注册自定义组件 名称: %1 组件: %2",
        "args0":[
            {"type":"input_value","name":"NAME","check":"String","align": "right"},
            {"type":"input_value","name":"FUNCTION","check":"Function","align": "right"},
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": colour,
        "tooltip":"注册一个自定义组件。",
        "helpUrl": baseHelpUrl+"uiregisterwidgetname-widget"
    }, {
        "type": "ui_status_bar_color",
        "message0": "设置状态栏颜色 %1",
        "args0":[
            {"type":"input_value","name":"COLOR","check":"String"},
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": colour,
        "tooltip":"设置当前界面的状态栏颜色。",
        "helpUrl": baseHelpUrl+"uistatusbarcolorcolor"
    },
]);
