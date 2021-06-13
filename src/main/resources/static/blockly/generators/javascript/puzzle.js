'use strict';

goog.provide('Blockly.JavaScript.puzzle');
goog.require('Blockly.JavaScript');

Blockly.JavaScript['puzzle'] = function(block) {
    var value_value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = value_value+';\n';
    return code;
};

Blockly.JavaScript['puzzle_block_attr'] = function(block) {
    var value = block.getFieldValue('TEXT');
    return [value, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['puzzle_block'] = function(block) {
    var value = block.getFieldValue('TEXT');
    var code = value+'\n';
    return code;
};
