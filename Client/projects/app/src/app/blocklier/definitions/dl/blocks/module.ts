import * as Blockly from 'blockly';

const style = 'module_blocks';

Blockly.defineBlocksWithJsonArray([
  {
    "type": "modules_get",
    "message0": "%1",
    "args0": [
      {
        "type": "field_variable",
        "name": "VAR",
        "variable": "net",
        "variableTypes": ["Module"],
        "defaultType": "Module"
      }
    ],
    "style": style,
    "output": "Module",
  },
  {
    "type": "modules_set",
    "message0": "设置 %1 为  %2",
    "args0": [
      {
        "type": "field_variable",
        "name": "VAR",
        "variable": "net",
        "variableTypes": ["Module"],
        "defaultType": "Module"
      },
      {
        "type": "input_value",
        "name": "VALUE",
        "check": "Module"
      }
    ],
    "style": style,
    "previousStatement": null,
    "nextStatement": null,
  },
  {
    "type": "modules_call",
    "message0": "调用 %1 %2",
    "args0": [
      {
        "type": "field_variable",
        "name": "VAR",
        "variable": "net",
        "variableTypes": ["Module"],
        "defaultType": "Module"
      },
      {
        "type": "input_value",
        "name": "INPUT",
        "check": "Tensor"
      }
    ],
    "style": style,
    "output": "Tensor",
  },
  {
    "type": "modules_define",
    "message0": "定义模型 %1 %2 %3 调用输入 %4 %5 返回 %6",
    "args0": [
      {
        "type": "field_variable",
        "name": "VAR",
        "variable": "net",
        "variableTypes": ["Module"],
        "defaultType": "Module"
      },
      {
        "type": "input_dummy"
      },
      {
        "type": "input_statement",
        "name": "INIT",
        "align": "RIGHT"
      },
      {
        "type": "input_value",
        "name": "INPUT",
        "check": "Tensor",
        "align": "RIGHT"
      },
      {
        "type": "input_statement",
        "name": "FORWARD",
        "align": "RIGHT"
      },
      {
        "type": "input_value",
        "name": "OUTPUT",
        "check": "Tensor",
        "align": "RIGHT"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": style,
    "tooltip": "",
    "helpUrl": ""
  }
]);
