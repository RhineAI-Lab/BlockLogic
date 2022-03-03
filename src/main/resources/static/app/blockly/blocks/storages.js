'use strict';

goog.provide('Blockly.Blocks.Storages');  // Deprecated
goog.provide('Blockly.Constants.Storages');

goog.require('Blockly');
goog.require('Blockly.Blocks');
goog.require('Blockly.FieldDropdown');
goog.require('Blockly.FieldLabel');
goog.require('Blockly.Mutator');

var colour = "#cb863a";
var baseHelpUrl = "https://pro.autojs.org/docs/#/zh-cn/storages?id=";


Blockly.defineBlocksWithJsonArray([
    {
        "type": "storages_create",
        "message0": "本地储存器  %1  %2",
        "args0": [{
            "type": "field_dropdown",
            "name": "TYPE",
            "options": [
                ["创建", "create"],
                ["删除", "remove"]
            ]
        }, {
            "type": "input_value", "name": "VALUE", "check": "String"
        }],
        "colour": colour,
        "output": null,
        "tooltip": "创建一个本地存储并返回一个Storage对象。\n删除一个本地存储以及他的全部数据。如果该存储不存在，返回false；否则返回true。",
        "helpUrl": baseHelpUrl + "storagescreatename"
    }, {
        "type": "storages_get",
        "message0": "本地储存 - 读取数据  对象 %1 键名 %2 默认 %3",
        "args0": [{
            "type": "input_value", "name": "STORAGE", "check": "Object"
        }, {
            "type": "input_value", "name": "KEY", "check": "String", 'align': 'right'
        }, {
            "type": "input_value", "name": "DEFAULT_VALUE", 'align': 'right'
        }],
        "colour": colour,
        "output": null,
        "tooltip": "从本地存储中取出键值为key的数据并返回。\n如果该存储中不包含该数据，这时若指定了默认值参数则返回默认值，否则返回undefined。",
        "helpUrl": baseHelpUrl + "storagegetkey-defaultvalue"
    }, {
        "type": "storages_put",
        "message0": "本地储存 - 保存数据  对象 %1 键名 %2 数据 %3",
        "args0": [{
            "type": "input_value", "name": "STORAGE", "check": "Object"
        }, {
            "type": "input_value", "name": "KEY", "check": "String", 'align': 'right'
        }, {
            "type": "input_value", "name": "VALUE", 'align': 'right'
        }],
        "colour": colour,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "把数据value保存到本地存储中。value可以是undefined以外的任意数据类型。如果value为undefined则抛出TypeError。",
        "helpUrl": baseHelpUrl + "storageputkey-value"
    }, {
        "type": "storages_remove",
        "message0": "本地储存 - 删除数据  对象 %1  键名 %2",
        "args0": [{
            "type": "input_value", "name": "STORAGE", "check": "Object"
        }, {
            "type": "input_value", "name": "KEY", "check": "String", 'align': 'right'
        }],
        "colour": colour,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "移除指定键值的数据。不返回任何值。",
        "helpUrl": baseHelpUrl + "storageremovekey"
    }, {
        "type": "storages_contains",
        "message0": "本地储存 - 是否存在  对象 %1  键名 %2",
        "args0": [{
            "type": "input_value", "name": "STORAGE", "check": "Object"
        }, {
            "type": "input_value", "name": "KEY", "check": "String", 'align': 'right'
        }],
        "colour": colour,
        "output": 'Boolean',
        "tooltip": "返回该本地存储是否包含指定键值的数据。是则返回true，否则返回false。",
        "helpUrl": baseHelpUrl + "storagecontainskey"
    }, {
        "type": "storages_clear",
        "message0": "本地储存 - 删除所有  对象 %1  ",
        "args0": [{
            "type": "input_value", "name": "STORAGE", "check": "Object"
        }],
        "colour": colour,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "移除该本地存储的所有数据。不返回任何值。",
        "helpUrl": baseHelpUrl + "storageclear"
    }
]);
