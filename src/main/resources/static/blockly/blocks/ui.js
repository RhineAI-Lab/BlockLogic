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
        "args0": [{"type": "field_multilinetext", "name": "TEXT", "text": "<frame>\n</frame>"}],
        "output": "UiXml",
        "colour": colour,
        "tooltip": "XML页面布局",
    }
]);
