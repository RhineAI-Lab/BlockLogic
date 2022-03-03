'use strict';

goog.provide('Blockly.JavaScript.setting');
goog.require('Blockly.JavaScript');

Blockly.JavaScript['$settings_set_enabled'] = function(block) {
    var flag = block.getFieldValue('VALUE');
    var value = block.getFieldValue('KEY');
    var code = "$settings.setEnabled(\""+value+"\","+flag+");\n";
    return code;
};
Blockly.JavaScript['$settings_is_enabled'] = function(block) {
    var value = block.getFieldValue('KEY');
    var code = "$settings.isEnabled(\""+value+"\");\n";
    return code;
};

