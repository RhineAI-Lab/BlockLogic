'use strict';

goog.provide('Blockly.JavaScript.storages');

goog.require('Blockly.JavaScript');

Blockly.JavaScript['storages_create'] = function (block) {
    var type = block.getFieldValue('TYPE');
    var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
        Blockly.JavaScript.ORDER_ATOMIC);
    var code = 'storages.' + type + '(' + value + ')';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript['storages_get'] = function (block) {
    var storage = Blockly.JavaScript.valueToCode(block, 'STORAGE',
        Blockly.JavaScript.ORDER_ATOMIC);
    var key = Blockly.JavaScript.valueToCode(block, 'KEY',
        Blockly.JavaScript.ORDER_ATOMIC);
    var default_value = Blockly.JavaScript.valueToCode(block, 'DEFAULT_VALUE',
        Blockly.JavaScript.ORDER_ATOMIC);
    var code = storage + '.get(' + key
        + (default_value ? ',' + default_value : '') + ')';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript['storages_put'] = function (block) {
    var storage = Blockly.JavaScript.valueToCode(block, 'STORAGE',
        Blockly.JavaScript.ORDER_ATOMIC);
    var key = Blockly.JavaScript.valueToCode(block, 'KEY',
        Blockly.JavaScript.ORDER_ATOMIC);
    var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
        Blockly.JavaScript.ORDER_ATOMIC);
    var code = storage + '.put(' + key + ',' + value + ');\n';
    return code;
}

Blockly.JavaScript['storages_remove'] = function (block) {
    var storage = Blockly.JavaScript.valueToCode(block, 'STORAGE',
        Blockly.JavaScript.ORDER_ATOMIC);
    var key = Blockly.JavaScript.valueToCode(block, 'KEY',
        Blockly.JavaScript.ORDER_ATOMIC);
    var code = storage + '.remove(' + key + ');\n';
    return code;
}

Blockly.JavaScript['storages_contains'] = function (block) {
    var storage = Blockly.JavaScript.valueToCode(block, 'STORAGE',
        Blockly.JavaScript.ORDER_ATOMIC);
    var key = Blockly.JavaScript.valueToCode(block, 'KEY',
        Blockly.JavaScript.ORDER_ATOMIC);
    var code = storage + '.contains(' + key + ')';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript['storages_clear'] = function (block) {
    var storage = Blockly.JavaScript.valueToCode(block, 'STORAGE',
        Blockly.JavaScript.ORDER_ATOMIC);
    var code = storage + '.clear();\n';
    return code;
}