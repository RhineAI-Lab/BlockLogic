'use strict';

goog.provide('Blockly.JavaScript.app');
goog.require('Blockly.JavaScript');

Blockly.JavaScript['app_version_code'] = function(block) {
    var code = "app.versionCode";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['app_version_name'] = function(block) {
    var code = "app.versionName";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript['app_autojs'] = function(block) {
    var name_value =Blockly.JavaScript.valueToCode(block,'AUTO',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = "app.autojs("+name_value+");\n"
    return code;
};
Blockly.JavaScript['app_launch'] = function(block) {
    var name_value =Blockly.JavaScript.valueToCode(block,'PACKAGE_NAME',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = "app.lauch("+name_value+");\n"
    return code;
};
Blockly.JavaScript['app_launch_app'] = function(block) {
    var name_value =Blockly.JavaScript.valueToCode(block,'APP_NAME',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = "app.lauchApp("+name_value+");\n"
    return code;
};
Blockly.JavaScript['app_get_packagename'] = function(block) {
    var code = "app.getPackageName";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript['app_get_app_name'] = function(block) {
    var name_value =Blockly.JavaScript.valueToCode(block,'GET',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = "app.getAppName";
    return code;
};
Blockly.JavaScript['app_open_app_setting'] = function(block) {
    var code = "app.openAppSetting";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript['app_viewfile'] = function(block) {
    var name_value =Blockly.JavaScript.valueToCode(block,'VIEWFILE',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = "app.viewFile("+name_value+");\n";
    return code;
};
Blockly.JavaScript['app_editfile'] = function(block) {
    var name_value =Blockly.JavaScript.valueToCode(block,'EDITFILE',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = "app.editFile("+name_value+");\n";
    return code;
};
Blockly.JavaScript['app_uninstall'] = function(block) {
    var name_value =Blockly.JavaScript.valueToCode(block,'UNINSTALL',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = "app.uninstall("+name_value+");\n";
    return code;
};
Blockly.JavaScript['app_openurl'] = function(block) {
    var name_value =Blockly.JavaScript.valueToCode(block,'URL',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = "app.openUrl("+name_value+");\n";
    return code;
};
Blockly.JavaScript['app_send_email'] = function(block) {
    var name_value =Blockly.JavaScript.valueToCode(block,'OPTIONS',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = "app.sendEmail("+name_value+");\n";
    return code;
};
Blockly.JavaScript['app_start_activitya'] = function(block) {
    var name_value =Blockly.JavaScript.valueToCode(block,'ACTIVITY',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = "app.startActivity("+name_value+");\n";
    return code;
};