'use strict';

goog.provide('Blockly.Blocks.Auto');  // Deprecated
goog.provide('Blockly.Constants.Auto');

goog.require('Blockly');
goog.require('Blockly.Blocks');
goog.require('Blockly.FieldDropdown');
goog.require('Blockly.FieldLabel');
goog.require('Blockly.Mutator');

var colour = "#e5af00";
var baseHelpUrl = "https://pro.autojs.org/docs/#/zh-cn/widgetsBasedAutomation?id=";

Blockly.defineBlocksWithJsonArray([
    {
        "type": "auto_wait_for",
        "message0": "申请并等待无障碍权限开启",
        "previousStatement": null,
        "nextStatement": null,
        "colour": colour,
        "tooltip": "申请并等待无障碍权限开启，如已开启，则直接跳过",
        "helpUrl": baseHelpUrl+"autowaitfor"
    }, {
        "type": "auto_set_mode",
        "message0": "设置无障碍模式 %1",
        "args0": [{"type": "field_dropdown", "name": "MODE", "options": [["快速", "fast"], ["正常", "normal"]]}],
        "previousStatement": null,
        "nextStatement": null,
        "colour": colour,
        "tooltip": "设置无障碍模式，不使用该功能默认正常",
        "helpUrl": baseHelpUrl+"autosetmodemode"
    }, {
        "type": "auto_set_flags",
        "message0": "设置无障碍标志 %1",
        "args0": [{"type": "field_dropdown", "name": "FLAG", "options": [["启用主进程搜索", "findOnUiThread"], ["启用“使用情况统计”服务", "useUsageStats"],["启用Shell命令模式","useShell"]]}],
        "previousStatement": null,
        "nextStatement": null,
        "colour": colour,
        "tooltip": "设置无障碍特殊运行标志",
        "helpUrl": baseHelpUrl+"autosetflagsflags"
    }, {
        "type": "auto_service",
        "message0": "获取无障碍服务",
        "output": "AutoService",
        "colour": colour,
        "tooltip": "获取无障碍服务。如果无障碍服务没有启动，则返回null",
        "helpUrl": baseHelpUrl+"autoservice"
    }, {
        "type": "auto_windows",
        "message0": "获取当前窗口",
        "output": ["AutoWindows","Array"],
        "colour": colour,
        "tooltip": "获取当前全部窗口，返回窗口列表",
        "helpUrl": baseHelpUrl+"autowindows"
    }, {
        "type": "auto_root",
        "message0": "获取当前窗口根控件",
        "output": "UiObject",
        "colour": colour,
        "tooltip": "获取当前窗口根控件",
        "helpUrl": baseHelpUrl+"autoroot"
    }, {
        "type": "auto_root_in_active_window",
        "message0": "获取活跃窗口根控件",
        "output": "UiObject",
        "colour": colour,
        "tooltip": "获取活跃窗口根控件",
        "helpUrl": baseHelpUrl+"autorootinactivewindow"
    }, {
        "type": "auto_set_window_filter",
        "message0": "设置窗口过滤器 %1",
        "args0": [{"type": "input_value", "name": "FILTER", "check": "Function"}],
        "previousStatement": null,
        "nextStatement": null,
        "colour": colour,
        "tooltip": "设置窗口过滤器，函数会输入一个窗口，需返回布尔值表示是否保留",
        "helpUrl": baseHelpUrl+"autosetwindowfilterfilter"
    }
]);
