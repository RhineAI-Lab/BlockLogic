'use strict';

goog.provide('Blockly.Blocks.UiBtn');  // Deprecated
goog.provide('Blockly.Constants.UiBtn');

goog.require('Blockly');
goog.require('Blockly.Blocks');
goog.require('Blockly.FieldDropdown');
goog.require('Blockly.FieldLabel');
goog.require('Blockly.Mutator');

var colour = "#3c2eaf";
var baseHelpUrl = "https://pro.autojs.org/docs/#/zh-cn/ui?id=";

Blockly.defineBlocksWithJsonArray([
    {
        "type": "ui_btn_on_click",
        "message0": "当控件 %1 被点击",
        "message1": " %1",
        "args0": [
            {"type":"field_input","name": "ID","text":"id"},
        ],
        "args1": [
            {"type":"input_statement","name":"STAT"},
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": colour,
        "tooltip": "当控件被点击时运行",
        "helpUrl": baseHelpUrl+"attrname-value"
    },
]);
