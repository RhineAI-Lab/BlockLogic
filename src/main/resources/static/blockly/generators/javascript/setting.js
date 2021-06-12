'use strict';

goog.provide('Blockly.JavaScript.setting');
goog.require('Blockly.JavaScript');

Blockly.JavaScript['$settings_set_enabled'] = function(block) {
    var name_value =Blockly.JavaScript.valueToCode(block,'VALUE',Blockly.JavaScript.ORDER_ATOMIC,true);
    var name_value2 =Blockly.JavaScript.valueToCode(block,'KEY',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = "$settings.setEnabled("+name_value+name_value2+");\n";
    return code;
};
Blockly.JavaScript['$settings_is_enabled'] = function(block) {
    var name_value =Blockly.JavaScript.valueToCode(block,'SETTING',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = "$settings.isEnabled"+name_value+");\n";
    return code;
};

