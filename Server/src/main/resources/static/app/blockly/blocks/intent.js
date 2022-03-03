'use strict';

goog.provide('Blockly.Blocks.Intent');  // Deprecated
goog.provide('Blockly.Constants.Intent');

goog.require('Blockly');
goog.require('Blockly.Blocks');
goog.require('Blockly.FieldDropdown');
goog.require('Blockly.FieldLabel');
goog.require('Blockly.Mutator');

var colour = "#8e30be";
var baseHelpUrl = "https://pro.autojs.org/docs/#/zh-cn/app?id=";

Blockly.defineBlocksWithJsonArray([
    {
        "type": "intent_intent",
        "message0": "构造意图对象 %1 ",
        "previousStatement": null,
        "nextStatement": null,
        "args0":[
            {"type":"input_value","name":"INTENT","check":"Object"},
        ],
        "colour": colour,
        "tooltip": "除非应用专门暴露Activity出来，否则在没有root权限的情况下使用intent是无法跳转到特定Activity、应用的特定界面的",
        "helpUrl": baseHelpUrl+"intentintentoptions"
    },{
        "type": "intent_start_activity",
        "message0": "启动Activity %1 ",
        "previousStatement": null,
        "nextStatement": null,
        "args0":[
            {"type":"input_value","name":"START","check":"Object"},
        ],
        "colour": colour,
        "tooltip": "根据选项构造一个Intent，并启动该Activity。",
        "helpUrl": baseHelpUrl+"intentstartactivityoptions"
    },{
        "type": "intent_send_broadcast",
        "message0": "发送广播 %1 ",
        "previousStatement": null,
        "nextStatement": null,
        "args0":[
            {"type":"input_value","name":"SEND","check":"Object"},
        ],
        "colour": colour,
        "tooltip": "根据选项构造一个Intent，并发送该广播。",
        "helpUrl": baseHelpUrl+"intentsendbroadcastoptions"
    },{
        "type": "intent_start_service",
        "message0": "启动服务 %1 ",
        "previousStatement": null,
        "nextStatement": null,
        "args0":[
            {"type":"input_value","name":"SERVICE","check":"Object"},
        ],
        "colour": colour,
        "tooltip": "根据选项构造一个Intent，并启动该服务。",
        "helpUrl": baseHelpUrl+"intentstartserviceoptions"
    },{
        "type": "intent_send_broadcast_by_name",
        "message0": "特定广播名称: %1 ",
        "args0":[
            {"type":"field_dropdown","name":"CAST","options":[["布局层次分析","inspect_layout_hierarchy"],["布局范围","inspect_layout_bounds"]]}
        ],
         "previousStatement": null,
         "nextStatement": null,
         "colour": colour,
         "tooltip":"",
         "helpUrl": baseHelpUrl+"intentsendbroadcastname"
    }, {
        "type": "intent_intent_to_shell",
        "message0": "转换为对应的shell的intent命令的参数 %1 ",
        "previousStatement": null,
        "nextStatement": null,
        "args0":[
            {"type":"input_value","name":"SHELL","check":"Object"},
        ],
        "colour": colour,
        "tooltip": "根据选项构造一个Intent，转换为对应的shell的intent命令的参数。",
        "helpUrl": baseHelpUrl+"intentintenttoshelloptions"
    },{
        "type": "intent_parse_uri",
        "message0": "解析uri字符串并返回相应的Uri对象 %1 ",
        "previousStatement": null,
        "nextStatement": null,
        "args0":[
            {"type":"input_value","name":"URI","check":"String"},
        ],
        "colour": colour,
        "tooltip": "即使Uri格式错误，该函数也会返回一个Uri对象，但之后如果访问该对象的scheme, path等值可能因解析失败而返回null。",
        "helpUrl": baseHelpUrl+"intentparseuriuri"
    }, {
        "type": "intent_get_uri_for_file",
        "message0": "创建一个uri对象 %1 ",
        "previousStatement": null,
        "nextStatement": null,
        "args0":[
            {"type":"input_value","name":"FORFILE","check":"String"},
        ],
        "colour": colour,
        "tooltip": "在高版本Android上，由于系统限制直接在Uri暴露文件的绝对路径，因此返回的Uri会是诸如content://...的形式。",
        "helpUrl": baseHelpUrl+"intentgeturiforfilepath"
    }, {
        "type": "intent_get_installed_apps",
        "message0": "返回当前用户安装的所有应用程序包 %1 ",
        "previousStatement": null,
        "nextStatement": null,
        "args0":[
            {"type":"input_value","name":"INSTALL","check":"Object"},
        ],
        "colour": colour,
        "tooltip": "如果设置了match选项 uninstalled_packages，则包括被删除但保留了数据的应用程序。获取安装的应用列表。返回值是ApplicationInfo对象的数组。 如果没有安装任何应用，则返回一个空数组。",
        "helpUrl": baseHelpUrl+"intentgetinstalledintentsoptions"
    },
]);
