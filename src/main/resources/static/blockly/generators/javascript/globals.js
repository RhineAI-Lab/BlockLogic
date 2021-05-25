'use strict';

goog.provide('Blockly.JavaScript.globals');
goog.require('Blockly.JavaScript');

Blockly.JavaScript['globals_sleep'] = function (block) {
    var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
        Blockly.JavaScript.ORDER_ATOMIC);
    var code = 'sleep(' + value + ');\n';
    return code;
};

Blockly.JavaScript['globals_current_package'] = function (block) {
    return ['currentPackage()', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['globals_current_activity'] = function (block) {
    return ['currentActivity()', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['globals_set_clip'] = function (block) {
    var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
        Blockly.JavaScript.ORDER_ATOMIC);
    var code = 'setClip(' + value + ');\n';
    return code;
};

Blockly.JavaScript['globals_get_clip'] = function (block) {
    return ['getClip()', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['globals_toast'] = function (block) {
    var isLog = block.getFieldValue('TYPE');
    var content = Blockly.JavaScript.valueToCode(block, 'CONTENT',
        Blockly.JavaScript.ORDER_ATOMIC);
    var code = 'toast'
        + (isLog === 'TRUE' ? 'Log' : '')
        + '(' + content + ');\n';
    return code;
};

Blockly.JavaScript['globals_wait_for_activity'] = function (block) {
    var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
        Blockly.JavaScript.ORDER_ATOMIC);
    var code = 'waitForActivity(' + value + ');\n';
    return code;
};

Blockly.JavaScript['globals_wait_for_package'] = function (block) {
    var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
        Blockly.JavaScript.ORDER_ATOMIC);
    var code = 'waitForPackage(' + value + ');\n';
    return code;
};

Blockly.JavaScript['globals_exit'] = function (block) {
    return 'exit();\n';
};

Blockly.JavaScript['globals_random'] = function (block) {
    var min = Blockly.JavaScript.valueToCode(block, 'MIN',
        Blockly.JavaScript.ORDER_ATOMIC);
    var max = Blockly.JavaScript.valueToCode(block, 'MAX',
        Blockly.JavaScript.ORDER_ATOMIC);
    var code = 'random(' + min + ',' + max + ')';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['globals_random_float'] = function (block) {
    return ['random()', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['globals_requires_api'] = function (block) {
    var value = block.getFieldValue('VALUE');
    return 'requiresApi(' + value + ');\n';
};

Blockly.JavaScript['globals_requires_version'] = function (block) {
    var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
        Blockly.JavaScript.ORDER_ATOMIC);
    var num = parseInt(value.substring(1,value.length-1));
    if(!isNaN(num)){
        value = num+"";
    }
    return 'requiresAutojsVersion(' + value + ');\n';
};

Blockly.JavaScript['globals_request_permissions'] = function (block) {
    var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
        Blockly.JavaScript.ORDER_ATOMIC);
    return 'runtime.requestPermissions(' + value + ');\n';
};

Blockly.JavaScript['globals_load_jar'] = function (block) {
    var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
        Blockly.JavaScript.ORDER_ATOMIC);
    return 'runtime.loadJar(' + value + ');\n';
};

Blockly.JavaScript['globals_load_dex'] = function (block) {
    var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
        Blockly.JavaScript.ORDER_ATOMIC);
    return 'runtime.loadDex(' + value + ');\n';
};
