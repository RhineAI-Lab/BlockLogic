'use strict';

goog.provide('Blockly.Blocks.Coordinate');  // Deprecated
goog.provide('Blockly.Constants.Coordinate');

goog.require('Blockly');
goog.require('Blockly.Blocks');
goog.require('Blockly.FieldDropdown');
goog.require('Blockly.FieldLabel');
goog.require('Blockly.Mutator');

var colour = 230;
var baseHelpUrl = "https://pro.autojs.org/docs/#/zh-cn/coordinatesBasedAutomation?id=";

Blockly.defineBlocksWithJsonArray([
    {
        "type": "coordinate_set_screen",
        "message0": "等比适应分辨率  宽: %1 高: %2",
        "tooltip": "等比例缩放屏幕分辨率至指定分辨率",
        "args0": [{"type": "input_value", "name": "W", "check": "Number"},
            {"type": "input_value", "name": "H", "check": "Number", "align": "RIGHT"}],
        "inputsInline": true, "previousStatement": null, "nextStatement": null, "colour": colour,
        "helpUrl": baseHelpUrl+"setscreenmetricswidth-height"
    },{
        "type": "coordinate_click",
        "message0": "点击屏幕   坐标 X: %1 Y: %2",
        "tooltip": "根据坐标点击屏幕",
        "args0": [{"type": "input_value", "name": "X", "check": "Number"},
            {"type": "input_value", "name": "Y", "check": "Number", "align": "RIGHT"}],
        "inputsInline": true, "previousStatement": null, "nextStatement": null, "colour": colour,
        "helpUrl": baseHelpUrl+"clickx-y"
    },{
        "type": "coordinate_long_click",
        "message0": "长按屏幕   坐标 X: %1 Y: %2",
        "tooltip": "根据坐标长按屏幕",
        "args0": [{"type": "input_value", "name": "X", "check": "Number"},
            {"type": "input_value", "name": "Y", "check": "Number", "align": "RIGHT"}],
        "inputsInline": true, "previousStatement": null, "nextStatement": null, "colour": colour,
        "helpUrl": baseHelpUrl+"longclickx-y"
    }, {
        "type": "coordinate_press",
        "message0": "按住屏幕   坐标 X: %1 Y: %2 时长(毫秒): %3",
        "tooltip": "根据坐标按住屏幕",
        "args0": [{"type": "input_value", "name": "X", "check": "Number"},
            {"type": "input_value", "name": "Y", "check": "Number", "align": "RIGHT"},
            {"type": "input_value", "name": "D", "check": "Number", "align": "RIGHT"}],
        "inputsInline": true, "previousStatement": null, "nextStatement": null, "colour": colour,
        "helpUrl": baseHelpUrl+"pressx-y-duration"
    },{
        "type": "coordinate_swipe",
        "message0": "滑动   起点坐标 X: %1 Y: %2 终点坐标 X: %3 Y: %4 时长(毫秒): %5",
        "tooltip": "根据坐标滑动屏幕",
        "args0": [{"type": "input_value", "name": "X1", "check": "Number"},
            {"type": "input_value", "name": "Y1", "check": "Number", "align": "RIGHT"},
            {"type": "input_value", "name": "X2", "check": "Number", "align": "RIGHT"},
            {"type": "input_value", "name": "Y2", "check": "Number", "align": "RIGHT"},
            {"type": "input_value", "name": "D", "check": "Number", "align": "RIGHT"}],
        "previousStatement": null, "nextStatement": null, "colour": colour,
        "helpUrl": baseHelpUrl+"swipex1-y1-x2-y2-duration"
    },{
        "type": "coordinate_root_tap",
        "message0": "点击屏幕(Root权限)   坐标 X: %1 Y: %2",
        "tooltip": "根据坐标点击屏幕",
        "args0": [{"type": "input_value", "name": "X", "check": "Number"},
            {"type": "input_value", "name": "Y", "check": "Number", "align": "RIGHT"}],
        "inputsInline": true, "previousStatement": null, "nextStatement": null, "colour": colour,
        "helpUrl": baseHelpUrl+"tapx-y"
    },{
        "type": "coordinate_root_swipe",
        "message0": "滑动(Root权限)   起点坐标 X: %1 Y: %2 终点坐标 X: %3 Y: %4 时长(毫秒): %5",
        "tooltip": "根据坐标滑动屏幕",
        "args0": [{"type": "input_value", "name": "X1", "check": "Number"},
            {"type": "input_value", "name": "Y1", "check": "Number", "align": "RIGHT"},
            {"type": "input_value", "name": "X2", "check": "Number", "align": "RIGHT"},
            {"type": "input_value", "name": "Y2", "check": "Number", "align": "RIGHT"},
            {"type": "input_value", "name": "D", "check": "Number", "align": "RIGHT"}
        ],
        "previousStatement": null, "nextStatement": null, "colour": colour,
        "helpUrl": baseHelpUrl+"swipex1-y1-x2-y2-duration-1"
    }
]);
