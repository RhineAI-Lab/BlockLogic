'use strict';

goog.provide('Blockly.Blocks.Console');  // Deprecated
goog.provide('Blockly.Constants.Console');

goog.require('Blockly');
goog.require('Blockly.Blocks');
goog.require('Blockly.FieldDropdown');
goog.require('Blockly.FieldLabel');
goog.require('Blockly.Mutator');

var colour = "#0eaf9e";
var baseHelpUrl = "https://pro.autojs.org/docs/#/zh-cn/console?id=";

Blockly.defineBlocksWithJsonArray([
    {
        "type": "console_show",
        "message0": "%1 控制台 ",
        "args0": [{ "type": "field_dropdown", "name": "VALUE", "options": [["显示", "show"], ["隐藏", "hide"]] }],
        "colour": colour,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "显示或隐藏控制台",
        "helpUrl": baseHelpUrl + "consoleshow"
    }, {
        "type": "console_clear",
        "message0": "清空控制台",
        "colour": colour,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "清空控制台所有日志",
        "helpUrl": baseHelpUrl + "consoleclear"
    }, {
        "type": "console_output",
        "message0": "输出 %1 内容 %2",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "TYPE",
                "options": [
                    ["普通信息", "log"],
                    ["观察信息", "verbose"],
                    ["重要信息", "info"],
                    ["警告信息", "warn"],
                    ["错误信息", "error"],
                    ["断言信息", "assert"],
                    ["调用栈信息", "trace"],
                    ["输入框-输出计算结果", "input"],
                    ["输入框-输出字符串", "rawInput"],
                ]
            },
            { "type": "input_value", "name": "CONTENT" }
        ],
        "colour": colour,
        "InputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "在控制台上输出信息",
        "helpUrl": baseHelpUrl + "consolelogdata-args"
    }, {
        "type": "console_time",
        "message0": "%1 定时器 名称 %2",
        "args0": [{
            "type": "field_dropdown",
            "name": "TYPE",
            "options": [
                ["启动", "time"],
                ["停止", "timeEnd"]
            ]
        },
        { "type": "input_value", "name": "NAME", "check": "String" }
        ],
        "colour": colour,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "启动一个定时器，用以计算一个操作的持续时间",
        "helpUrl": baseHelpUrl + "consoletimelabel"
    }, {
        "type": "console_set_size",
        "message0": "设置控制台大小  宽 %1 高 %2",
        "args0": [
            { "type": "input_value", "name": "WIDTH", "check": "Number" },
            { "type": "input_value", "name": "HEIGHT", "check": "Number" }
        ],
        "colour": colour,
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "设置控制台的大小，单位像素。",
        "helpUrl": baseHelpUrl + "consolesetsizew-h"
    }, {
        "type": "console_set_position",
        "message0": "设置控制台位置  X %1 Y %2",
        "args0": [
            { "type": "input_value", "name": "X", "check": "Number" },
            { "type": "input_value", "name": "Y", "check": "Number" }],
        "colour": colour,
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "设置控制台的位置，单位像素。",
        "helpUrl": baseHelpUrl + "consolesetpositionx-y"
    }, {
        "type": "console_config",
        "message0": "设置控制台配置",
        "message1": " %1",
        "args1": [
            {"type": "input_statement", "check":"ConsoleConfig", "name": "DO"}
        ],
        "colour": colour,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "设置日志保存的路径和配置",
        "helpUrl": baseHelpUrl + "consolesetgloballogconfigconfig"
    }, {
        "type": "console_config_path",
        "message0": "配置-保存路径 %1",
        "args0": [{ "type": "input_value", "name": "VALUE", "check": "String", "text": "/sdcard/1.txt" }],
        "colour": colour,
        "previousStatement": "ConsoleConfig",
        "nextStatement": "ConsoleConfig",
        "tooltip": "日志保存路径",
        "helpUrl": baseHelpUrl + "consolesetgloballogconfigconfig"
    }, {
        "type": "console_config_file_size",
        "message0": "配置-文件大小 %1",
        "args0": [{ "type": "input_value", "name": "VALUE", "check": "Number", "text": "512" }],
        "colour": colour,
        "previousStatement": "ConsoleConfig",
        "nextStatement": "ConsoleConfig",
        "tooltip": "最大文件大小",
        "helpUrl": baseHelpUrl + "consolesetgloballogconfigconfig"
    }, {
        "type": "console_config_level",
        "message0": "配置-写入级别 %1",
        "args0": [{
            "type": "field_dropdown",
            "name": "VALUE",
            "options": [
                ["所有信息 - ALL", "ALL"],
                ["调试信息 - DEBUG", "DEBUG"],
                ["输出信息 - INFO", "INFO"],
                ["警告信息 - WARN", "WARN"],
                ["错误信息 - ERROR", "ERROR"],
                ["严重错误信息 - FATAL", "FATAL"],
                ["关闭 - OFF", "OFF"],
            ]
        }],
        "colour": colour,
        "previousStatement": "ConsoleConfig",
        "nextStatement": "ConsoleConfig",
        "tooltip": "写入的日志级别",
        "helpUrl": baseHelpUrl + "consolesetgloballogconfigconfig"
    }, {
        "type": "console_config_backup_size",
        "message0": "配置-备份数量 %1",
        "args0": [{ "type": "input_value", "name": "VALUE", "check": "Number"}],
        "colour": colour,
        "previousStatement": "ConsoleConfig",
        "nextStatement": "ConsoleConfig",
        "tooltip": "日志备份文件最大数量",
        "helpUrl": baseHelpUrl + "consolesetgloballogconfigconfig"
    }, {
        "type": "console_config_file_pattern",
        "message0": "配置-写入格式 %1",
        "args0": [{ "type": "input_value", "name": "VALUE", "check": "String" }],
        "colour": colour,
        "previousStatement": "ConsoleConfig",
        "nextStatement": "ConsoleConfig",
        "tooltip": "日志写入格式",
        "helpUrl": "http://logging.apache.org/log4j/1.2/apidocs/org/apache/log4j/PatternLayout.html"
    }
]);
