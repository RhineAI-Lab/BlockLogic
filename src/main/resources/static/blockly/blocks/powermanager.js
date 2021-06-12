'use strict';

goog.provide('Blockly.Blocks.Powermanager');  // Deprecated
goog.provide('Blockly.Constants.Powermanager');

goog.require('Blockly');
goog.require('Blockly.Blocks');
goog.require('Blockly.FieldDropdown');
goog.require('Blockly.FieldLabel');
goog.require('Blockly.Mutator');

var colour = "#52a242";
var baseHelpUrl = "https://pro.autojs.org/docs/#/zh-cn/app?id=";

Blockly.defineBlocksWithJsonArray([
     {
        "type": "$power_manager_request_ignore_battery_optimizations2",
        "message0": " %1 忽略电池优化",
        "args0":[
        {"type":"field_dropdown","name":"BATTERY2","options":[["正常请求","false"],["强制请求","true"]]
    }
],
         "previousStatement": "null",
         "nextStatement": "null",
         "colour": colour,
         "tooltip":"",
         "helpUrl": baseHelpUrl+"power_managerrequestignorebatteryoptimizationsforcerequest-pkg"

    },
    {
        "type": "$power_manager_request_ignore_battery_optimizations",
        "message0": "为其他应用 %1 忽略电池优化 包名: %2 ",
        "args0":[
        {"type":"field_dropdown","name":"BATTERY","options":[["正常请求","false"],["强制请求","true"]]},
        {"type":"input_value","name":"TWO","check":"Boolean"}
],
         "previousStatement": "null",
         "nextStatement": "null",
         "colour": colour,
         "tooltip":"",
         "helpUrl": baseHelpUrl+"power_managerrequestignorebatteryoptimizationsforcerequest-pkg"

    },
    {
        "type": "$power_manager_is_ignoring_battery_optimizations",
        "message0": "本应用是否启用忽略电池优化",
        "output":"String",
         "colour": colour,
         "tooltip":"",
         "helpUrl": baseHelpUrl+"power_managerisignoringbatteryoptimizationspkg"

    },
    {
        "type": "$power_manager_is_ignoring_battery_optimizations2",
        "message0": "该应用是否启用忽略电池优化 %1 ",
        "args0":[
        {"type":"input_value","name":"MANAGER","check":"Boolean"}
],
         "output":"String",
         "colour": colour,
         "tooltip":"",
         "helpUrl": baseHelpUrl+"power_managerisignoringbatteryoptimizationspkg"

    },


])
