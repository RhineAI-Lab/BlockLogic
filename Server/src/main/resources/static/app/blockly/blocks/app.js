'use strict';

goog.provide('Blockly.Blocks.App');  // Deprecated
goog.provide('Blockly.Constants.App');

goog.require('Blockly');
goog.require('Blockly.Blocks');
goog.require('Blockly.FieldDropdown');
goog.require('Blockly.FieldLabel');
goog.require('Blockly.Mutator');

var colour = "#c6a000";
var baseHelpUrl = "https://pro.autojs.org/docs/#/zh-cn/app?id=";

Blockly.defineBlocksWithJsonArray([
    {
        "type": "app_version_code",
        "message0": "获取当前软件版本号",
        "output":"Number",
        "colour": colour,
        "tooltip": "当前软件版本号，整数值。例如160, 256等。\n如果在Auto.js中运行则为Auto.js的版本号；在打包的软件中则为打包软件的版本号。",
        "helpUrl": baseHelpUrl+"appversionCode"
    }, {
        "type": "app_version_name",
        "message0": "获取当前软件的版本名称",
        "output":"String",
        "colour": colour,
        "tooltip": "当前软件的版本名称，例如'3.0.0 Beta'\n如果在Auto.js中运行则为Auto.js的版本名称；在打包的软件中则为打包软件的版本名称。",
        "helpUrl": baseHelpUrl+"appversionName"
    }, {
        "type": "app_autojs",
        "message0": "获取当前autojs的 %1 ",
        "args0":[
            {"type":"field_dropdown","name":"AUTO","options":[["版本号","versionCode"],["版本名","versionName"]]}
        ],
         "previousStatement": null,
         "nextStatement": null,
         "colour": colour,
         "tooltip":"",
         "helpUrl": baseHelpUrl+"appautojsversioncode"

    }, {
        "type": "app_launch",
        "message0": "通过应用包名启动应用 %1 ",
        "previousStatement": null,
        "nextStatement": null,
        "args0":[
            {"type":"input_value","name":"PACKAGE_NAME","check":"String"},
        ],
        "colour": colour,
        "tooltip": "如果该名称对应的应用不存在，则返回false; 否则返回true。如果该名称对应多个应用，则只启动其中某一个。",
        "helpUrl": baseHelpUrl+"applaunchpackagename"
    }, {
        "type": "app_launch_app",
        "message0": "通过应用名称启动应用 %1 ",
        "previousStatement": null,
        "nextStatement": null,
        "args0":[
            {"type":"input_value","name":"APP_NAME","check":"String"},
        ],
        "colour": colour,
        "tooltip": "如果该名称对应的应用不存在，则返回false; 否则返回true。如果该名称对应多个应用，则只启动其中某一个。",
        "helpUrl": baseHelpUrl+"applaunchappappname"
    },{
        "type": "app_get_package_name",
        "message0": "获取应用名对应的包名 %1 ",
        "previousStatement": null,
        "nextStatement": null,
        "args0":[
            {"type":"input_value","name":"PACKAGE","check":"String"},
        ],
        "colour": colour,
        "tooltip":"如果该找不到该应用，返回null；如果该名称对应多个应用，则只返回其中某一个的包名。。",
        "helpUrl": baseHelpUrl+"appgetpackagenameappname"
    }, {
        "type": "app_get_app_name",
        "message0": "获取包名对应的应用名 %1",
        "previousStatement": null,
        "nextStatement": null,
        "args0":[
            {"type":"input_value","name":"GET","check":"String"},
        ],
        "colour": colour,
        "tooltip":"如果该找不到该应用，返回null。",
        "helpUrl": baseHelpUrl+"appgetappnamepackagename"
    }, {
        "type": "app_open_app_setting",
        "message0": "打开应用的详情页",
        "output":"String",
        "colour": colour,
        "tooltip":"如果找不到该应用，返回false; 否则返回true。",
        "helpUrl": baseHelpUrl+"appopenappsettingpackagename"
    },{
        "type": "app_viewfile",
        "message0": "用其他应用查看文件 %1 ",
        "previousStatement": null,
        "nextStatement": null,
        "args0":[
            {"type":"input_value","name":"VIEWFILE","check":"String"},
        ],
        "colour": colour,
        "tooltip": "文件不存在的情况由查看文件的应用处理。如果找不出可以查看该文件的应用，则抛出ActivityNotException。",
        "helpUrl": baseHelpUrl+"appviewfilepath"
    },{
        "type": "app_editfile",
        "message0": "用其他应用编辑文件 %1 ",
        "previousStatement": null,
        "nextStatement": null,
        "args0":[
            {"type":"input_value","name":"EDITFILE","check":"String"},
        ],
        "colour": colour,
        "tooltip": "文件不存在的情况由编辑文件的应用处理。如果找不出可以编辑该文件的应用，则抛出ActivityNotException。",
        "helpUrl": baseHelpUrl+"appeditfilepath"
    },{
        "type": "app_uninstall",
        "message0": "卸载应用 %1 ",
        "previousStatement": null,
        "nextStatement": null,
        "args0":[
            {"type":"input_value","name":"UNINSTALL","check":"String"},
        ],
        "colour": colour,
        "tooltip": "执行后会会弹出卸载应用的提示框。如果该包名的应用未安装，由应用卸载程序处理，可能弹出未找到应用的提示。",
        "helpUrl": baseHelpUrl+"appuninstallpackagename"
    },{
        "type": "app_openurl",
        "message0": "用浏览器打开网站url %1 ",
        "previousStatement": null,
        "nextStatement": null,
        "args0":[
            {"type":"input_value","name":"URL","check":"String"},
        ],
        "colour": colour,
        "tooltip": "如果没有安装浏览器应用，则抛出ActivityNotException。",
        "helpUrl": baseHelpUrl+"appopenurlurl"
    },{
        "type": "app_send_email",
        "message0": "根据选项options调用邮箱应用发送邮件 %1 ",
        "previousStatement": null,
        "nextStatement": null,
        "args0":[
            {"type":"input_value","name":"EMAIL","check":"String"},
        ],
        "colour": colour,
        "tooltip": "如果该名称对应的应用不存在，则返回false; 否则返回true。如果该名称对应多个应用，则只启动其中某一个。",
        "helpUrl": baseHelpUrl+"aappsendemailoptions"
    },{
        "type": "app_start_activity",
        "message0": "启动Auto.js界面 %1 ",
        "previousStatement": null,
        "nextStatement": null,
        "args0":[
            {"type":"input_value","name":"ACTIVITY","check":"String"},
        ],
        "colour": colour,
        "tooltip": "该函数在Auto.js内运行则会打开Auto.js内的界面，在打包应用中运行则会打开打包应用的相应界面。",
        "helpUrl": baseHelpUrl+"appstartactivityname"
    }
]);
