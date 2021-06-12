'use strict';

goog.provide('Blockly.JavaScript.powermanager');
goog.require('Blockly.JavaScript');

Blockly.JavaScript['$power_manager_request_ignore_battery_optimizations2'] = function(block) {
    var name_value =Blockly.JavaScript.valueToCode(block,'BATTERY2',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = "$power_manager.requestIgnoreBatteryOptimizations2("+name_value+");\n";
    return code;
};
Blockly.JavaScript['$power_manager_request_ignore_battery_optimizations'] = function(block) {
    var name_value =Blockly.JavaScript.valueToCode(block,'BATTERY',Blockly.JavaScript.ORDER_ATOMIC,true);
    var name_value2 =Blockly.JavaScript.valueToCode(block,'TWO',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = "$power_manager.requestIgnoreBatteryOptimizations("+name_value+name_value2+");\n";
    return code;
};
Blockly.JavaScript['$power_manager_is_ignoring_battery_optimizations'] = function(block) {
   var code = "$power_manager.isIgnoringBatteryOptimizations("+name_value+");\n";
   return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript['$power_manager_is_ignoring_battery_optimizations2'] = function(block) {
    var name_value =Blockly.JavaScript.valueToCode(block,'MANAGER',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = "$power_manager.isIgnoringBatteryOptimizations("+name_value+");\n";
    return code;
};


