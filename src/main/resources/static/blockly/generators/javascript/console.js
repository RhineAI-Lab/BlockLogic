'use strict';

goog.provide('Blockly.JavaScript.console');
goog.require('Blockly.JavaScript');

Blockly.JavaScript['console_show'] = function (block) {
    var value = block.getFieldValue('VALUE');
    return "console."+value+"();\n";
};

Blockly.JavaScript['console_clear'] = function (block) {
    return 'console.clear();\n';
};

Blockly.JavaScript['console_output'] = function (block) {
    var TYPE = block.getFieldValue('TYPE');
    var CONTENT = Blockly.JavaScript.valueToCode(block, 'CONTENT',
        Blockly.JavaScript.ORDER_ATOMIC);
    return "console."+TYPE+"("+CONTENT+");\n";
};

Blockly.JavaScript['console_time'] = function (block) {
    var TYPE = block.getFieldValue('TYPE');
    var NAME = Blockly.JavaScript.valueToCode(block, 'NAME',
        Blockly.JavaScript.ORDER_ATOMIC);
    return "console."+TYPE+"("+NAME+");\n";
};

Blockly.JavaScript['console_set_size'] = function (block) {
    var WIDTH = Blockly.JavaScript.valueToCode(block, 'WIDTH',
        Blockly.JavaScript.ORDER_ATOMIC);
    var HEIGHT = Blockly.JavaScript.valueToCode(block, 'HEIGHT',
        Blockly.JavaScript.ORDER_ATOMIC);
    return "console.setSize("+WIDTH+","+HEIGHT+");\n";
};

Blockly.JavaScript['console_set_position'] = function (block) {
    var X = Blockly.JavaScript.valueToCode(block, 'X',
        Blockly.JavaScript.ORDER_ATOMIC);
    var Y = Blockly.JavaScript.valueToCode(block, 'Y',
        Blockly.JavaScript.ORDER_ATOMIC);
    return "console.setPosition("+X+","+Y+");\n";
};

Blockly.JavaScript['console_config'] = function (block) {
    var branch = Blockly.JavaScript.statementToCode(block, 'DO');
    branch = Blockly.JavaScript.addLoopTrap(branch, block);
    return "console.setGlobalLogConfig({\n"+branch+"});\n";
};

Blockly.JavaScript['console_config_path'] = function (block) {
    var PATH = Blockly.JavaScript.valueToCode(block, 'VALUE',
        Blockly.JavaScript.ORDER_ATOMIC);
    return "'path':"+PATH+",\n";
};

Blockly.JavaScript['console_config_file_size'] = function (block) {
    var VALUE = Blockly.JavaScript.valueToCode(block, 'VALUE',
        Blockly.JavaScript.ORDER_ATOMIC);
    return "'maxFileSize':"+VALUE+",\n";
};

Blockly.JavaScript['console_config_level'] = function (block) {
    var VALUE = block.getFieldValue('VALUE');
    return "'rootLevel':'"+VALUE+"',\n";
};

Blockly.JavaScript['console_config_backup_size'] = function (block) {
    var VALUE = Blockly.JavaScript.valueToCode(block, 'VALUE',
        Blockly.JavaScript.ORDER_ATOMIC);
    return "'maxBackupSize':"+VALUE+",\n";
};

Blockly.JavaScript['console_config_file_pattern'] = function (block) {
    var VALUE = Blockly.JavaScript.valueToCode(block, 'VALUE',
        Blockly.JavaScript.ORDER_ATOMIC);
    return "'filePattern':"+VALUE+",\n";
};
