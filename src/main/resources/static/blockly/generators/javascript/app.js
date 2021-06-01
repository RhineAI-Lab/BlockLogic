'use strict';

goog.provide('Blockly.JavaScript.app');
goog.require('Blockly.JavaScript');

Blockly.JavaScript['app_version_code'] = function(block) {
    var code = "app.versionCode";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['app_launch_app'] = function(block) {
    var name_value = Blockly.JavaScript.valueToCode(block, 'APP_NAME', Blockly.JavaScript.ORDER_ATOMIC, true);
    var code = "app.launchApp("+name_value+");\n";
    return code;
};
