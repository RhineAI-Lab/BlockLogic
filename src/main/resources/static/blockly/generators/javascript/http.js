'use strict';

goog.provide('Blockly.JavaScript.http');
goog.require('Blockly.JavaScript');

Blockly.JavaScript['http_get'] = function (block) {
    var url = Blockly.JavaScript.valueToCode(block, 'URL', Blockly.JavaScript.ORDER_ATOMIC, true) || '';
    var options = Blockly.JavaScript.valueToCode(block, 'OPTIONS', Blockly.JavaScript.ORDER_ATOMIC, true) || '';
    var call_back = Blockly.JavaScript.valueToCode(block, 'CALLBACK', Blockly.JavaScript.ORDER_FUNCTION_CALL, true) || '';
    var code = "http.get(" + url + "," + options + "," + call_back + ")"
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript['http_post'] = function (block) {
    var url = Blockly.JavaScript.valueToCode(block, 'URL', Blockly.JavaScript.ORDER_ATOMIC, true) || '';
    var data = Blockly.JavaScript.valueToCode(block, 'DATA', Blockly.JavaScript.ORDER_ATOMIC, true) || '';
    var options = Blockly.JavaScript.valueToCode(block, 'OPTIONS', Blockly.JavaScript.ORDER_ATOMIC, true) || '';
    var call_back = Blockly.JavaScript.valueToCode(block, 'CALLBACK', Blockly.JavaScript.ORDER_FUNCTION_CALL, true) || '';
    var code = "http.post(" + url + "," + data + "," + options + "," + call_back + ")"
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript['http_post_json'] = function (block) {
    var url = Blockly.JavaScript.valueToCode(block, 'URL', Blockly.JavaScript.ORDER_ATOMIC, true) || '';
    var data = Blockly.JavaScript.valueToCode(block, 'DATA', Blockly.JavaScript.ORDER_ATOMIC, true) || '';
    var options = Blockly.JavaScript.valueToCode(block, 'OPTIONS', Blockly.JavaScript.ORDER_ATOMIC, true) || '';
    var call_back = Blockly.JavaScript.valueToCode(block, 'CALLBACK', Blockly.JavaScript.ORDER_FUNCTION_CALL, true) || '';
    var code = "http.postJson(" + url + "," + data + "," + options + "," + call_back + ")"
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript['http_post_multipart'] = function (block) {
    var url = Blockly.JavaScript.valueToCode(block, 'URL', Blockly.JavaScript.ORDER_ATOMIC, true) || '';
    var data = Blockly.JavaScript.valueToCode(block, 'DATA', Blockly.JavaScript.ORDER_ATOMIC, true) || '';
    var options = Blockly.JavaScript.valueToCode(block, 'OPTIONS', Blockly.JavaScript.ORDER_ATOMIC, true) || '';
    var call_back = Blockly.JavaScript.valueToCode(block, 'CALLBACK', Blockly.JavaScript.ORDER_FUNCTION_CALL, true) || '';
    var code = "http.postMultipart(" + url + "," + data + "," + options + "," + call_back + ")"
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript['http_request'] = function (block) {
    var url = Blockly.JavaScript.valueToCode(block, 'URL', Blockly.JavaScript.ORDER_ATOMIC, true) || '';
    var options = Blockly.JavaScript.valueToCode(block, 'DATA', Blockly.JavaScript.ORDER_ATOMIC, true) || '';
    var call_back = Blockly.JavaScript.valueToCode(block, 'CALLBACK', Blockly.JavaScript.ORDER_FUNCTION_CALL, true) || '';
    var code = "http.request(" + url + "," + options + "," + call_back + ")"
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['http_response'] = function (block) {
    var value = block.getFieldValue('VALUE');
    var response = Blockly.JavaScript.valueToCode(block, 'RES', Blockly.JavaScript.ORDER_ATOMIC) || "";
    var code = response + "." + value;
    return [code, Blockly.JavaScript.ORDER_MEMBER];
};
