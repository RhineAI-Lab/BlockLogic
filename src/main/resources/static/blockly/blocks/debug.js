'use strict';

goog.provide('Blockly.Blocks.Debug');  // Deprecated
goog.provide('Blockly.Constants.Debug');

goog.require('Blockly');
goog.require('Blockly.Blocks');
goog.require('Blockly.FieldDropdown');
goog.require('Blockly.FieldLabel');
goog.require('Blockly.Mutator');

var colour = "#cc9999";
var baseHelpUrl = "https://pro.autojs.org/docs/#/zh-cn/debug?id=";

Blockly.defineBlocksWithJsonArray([
    {
        "type": "$debug_dump_hprof",
        "message0": "将整个脚本进程的内存dump到文件file中 %1 ",
        "previousStatement": null,
        "nextStatement": null, 
        "args0":[
            {"type":"input_value","name":"HPROF","check":"String"},
        ]  ,         
        "colour": colour,
        "tooltip": "当你发现Auto.js Pro占用内存很高时，你可以运行这个函数来dump整个内存并反馈给开发者，开发者可以通过内存dump文件来诊断是否有内存泄露。",
        "helpUrl": baseHelpUrl+"debugdumphproffile"
    },
     {
        "type": "$debug_dump_and_send_hprof",
        "message0": "将整个脚本进程的内存dump到文件file中，并自动压缩为zip文件",
        "output":"string",
        "colour": colour,
        "tooltip": "使用压缩程度最高的压缩等级，因此需要的时间更久，但文件更小。",
        "helpUrl": baseHelpUrl+"debugdumpandsendhproffile"
    },
    {
        "type": "$debug_get_stack_trace",
        "message0": "获取一个异常的详细堆栈并返回 %1 ",
        "previousStatement": null,
        "nextStatement": null, 
        "args0":[
            {"type":"input_value","name":"TRACE","check":"String"},
        ]  ,         
        "colour": colour,
        "tooltip": "",
        "helpUrl": baseHelpUrl+"debuggetstacktraceerror"
    },
    { 
        "type": "$debug_set_memory_leak_detection_enabled",
        "message0": " %1 内存泄漏检测",
        "args0":[
        {"type":"field_dropdown","name":"ENABLED","options":[["启用","true"],["不启用","false"]]
    }],
         "previousStatement": "null",
         "nextStatement": "null",
         "colour": colour,
         "tooltip":"",
         "helpUrl": baseHelpUrl+"debugsetmemoryleakdetectionenabledenabled"

    },
     {
        "type": "$debug_gc",
        "message0": "建议JVM进行垃圾回收",
        "colour": colour,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "建议JVM进行垃圾回收（并不一定进行垃圾回收）。",
        "helpUrl": baseHelpUrl + "debuggc"
    },
    
    
])
