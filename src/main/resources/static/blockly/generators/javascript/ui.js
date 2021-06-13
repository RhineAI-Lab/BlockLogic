'use strict';

goog.provide('Blockly.JavaScript.ui');
goog.require('Blockly.JavaScript');

Blockly.JavaScript['ui_layout'] = function(block) {
    Blockly.JavaScript.setRunMode_("ui");
    var value =Blockly.JavaScript.valueToCode(block,'UI_XML',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = "$ui.layout(\n"+value+"\n);\n";
    return code;
};
Blockly.JavaScript['ui_layout_file'] = function(block) {
    Blockly.JavaScript.setRunMode_("ui");
    var value =Blockly.JavaScript.valueToCode(block,'FILE_PATH',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = "$ui.layoutFile("+value+");\n";
    return code;
};
Blockly.JavaScript['ui_xml'] = function(block) {
    var value = block.getFieldValue('TEXT');
    return [value, Blockly.JavaScript.ORDER_ATOMIC];
};




