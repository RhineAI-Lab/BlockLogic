'use strict';

goog.provide('Blockly.JavaScript.auto');
goog.require('Blockly.JavaScript');

Blockly.JavaScript['auto_wait_for'] = function(block) {
    var code = "auto.waitFor();\n";
    return code;
};

Blockly.JavaScript['auto_set_mode'] = function(block) {
    var dropdown_mode = block.getFieldValue('MODE');
    var code = "auto.setMode('"+dropdown_mode+"');\n";
    return code;
};

Blockly.JavaScript['auto_set_flags'] = function(block) {
    var dropdown_mode = block.getFieldValue('FLAG');
    var code = "auto.setFlags(['"+dropdown_mode+"']);\n";
    return code;
};

Blockly.JavaScript['auto_service'] = function(block) {
    var code = "auto.service";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['auto_windows'] = function(block) {
    var code = "auto.windows";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['auto_root'] = function(block) {
    var code = "auto.root";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['auto_root_in_active_window'] = function(block) {
    var code = "auto.rootInActiveWindow";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['auto_set_window_filter'] = function(block) {
    var value = Blockly.JavaScript.valueToCode(block, 'FILTER', Blockly.JavaScript.ORDER_ATOMIC, true);
    var code = "auto.setWindowFilter('"+value+"');\n";
    return code;
};
