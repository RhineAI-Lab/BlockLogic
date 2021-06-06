'use strict';

goog.provide('Blockly.JavaScript.debug');
goog.require('Blockly.JavaScript');

Blockly.JavaScript['$debug_dump_hprof'] = function(block) {
    var name_value =Blockly.JavaScript.valueToCode(block,'HPROF',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = "$debug.dumpHprof("+name_value+");\n";
    return code;
};
Blockly.JavaScript['$debug_dump_and_send_hprof'] = function(block) {
    var code = "$debug.dumpAndSendHprof";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript['$debug_get_stack_trace'] = function(block) {
    var name_value =Blockly.JavaScript.valueToCode(block,'TRACE',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = "$debug.getStackTrace("+name_value+");\n";
    return code;
};
Blockly.JavaScript['$debug_set_memory_leak_detection_enabled'] = function(block) {
    var name_checked = block.getFieldValue('ENABLED');
    var code = "$debug.setMemoryLeakDetectionEnabled("+name_checked+");\n";
    return code;
};
    Blockly.JavaScript['$debug_gc'] = function(block) {
    var name_value =Blockly.JavaScript.valueToCode(block,'GC',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = "$debug.gc("+name_value+");\n";
    return code;
};



