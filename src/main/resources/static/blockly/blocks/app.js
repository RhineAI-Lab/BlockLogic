'use strict';

goog.provide('Blockly.Blocks.App');  // Deprecated
goog.provide('Blockly.Constants.App');

goog.require('Blockly');
goog.require('Blockly.Blocks');
goog.require('Blockly.FieldDropdown');
goog.require('Blockly.FieldLabel');
goog.require('Blockly.Mutator');

var colour = "#e5af00";
var baseHelpUrl = "https://pro.autojs.org/docs/#/zh-cn/app?id=";

Blockly.defineBlocksWithJsonArray([
    {
        "type": "app_version_code",
        "message0": "获取当前软件版本号",
        "output":"Number",
        "colour": colour,
        "tooltip": "当前软件版本号，整数值。例如160, 256等。\n如果在Auto.js中运行则为Auto.js的版本号；在打包的软件中则为打包软件的版本号。",
        "helpUrl": baseHelpUrl+"appversioncode"
    },{
        "type": "app_launch_app",
        "message0": "打开应用 应用名: %1",
        "args0":[
            {"type":"input_value","name":"APP_NAME","check":"String"}
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": colour,
        "tooltip": "通过应用名称启动应用。如果该名称对应的应用不存在，则返回false; 否则返回true。如果该名称对应多个应用，则只启动其中某一个。",
        "helpUrl": baseHelpUrl+"applaunchappappname"
    }
]);
