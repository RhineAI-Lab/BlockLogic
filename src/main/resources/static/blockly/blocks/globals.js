'use strict';

goog.provide('Blockly.Blocks.Globals');  // Deprecated
goog.provide('Blockly.Constants.Globals');

goog.require('Blockly');
goog.require('Blockly.Blocks');
goog.require('Blockly.FieldDropdown');
goog.require('Blockly.FieldLabel');
goog.require('Blockly.Mutator');

var colour = "#7476c6";
var baseHelpUrl = "https://pro.autojs.org/docs/#/zh-cn/globals?id=";


Blockly.defineBlocksWithJsonArray([
    {
        "type": "globals_sleep",
        "message0": "等待 %1 毫秒",
        "args0": [{ "type": "input_value", "name": "VALUE", "check": "Number" }],
        "colour": colour,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "阻塞程序，暂停运行n毫秒的时间。1秒等于1000毫秒。",
        "helpUrl": baseHelpUrl + "sleepn"
    }, {
        "type": "globals_current_package",
        "message0": "获取正在运行的应用的包名",
        "colour": colour,
        "output": "String",
        "tooltip": "返回最近一次监测到的正在运行的应用的包名，一般可以认为就是当前正在运行的应用的包名",
        "helpUrl": baseHelpUrl + "currentpackage"
    }, {
        "type": "globals_current_activity",
        "message0": "获取正在运行的界面名称",
        "colour": colour,
        "output": "String",
        "tooltip": "返回最近一次监测到的正在运行的Activity的名称，一般可以认为就是当前正在运行的Activity的名称",
        "helpUrl": baseHelpUrl + "currentactivity"
    }, {
        "type": "globals_set_clip",
        "message0": "设置剪贴板内容 %1",
        "args0": [{ "type": "input_value", "name": "VALUE", "check": "String" }],
        "colour": colour,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "设置剪贴板内容。此剪贴板即系统剪贴板，在一般应用的输入框中\"粘贴\"既可使用",
        "helpUrl": baseHelpUrl + "setcliptext"
    }, {
        "type": "globals_get_clip",
        "message0": "获取剪贴板内容",
        "colour": colour,
        "output": "String",
        "tooltip": "设置剪贴板内容。此剪贴板即系统剪贴板，在一般应用的输入框中\"粘贴\"既可使用",
        "helpUrl": baseHelpUrl + "getclip"
    }, {
        "type": "globals_toast",
        "message0": "气泡提示 %1 输出 信息: %2",
        "colour": colour,
        "args0": [
            {
                "type": "field_checkbox",
                "name": "TYPE",
                "checked": false
            }, {
                "type": "input_value", "name": "CONTENT", "check": "String"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "以气泡显示信息message几秒。(具体时间取决于安卓系统，一般都是2秒)",
        "helpUrl": baseHelpUrl + "toastmessage"
    }, {
        "type": "globals_wait_for_activity",
        "message0": "等待指定的界面出现 %1",
        "args0": [{ "type": "input_value", "name": "VALUE", "check": "String" }],
        "colour": colour,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "等待指定的Activity出现",
        "helpUrl": baseHelpUrl + "waitforactivityactivity-period-200"
    }, {
        "type": "globals_wait_for_package",
        "message0": "等待指定的应用出现 %1",
        "args0": [{ "type": "input_value", "name": "VALUE", "check": "String" }],
        "colour": colour,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "等待指定的应用出现",
        "helpUrl": baseHelpUrl + "waitforpackagepackage-period-200"
    }, {
        "type": "globals_exit",
        "message0": "停止脚本运行",
        "colour": colour,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "立即停止脚本运行。",
        "helpUrl": baseHelpUrl + "exit"
    }, {
        "type": "globals_random",
        "message0": "生成随机整数  范围 %1 到 %2",
        "args0": [
            { "type": "input_value", "name": "MIN", "check": "Number" },
            { "type": "input_value", "name": "MAX", "check": "Number" }
        ],
        "colour": colour,
        "output": "Number",
        "inputsInline": true,
        "tooltip": "返回一个在[最小值...最大值]之间的随机数。例如random(0, 2)可能产生0, 1, 2。",
        "helpUrl": baseHelpUrl + "randommin-max"
    }, {
        "type": "globals_random_float",
        "message0": "生成0~1的随机小数",
        "colour": colour,
        "output": "Number",
        "tooltip": "返回在[0, 1]的随机浮点数",
        "helpUrl": baseHelpUrl + "random"
    }, {
        "type": "globals_requires_api",
        "message0": "需要在 Android %1 以上版本才能运行",
        "args0": [{
            "type": "field_dropdown",
            "name": "VALUE",
            "options": [
                ["4.0", '18'],
                ["5.0", '21'],
                ["6.0", '23'],
                ["7.0", '24'],
                ["8.0", '26'],
                ["9.0", '28']
            ]
        }],
        "colour": colour,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "表示此脚本需要Android API版本达到指定版本才能运行。如果没有达到要求则抛出异常。",
        "helpUrl": baseHelpUrl + "requiresapiapi"
    }, {
        "type": "globals_requires_version",
        "message0": "需要在 Auto.js %1 以上版本才能运行",
        "args0": [{
            "type": "input_value",
            "name": "VALUE",
            "check": ["Number", "String"],
            "text": "3.0.0 Beta"
        }],
        "colour": colour,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "表示此脚本需要Auto.js版本达到指定版本才能运行。如果没有达到要求则抛出异常。",
        "helpUrl": baseHelpUrl + "requiresautojsversionversion"
    }, {
        "type": "globals_request_permissions",
        "message0": "动态申请安卓权限  数组 %1",
        "args0": [{
            "type": "input_value",
            "name": "VALUE",
            "check": "Array"
        }],
        "colour": colour,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "动态申请安卓的权限",
        "helpUrl": baseHelpUrl + "runtimerequestpermissionspermissions"
    }, {
        "type": "globals_load_jar",
        "message0": "加载Jar文件  路径 %1",
        "args0": [{
            "type": "input_value",
            "name": "VALUE",
            "check": "String"
        }],
        "colour": colour,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "加载目标jar文件，加载成功后将可以使用该Jar文件的类。",
        "helpUrl": baseHelpUrl + "runtimeloadjarpath"
    }, {
        "type": "globals_load_dex",
        "message0": "加载Dex文件  路径 %1",
        "args0": [{
            "type": "input_value",
            "name": "VALUE",
            "check": "String"
        }],
        "colour": colour,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "加载目标dex文件，加载成功后将可以使用该dex文件的类。",
        "helpUrl": baseHelpUrl + "runtimeloaddexpath"
    }
])
