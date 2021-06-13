'use strict';

goog.provide('Blockly.JavaScript.varFunction');
goog.require('Blockly.JavaScript');

Blockly.JavaScript['var_function_wc'] = function(block) {
    var stat = Blockly.JavaScript.statementToCode(block, 'STAT');
    var code = "function(){\n"+stat+"}";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['var_function'] = function(block) {
    var stat = Blockly.JavaScript.statementToCode(block, 'STAT');
    var elements = new Array(block.itemCount_);
    for (var i = 0; i < block.itemCount_; i++) {
        elements[i] = Blockly.JavaScript.valueToCode(block, 'ADD' + i, Blockly.JavaScript.ORDER_ATOMIC,true);
    }
    var code = "function("+elements.join(',')+"){\n"+stat+"}";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['var_function_return'] = function(block) {
    var name_value =Blockly.JavaScript.valueToCode(block,'VALUE',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = "return "+name_value+";\n";
    return code;
};
