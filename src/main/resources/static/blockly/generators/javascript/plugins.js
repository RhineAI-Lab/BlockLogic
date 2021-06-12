'use strict';

goog.provide('Blockly.JavaScript.$plugins.load');
goog.require('Blockly.JavaScript');

Blockly.JavaScript['$plugins_load'] = function(block) {
    var name_value =Blockly.JavaScript.valueToCode(block,'LOAD',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = "$plugins.load("+name_value+");\n";
    return code;
};


