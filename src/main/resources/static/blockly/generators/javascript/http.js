'use strict';

goog.provide('Blockly.JavaScript.http');
goog.require('Blockly.JavaScript');

Blockly.JavaScript['http_get'] = function (block) {
    var url = Blockly.JavaScript.valueToCode(block, 'URL', Blockly.JavaScript.ORDER_ATOMIC, true);
    var options = Blockly.JavaScript.valueToCode(block, 'OPTIONS', Blockly.JavaScript.ORDER_ATOMIC, true);
    var call_back = Blockly.JavaScript.valueToCode(block, 'CALLBACK', Blockly.JavaScript.ORDER_FUNCTION_CALL, true);
    var code = "http.get(" + url + Blockly.JavaScript.connectNecessaryArgs([options,call_back]) + ")";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript['http_post'] = function (block) {
    var url = Blockly.JavaScript.valueToCode(block, 'URL', Blockly.JavaScript.ORDER_ATOMIC, true);
    var data = Blockly.JavaScript.valueToCode(block, 'DATA', Blockly.JavaScript.ORDER_ATOMIC, true) || "''";
    var options = Blockly.JavaScript.valueToCode(block, 'OPTIONS', Blockly.JavaScript.ORDER_ATOMIC, true);
    var call_back = Blockly.JavaScript.valueToCode(block, 'CALLBACK', Blockly.JavaScript.ORDER_FUNCTION_CALL, true);
    var code = "http.post(" + url + "," + data + Blockly.JavaScript.connectNecessaryArgs([options,call_back]) + ")";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript['http_post_json'] = function (block) {
    var url = Blockly.JavaScript.valueToCode(block, 'URL', Blockly.JavaScript.ORDER_ATOMIC, true);
    var data = Blockly.JavaScript.valueToCode(block, 'DATA', Blockly.JavaScript.ORDER_ATOMIC, true) || "''";
    var options = Blockly.JavaScript.valueToCode(block, 'OPTIONS', Blockly.JavaScript.ORDER_ATOMIC, true);
    var call_back = Blockly.JavaScript.valueToCode(block, 'CALLBACK', Blockly.JavaScript.ORDER_FUNCTION_CALL, true);
    var code = "http.postJson(" + url + "," + data + Blockly.JavaScript.connectNecessaryArgs([options,call_back]) + ")";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript['http_post_multipart'] = function (block) {
    var url = Blockly.JavaScript.valueToCode(block, 'URL', Blockly.JavaScript.ORDER_ATOMIC, true);
    var data = Blockly.JavaScript.valueToCode(block, 'DATA', Blockly.JavaScript.ORDER_ATOMIC, true) || "''";
    var options = Blockly.JavaScript.valueToCode(block, 'OPTIONS', Blockly.JavaScript.ORDER_ATOMIC, true);
    var call_back = Blockly.JavaScript.valueToCode(block, 'CALLBACK', Blockly.JavaScript.ORDER_FUNCTION_CALL, true);
    var code = "http.postMultipart(" + url + "," + data + Blockly.JavaScript.connectNecessaryArgs([options,call_back]) + ")";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript['http_request'] = function (block) {
    var url = Blockly.JavaScript.valueToCode(block, 'URL', Blockly.JavaScript.ORDER_ATOMIC, true);
    var options = Blockly.JavaScript.valueToCode(block, 'DATA', Blockly.JavaScript.ORDER_ATOMIC, true);
    var call_back = Blockly.JavaScript.valueToCode(block, 'CALLBACK', Blockly.JavaScript.ORDER_FUNCTION_CALL, true);
    var code = "http.request(" + url + Blockly.JavaScript.connectNecessaryArgs([options,call_back]) + ")";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['http_options_container'] = function (block) {
    var branch = Blockly.JavaScript.statementToCode(block, 'OPTIONS');
    branch = Blockly.JavaScript.addLoopTrap(branch, block);
    return ["{\n"+branch+"}", Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['http_option_headers'] = function (block) {
    var headers = Blockly.JavaScript.valueToCode(block, 'VALUE',
        Blockly.JavaScript.ORDER_ATOMIC);
    return "headers:"+headers+",\n";
};

Blockly.JavaScript['http_option_method'] = function (block) {
    var VALUE = block.getFieldValue('VALUE');
    return "method:'"+VALUE+"',\n";
};

Blockly.JavaScript['http_option_content_type'] = function (block) {
    var VALUE = Blockly.JavaScript.valueToCode(block, 'VALUE',
        Blockly.JavaScript.ORDER_ATOMIC);
    return "contentType:"+VALUE+",\n";
};

Blockly.JavaScript['http_option_body'] = function (block) {
    var VALUE = Blockly.JavaScript.valueToCode(block, 'VALUE',
        Blockly.JavaScript.ORDER_ATOMIC);
    return "body:"+VALUE+",\n";
};

Blockly.JavaScript['http_response'] = function (block) {
    var value = block.getFieldValue('VALUE');
    var response = Blockly.JavaScript.valueToCode(block, 'RES', Blockly.JavaScript.ORDER_ATOMIC) || "";
    var code = response + "." + value;
    return [code, Blockly.JavaScript.ORDER_MEMBER];
};

