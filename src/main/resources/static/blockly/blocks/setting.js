'use strict';

goog.provide('Blockly.Blocks.Setting');  // Deprecated
goog.provide('Blockly.Constants.Setting');

goog.require('Blockly');
goog.require('Blockly.Blocks');
goog.require('Blockly.FieldDropdown');
goog.require('Blockly.FieldLabel');
goog.require('Blockly.Mutator');

var colour = "#c68a16";
var baseHelpUrl = "https://pro.autojs.org/docs/#/zh-cn/app?id=";

Blockly.defineBlocksWithJsonArray([
    {
        "type": "$settings_set_enabled",
        "message0": " %1 %2 ",
        "args0":[
            {"type":"field_dropdown","name":"VALUE","options":[["启用","true"],["关闭","false"]]},
            {"type":"field_dropdown","name":"KEY","options":[["稳定模式","stable_mode"],["使用Root权限启用无障碍","enable_accessibility_service_by_root"],["音量上键按下停止所有脚本","stop_all_on_volume_up"],["启动显示日志界面","not_show_console"],["前台服务通知","foreground_service"]]}
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": colour,
        "tooltip":"",
        "helpUrl": baseHelpUrl+"settingssetenabledkey-value"
    },{
        "type": "$settings_is_enabled",
        "message0": "判断功能的启用。 %1 ",
        "previousStatement": null,
        "nextStatement": null,
        "args0":[
            {"type":"input_value","name":"SETTING","check":"String"},
        ]  ,
        "colour": colour,
        "tooltip": "判断某个功能/设置项是否已启用。",
        "helpUrl": baseHelpUrl+"settingsisenabledkey"
    },
]);
