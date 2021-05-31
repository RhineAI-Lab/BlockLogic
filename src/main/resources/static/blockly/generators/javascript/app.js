'use strict';

goog.provide('Blockly.JavaScript.app');
goog.require('Blockly.JavaScript');

Blockly.JavaScript['app_version_code'] = function(block) {
    var code = "app.versionCode";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
