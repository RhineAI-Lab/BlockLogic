'use strict';

goog.provide('Blockly.Blocks.Automator');  // Deprecated
goog.provide('Blockly.Constants.Automator');

goog.require('Blockly');
goog.require('Blockly.Blocks');
goog.require('Blockly.FieldDropdown');
goog.require('Blockly.FieldLabel');
goog.require('Blockly.Mutator');

var colour = "#e6645c";
var baseHelpUrl = "https://pro.autojs.org/docs/#/zh-cn/coordinatesBasedAutomation?id=";

Blockly.defineBlocksWithJsonArray([
    {
         "type": "automator_new",
         "message0": "新建触摸模拟对象",
         "output": "AutomatorObject",
         "colour": colour,
         "tooltip": "新建一个触摸模拟对象，可将他存在变量便于以后使用",
         "helpUrl": baseHelpUrl+"rootautomator"
    },{
        "type": "automator_tap",
        "message0": "点击 对象: %1 X: %2 Y: %3 手指: %4",
        "args0": [
            {"type": "input_value", "name": "OBJ", "check":"AutomatorObject"},
            {"type": "input_value", "name": "X", "check":"Number"},
            {"type": "input_value", "name": "Y", "check":"Number"},
            {"type": "input_value", "name": "F", "check":"Number"},
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": colour,
        "tooltip": "通过触摸对象进行点击",
        "helpUrl": baseHelpUrl+"rootautomatortapx-y-id"
    },{
        "type": "automator_long_press",
        "message0": "点击 对象: %1 X: %2 Y: %3 手指: %4",
        "args0": [
            {"type": "input_value", "name": "OBJ", "check":"AutomatorObject"},
            {"type": "input_value", "name": "X", "check":"Number"},
            {"type": "input_value", "name": "Y", "check":"Number"},
            {"type": "input_value", "name": "F", "check":"Number"},
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": colour,
        "tooltip": "通过触摸对象进行长按",
        "helpUrl": baseHelpUrl+"rootautomatorlongpressx-y-id"
    },{
        "type": "automator_swipe",
        "message0": "滑动 对象: %1 起点X: %2 起点Y: %3 终点X: %4 终点Y: %5 用时(毫秒): %6 手指: %7",
        "args0": [
            {"type": "input_value", "name": "OBJ", "check":"AutomatorObject"},
            {"type": "input_value", "name": "X1", "check":"Number"},
            {"type": "input_value", "name": "Y1", "check":"Number"},
            {"type": "input_value", "name": "X2", "check":"Number"},
            {"type": "input_value", "name": "Y2", "check":"Number"},
            {"type": "input_value", "name": "D", "check":"Number"},
            {"type": "input_value", "name": "F", "check":"Number"},
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": colour,
        "tooltip": "通过触摸对象进行滑动",
        "helpUrl": baseHelpUrl+"rootautomatortapx-y-id"
    },{
        "type": "automator_press",
        "message0": "按压 对象: %1 X: %2 Y: %3 用时(毫秒): %4 手指: %5",
        "args0": [
            {"type": "input_value", "name": "OBJ", "check":"AutomatorObject"},
            {"type": "input_value", "name": "X", "check":"Number"},
            {"type": "input_value", "name": "Y", "check":"Number"},
            {"type": "input_value", "name": "D", "check":"Number"},
            {"type": "input_value", "name": "F", "check":"Number"},
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": colour,
        "tooltip": "通过触摸对象进行滑动",
        "helpUrl": baseHelpUrl+"rootautomatortapx-y-id"
    },{
        "type": "automator_touch_down",
        "message0": "点下 对象: %1 X: %2 Y: %3 手指: %4",
        "args0": [
            {"type": "input_value", "name": "OBJ", "check":"AutomatorObject"},
            {"type": "input_value", "name": "X", "check":"Number"},
            {"type": "input_value", "name": "Y", "check":"Number"},
            {"type": "input_value", "name": "F", "check":"Number"},
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": colour,
        "tooltip": "通过触摸对象按下指定位置",
        "helpUrl": baseHelpUrl+"rootautomatortouchdownx-y-id"
    },{
        "type": "automator_touch_move",
        "message0": "移动 对象: %1 X: %2 Y: %3 手指: %4",
        "args0": [
            {"type": "input_value", "name": "OBJ", "check":"AutomatorObject"},
            {"type": "input_value", "name": "X", "check":"Number"},
            {"type": "input_value", "name": "Y", "check":"Number"},
            {"type": "input_value", "name": "F", "check":"Number"},
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": colour,
        "tooltip": "移动按下的手指",
        "helpUrl": baseHelpUrl+"rootautomatortouchmovex-y-id"
    },{
        "type": "automator_touch_up",
        "message0": "抬起 对象: %1 手指: %2",
        "args0": [
            {"type": "input_value", "name": "OBJ", "check":"AutomatorObject"},
            {"type": "input_value", "name": "F", "check":"Number"},
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": colour,
        "tooltip": "抬起按下的手指",
        "helpUrl": baseHelpUrl+"rootautomatortouchupid"
    }
]);
