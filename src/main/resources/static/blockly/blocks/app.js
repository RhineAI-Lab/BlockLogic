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
    }
]);
