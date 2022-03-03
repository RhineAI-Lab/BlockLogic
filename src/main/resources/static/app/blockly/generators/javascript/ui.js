'use strict';

goog.provide('Blockly.JavaScript.ui');
goog.require('Blockly.JavaScript');

Blockly.JavaScript['ui_layout'] = function(block) {
    Blockly.JavaScript.setRunMode_("ui");
    var value =Blockly.JavaScript.valueToCode(block,'UI_XML',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = "$ui.layout(\n"+value+"\n);\n";
    return code;
};
Blockly.JavaScript['ui_layout_file'] = function(block) {
    Blockly.JavaScript.setRunMode_("ui");
    var value =Blockly.JavaScript.valueToCode(block,'FILE_PATH',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = "$ui.layoutFile("+value+");\n";
    return code;
};
Blockly.JavaScript['ui_xml'] = function(block) {
    var value = block.getFieldValue('TEXT');
    return [value, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript['ui_get_attr'] = function(block) {
    var id_value = block.getFieldValue('ID');
    var name_value =Blockly.JavaScript.valueToCode(block,'NAME',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = "ui."+id_value+".attr("+name_value+")";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript['ui_set_attr'] = function(block) {
    var id_value = block.getFieldValue('ID');
    var name_value =Blockly.JavaScript.valueToCode(block,'NAME',Blockly.JavaScript.ORDER_ATOMIC,true);
    var value_value =Blockly.JavaScript.valueToCode(block,'VALUE',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = "ui."+id_value+".attr("+name_value+","+value_value+");\n";
    return code;
};
Blockly.JavaScript['ui_inflate'] = function(block) {
    var xml_value =Blockly.JavaScript.valueToCode(block,'UI_XML',Blockly.JavaScript.ORDER_ATOMIC,true);
    var parent_value =Blockly.JavaScript.valueToCode(block,'UI_PARENT',Blockly.JavaScript.ORDER_ATOMIC,true);
    var in_value =Blockly.JavaScript.valueToCode(block,'IN_PARENT',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = "$ui.inflate("+xml_value+Blockly.JavaScript.connectNecessaryArgs([parent_value,in_value],true)+")";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript['ui_find_view'] = function(block) {
    var xml_value =Blockly.JavaScript.valueToCode(block,'UI_XML',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = "$ui.findView("+xml_value+")";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript['ui_is_ui_thread'] = function(block) {
    var code = "$ui.isUiThread()";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript['ui_finish'] = function(block) {
    Blockly.JavaScript.setRunMode_("ui");
    var code = "$ui.finish();\n";
    return code;
};
Blockly.JavaScript['ui_use_android_resources'] = function(block) {
    Blockly.JavaScript.setRunMode_("ui");
    var code = "$ui.useAndroidResources();\n";
    return code;
};
Blockly.JavaScript['ui_set_content_view'] = function(block) {
    Blockly.JavaScript.setRunMode_("ui");
    var view_value =Blockly.JavaScript.valueToCode(block,'UI_VIEW',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = "$ui.setContentView("+view_value+");\n";
    return code;
};
Blockly.JavaScript['ui_register_widget'] = function(block) {
    var name_value =Blockly.JavaScript.valueToCode(block,'NAME',Blockly.JavaScript.ORDER_ATOMIC,true);
    var function_value =Blockly.JavaScript.valueToCode(block,'FUNCTION',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = "$ui.registerWidget("+name_value+","+function_value+");\n";
    return code;
};
Blockly.JavaScript['ui_status_bar_color'] = function(block) {
    var color_value =Blockly.JavaScript.valueToCode(block,'COLOR',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = "$ui.statusBarColor("+color_value+");\n";
    return code;
};
Blockly.JavaScript['ui_run'] = function(block) {
    var stat = Blockly.JavaScript.statementToCode(block, 'STAT');
    var code = "ui.run(function(){\n"+stat+"});\n";
    return code;
};
Blockly.JavaScript['ui_post'] = function(block) {
    var time_value =Blockly.JavaScript.valueToCode(block,'TIME',Blockly.JavaScript.ORDER_ATOMIC,true);
    var stat = Blockly.JavaScript.statementToCode(block, 'STAT');
    var code = "ui.post(function(){\n"+stat+"},"+time_value+");\n";
    return code;
};

