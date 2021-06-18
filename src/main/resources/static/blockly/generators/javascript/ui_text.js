'use strict';

goog.provide('Blockly.JavaScript.ui_text');
goog.require('Blockly.JavaScript');

Blockly.JavaScript['ui_text_set_text'] = function(block) {
    var id_value = block.getFieldValue('ID');
    var text_value =Blockly.JavaScript.valueToCode(block,'TEXT',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = "ui."+id_value+".setText("+text_value+");\n";
    return code;
};
