'use strict';

goog.provide('Blockly.JavaScript.intent');
goog.require('Blockly.JavaScript');

Blockly.JavaScript['intent_intent'] = function(block) {
    var name_value =Blockly.JavaScript.valueToCode(block,'INTENT',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = "app.intent("+name_value+");\n";
    return code;
};
Blockly.JavaScript['intent_start_activity'] = function(block) {
    var name_value =Blockly.JavaScript.valueToCode(block,'START',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = "app.startActivity("+name_value+");\n";
    return code;
};
Blockly.JavaScript['intent_send_broadcast'] = function(block) {
    var name_value =Blockly.JavaScript.valueToCode(block,'SEND',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = "app.sendBroadcast("+name_value+");\n";
    return code;
};
Blockly.JavaScript['intent_start_service'] = function(block) {
    var name_value =Blockly.JavaScript.valueToCode(block,'SERVICE',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = "app.startService("+name_value+");\n";
    return code;
};
Blockly.JavaScript['intent_send_broadcast_by_name'] = function(block) {
    var name_value =Blockly.JavaScript.valueToCode(block,'CAST',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = "app.sendBroadcast("+name_value+");\n";
    return code;
};
Blockly.JavaScript['intent_intent_to_shell'] = function(block) {
    var name_value =Blockly.JavaScript.valueToCode(block,'SHELL',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = "app.intentToShell("+name_value+");\n";
    return code;
};
Blockly.JavaScript['intent_parse_uri'] = function(block) {
    var name_value =Blockly.JavaScript.valueToCode(block,'URI',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = "app.parseUri("+name_value+");\n";
    return code;
};
Blockly.JavaScript['intent_get_uri_for_file'] = function(block) {
    var name_value =Blockly.JavaScript.valueToCode(block,'FORFILE',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = "app.getUriForFile("+name_value+");\n";
    return code;
};
Blockly.JavaScript['intent_get_installed_apps'] = function(block) {
    var name_value =Blockly.JavaScript.valueToCode(block,'INSTALL',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = "app.getInstalledApps("+name_value+");\n";
    return code;
};