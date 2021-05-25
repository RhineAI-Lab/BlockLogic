'use strict';

goog.provide('Blockly.JavaScript.puzzle');
goog.require('Blockly.JavaScript');

Blockly.JavaScript['puzzle_left_to_up_down'] = function(block) {
    var value_value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = value_value+';\n';
    return code;
};

Blockly.JavaScript['puzzle_block_attr'] = function(block) {
    var value_value = Blockly.JavaScript.quote_(block.getFieldValue('TEXT'));
    value_value = value_value.substring(1,value_value.length-1);
    var code = value_value;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['puzzle_block'] = function(block) {
    var value_value = Blockly.JavaScript.quote_(block.getFieldValue('TEXT'));
    value_value = value_value.substring(1,value_value.length-1);
    var code = value_value+'\n';
    return code;
};
