'use strict';

goog.provide('Blockly.JavaScript.powermanager');
goog.require('Blockly.JavaScript');

Blockly.JavaScript['$power_manager_request_ignore_battery_optimizations2'] = function(block) {
    var battery_checked = block.getFieldValue('BATTERY2');
    var code = "$power_manager.requestIgnoreBatteryOptimizations("+battery_checked+");\n";
    return code;
};
Blockly.JavaScript['$power_manager_request_ignore_battery_optimizations'] = function(block) {
    var battery_checked = block.getFieldValue('BATTERY');
    var pkg_value = Blockly.JavaScript.valueToCode(block,'PKG',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = "$power_manager.requestIgnoreBatteryOptimizations("+battery_checked+","+pkg_value+");\n";
    return code;
};
Blockly.JavaScript['$power_manager_is_ignoring_battery_optimizations'] = function(block) {
   var code = "$power_manager.isIgnoringBatteryOptimizations()";
   return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript['$power_manager_is_ignoring_battery_optimizations2'] = function(block) {
    var pkg_value =Blockly.JavaScript.valueToCode(block,'PKG',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = "$power_manager.isIgnoringBatteryOptimizations("+pkg_value+")";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};


