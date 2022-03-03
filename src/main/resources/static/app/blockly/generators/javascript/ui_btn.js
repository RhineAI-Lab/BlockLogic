'use strict';

goog.provide('Blockly.JavaScript.ui_btn');
goog.require('Blockly.JavaScript');

Blockly.JavaScript['ui_btn_on_click'] = function(block) {
    var id_value = block.getFieldValue('ID');
    var stat_value =Blockly.JavaScript.statementToCode(block,'STAT',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = "ui."+id_value+".on(\"click\",()=>{\n"+stat_value+"});\n";
    return code;
};
