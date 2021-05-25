'use strict';

goog.provide('Blockly.Blocks.Puzzle');  // Deprecated
goog.provide('Blockly.Constants.Puzzle');

goog.require('Blockly');
goog.require('Blockly.Blocks');
goog.require('Blockly.FieldDropdown');
goog.require('Blockly.FieldLabel');
goog.require('Blockly.Mutator');

var colour = "#999999";

Blockly.defineBlocksWithJsonArray([
    {
        "type": "puzzle_left_to_up_down",
        "message0": "%1",
        "args0": [{"type": "input_value", "name": "VALUE"}],
        "previousStatement": null,
        "nextStatement": null,
        "colour": colour,
        "tooltip": "用于将属性块封装成语句",
    },{
        "type": "puzzle_block_attr",
        "message0": "%1",
        "args0": [{"type": "field_multilinetext", "name": "TEXT", "text": ""}],
        "output": null,
        "colour": colour,
        "tooltip": "自定义有参代码块",
    },{
        "type": "puzzle_block",
        "message0": "%1",
        "args0": [{"type": "field_multilinetext", "name": "TEXT", "text": ""}],
        "previousStatement": null,
        "nextStatement": null,
        "colour": colour,
        "tooltip": "自定义代码块",
    }
]);
