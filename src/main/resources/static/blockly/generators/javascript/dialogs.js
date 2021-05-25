'use strict';

goog.provide('Blockly.JavaScript.dialogs');

goog.require('Blockly.JavaScript');


Blockly.JavaScript['dialogs_alert'] = function (block) {
    var type = block.getFieldValue('TYPE');
    var title = Blockly.JavaScript.valueToCode(block, 'TITLE',
        Blockly.JavaScript.ORDER_ATOMIC);
    var content = Blockly.JavaScript.valueToCode(block, 'CONTENT',
        Blockly.JavaScript.ORDER_ATOMIC);
    var code = 'dialogs.' + type + '(' + title + ', ' + content + ')';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['dialogs_input'] = function (block) {
    var type = block.getFieldValue('TYPE');
    var title = Blockly.JavaScript.valueToCode(block, 'TITLE',
        Blockly.JavaScript.ORDER_ATOMIC);
    var content = Blockly.JavaScript.valueToCode(block, 'CONTENT',
        Blockly.JavaScript.ORDER_ATOMIC);
    var code = 'dialogs.' + type + '(' + title + ', ' + content + ')';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['dialogs_select'] = function (block) {
    var type = block.getFieldValue('TYPE');
    var title = Blockly.JavaScript.valueToCode(block, 'TITLE',
        Blockly.JavaScript.ORDER_ATOMIC);
    var content = Blockly.JavaScript.valueToCode(block, 'CONTENT',
        Blockly.JavaScript.ORDER_ATOMIC);
    var code = 'dialogs.' + type + '(' + title + ', ' + content + ')';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['dialogs_alert_callback'] = function (block) {
    var type = block.getFieldValue('TYPE');
    var title = Blockly.JavaScript.valueToCode(block, 'TITLE',
        Blockly.JavaScript.ORDER_ATOMIC);
    var content = Blockly.JavaScript.valueToCode(block, 'CONTENT',
        Blockly.JavaScript.ORDER_ATOMIC);
    var func = Blockly.JavaScript.valueToCode(block, 'FUNCTION',
        Blockly.JavaScript.ORDER_ATOMIC);
    console.log(func);
    var code = 'dialogs.' + type
        + '(' + title + ',' + content + (func ? ',' + func : '') + '); \n';
    return code;
};

Blockly.JavaScript['dialogs_input_callback'] = function (block) {
    var type = block.getFieldValue('TYPE');
    var title = Blockly.JavaScript.valueToCode(block, 'TITLE',
        Blockly.JavaScript.ORDER_ATOMIC);
    var content = Blockly.JavaScript.valueToCode(block, 'CONTENT',
        Blockly.JavaScript.ORDER_ATOMIC);
    var func = Blockly.JavaScript.valueToCode(block, 'FUNCTION',
        Blockly.JavaScript.ORDER_ATOMIC);
    console.log(func);
    var code = 'dialogs.' + type
        + '(' + title + ',' + content + (func ? ',' + func : '') + '); \n';
    return code;
};

Blockly.JavaScript['dialogs_select_callback'] = function (block) {
    var type = block.getFieldValue('TYPE');
    var title = Blockly.JavaScript.valueToCode(block, 'TITLE',
        Blockly.JavaScript.ORDER_ATOMIC);
    var content = Blockly.JavaScript.valueToCode(block, 'CONTENT',
        Blockly.JavaScript.ORDER_ATOMIC);
    var func = Blockly.JavaScript.valueToCode(block, 'FUNCTION',
        Blockly.JavaScript.ORDER_ATOMIC);
    console.log(func);
    var code = 'dialogs.' + type
        + '(' + title + ',' + content + (func ? ',' + func : '') + '); \n';
    return code;
};

