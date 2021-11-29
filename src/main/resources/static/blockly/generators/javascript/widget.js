'use strict';

goog.provide('Blockly.JavaScript.widget');
goog.require('Blockly.JavaScript');

Blockly.JavaScript['widget_do_text'] = function(block) {
    var dropdown_attr = block.getFieldValue('ATTR');
    var dropdown_way = block.getFieldValue('WAY');
    var text_value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC, true);
    var dropdown_meth = block.getFieldValue('METH');
    var code = dropdown_attr+dropdown_way+"("+text_value+").findOne()."+dropdown_meth+"();\n";
    return code;
};

Blockly.JavaScript['widget_attr_selector'] = function(block) {
    var dropdown_attr = block.getFieldValue('ATTR');
    var dropdown_way = block.getFieldValue('WAY');
    var text_value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC, true);
    var code = dropdown_attr+dropdown_way+"("+text_value+")";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['widget_status_selector'] = function(block) {
    var dropdown_attr = block.getFieldValue('ATTR');
    var dropdown_value = block.getFieldValue('VALUE');
    var code = dropdown_attr+"("+dropdown_value+")";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['widget_find_one'] = function(block) {
    var value_selector = Blockly.JavaScript.valueToCode(block, 'SELECTOR', Blockly.JavaScript.ORDER_ATOMIC, true);
    var code = value_selector+".findOne()";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['widget_parent'] = function(block) {
    var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC, true);
    var code = value+".parent()";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['widget_children'] = function(block) {
    var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC, true);
    var code = value+".children()";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['widget_find_once'] = function(block) {
    var value_selector = Blockly.JavaScript.valueToCode(block, 'SELECTOR', Blockly.JavaScript.ORDER_ATOMIC, true);
    var code = value_selector+".findOnce()";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['widget_exists'] = function(block) {
    var value_selector = Blockly.JavaScript.valueToCode(block, 'SELECTOR', Blockly.JavaScript.ORDER_ATOMIC, true);
    var code = value_selector+".exists()";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['widget_until_find'] = function(block) {
    var value_selector = Blockly.JavaScript.valueToCode(block, 'SELECTOR', Blockly.JavaScript.ORDER_ATOMIC, true);
    var code = value_selector+".untilFind()";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['widget_find'] = function(block) {
    var value_selector = Blockly.JavaScript.valueToCode(block, 'SELECTOR', Blockly.JavaScript.ORDER_ATOMIC, true);
    var code = value_selector+".find()";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['widget_wait'] = function(block) {
    var value_selector = Blockly.JavaScript.valueToCode(block, 'SELECTOR', Blockly.JavaScript.ORDER_ATOMIC, true);
    var code = value_selector+".waitFor();\n";
    return code;
};

Blockly.JavaScript['widget_until_find'] = function(block) {
    var value_selector = Blockly.JavaScript.valueToCode(block, 'SELECTOR', Blockly.JavaScript.ORDER_ATOMIC, true);
    var code = value_selector+".untilFind()";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['widget_operate'] = function(block) {
    var dropdown_meth = block.getFieldValue('METH');
    var value_selector = Blockly.JavaScript.valueToCode(block, 'WIDGET', Blockly.JavaScript.ORDER_ATOMIC, true);
    var code = value_selector+'.'+dropdown_meth+"()";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['widget_set_text'] = function(block) {
    var value_selector = Blockly.JavaScript.valueToCode(block, 'WIDGET', Blockly.JavaScript.ORDER_ATOMIC, true);
    var value_text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC, true);
    var code = value_selector+".setText("+value_text+")";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['widget_get_attr'] = function(block) {
    var dropdown_meth = block.getFieldValue('METH');
    var value_selector = Blockly.JavaScript.valueToCode(block, 'WIDGET', Blockly.JavaScript.ORDER_ATOMIC, true);
    var code = value_selector+'.'+dropdown_meth+"()";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['widget_selectors_join'] = function(block) {
    var elements = new Array(block.itemCount_);
    for (var i = 0; i < block.itemCount_; i++) {
        elements[i] = Blockly.JavaScript.valueToCode(block, 'ADD' + i, Blockly.JavaScript.ORDER_ATOMIC,true);
    }
    var code = elements.join('.');
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['widget_algorithm'] = function(block) {
    var dropdown_way = block.getFieldValue('WAY');
    var value_selector = Blockly.JavaScript.valueToCode(block, 'SELECTOR', Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = value_selector+".algorithm('"+dropdown_way+"')";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
