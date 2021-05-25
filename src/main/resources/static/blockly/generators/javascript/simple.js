'use strict';

goog.provide('Blockly.JavaScript.simple');
goog.require('Blockly.JavaScript');

Blockly.JavaScript['simple_click'] = function(block) {
    var value_i = Blockly.JavaScript.valueToCode(block, 'I', Blockly.JavaScript.ORDER_ATOMIC, true);
    var value_text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC, true);
    console.log(value_i);
    if(value_i!="-1"){
        value_text+=","+value_i
    }
    var code = "click("+value_text+")";
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['simple_long_click'] = function(block) {
    var value_i = Blockly.JavaScript.valueToCode(block, 'I', Blockly.JavaScript.ORDER_ATOMIC, true);
    var value_text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC, true);
    console.log(value_i);
    if(value_i!="-1"){
        value_text+=","+value_i
    }
    var code = "longClick("+value_text+")";
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['simple_scroll_up'] = function(block) {
    var value_i = Blockly.JavaScript.valueToCode(block, 'I', Blockly.JavaScript.ORDER_ATOMIC, true);
    var value_text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC, true);
    console.log(value_i);
    if(value_i!="-1"){
        value_text+=","+value_i
    }
    var code = "scrollUp("+value_text+")";
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['simple_scroll_down'] = function(block) {
    var value_i = Blockly.JavaScript.valueToCode(block, 'I', Blockly.JavaScript.ORDER_ATOMIC, true);
    var value_text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC, true);
    console.log(value_i);
    if(value_i!="-1"){
        value_text+=","+value_i
    }
    var code = "scrollDown("+value_text+")";
    return [code, Blockly.JavaScript.ORDER_NONE];
};



Blockly.JavaScript['simple_set_text'] = function(block) {
    var value_i = Blockly.JavaScript.valueToCode(block, 'I', Blockly.JavaScript.ORDER_ATOMIC, true);
    var value_text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC, true);
    console.log(value_i);
    if(value_i!="-1"){
        value_text=value_i+","+value_text
    }
    var code = "setText("+value_text+")";
    return [code, Blockly.JavaScript.ORDER_NONE];
};



Blockly.JavaScript['simple_input'] = function(block) {
    var value_i = Blockly.JavaScript.valueToCode(block, 'I', Blockly.JavaScript.ORDER_ATOMIC, true);
    var value_text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC, true);
    console.log(value_i);
    if(value_i!="-1"){
        value_text=value_i+","+value_text
    }
    var code = "input("+value_text+")";
    return [code, Blockly.JavaScript.ORDER_NONE];
};
