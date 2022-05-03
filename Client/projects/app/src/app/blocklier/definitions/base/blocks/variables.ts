import * as Blockly from 'blockly';

const colour = '#449999';

Blockly.defineBlocksWithJsonArray([
  {
    "type": "variables_get_number",
    "message0": "%1",
    "args0": [
      {
        "type": "field_variable",
        "name": "VAR",
        "variable": "num",
        "variableTypes": ["Number"],
        "defaultType": "Number"
      }
    ],
    "colour": colour,
    "output": "Number",
  },
  {
    "type": "variables_set_number",
    "message0": "赋值 %1 为  %2",
    "args0": [
      {
        "type": "field_variable",
        "name": "VAR",
        "variable": "num",
        "variableTypes": ["Number"],
        "defaultType": "Number"
      },
      {
        "type": "input_value",
        "name": "VALUE",
        "check": "Number"
      }
    ],
    "colour": colour,
    "previousStatement": null,
    "nextStatement": null,
  },
  {
    "type": "variables_add_number",
    "message0": "将 %1 增加 %2",
    "args0": [
      {
        "type": "field_variable",
        "name": "VAR",
        "variable": "num",
        "variableTypes": ["Number"],
        "defaultType": "Number"
      },
      {
        "type": "input_value",
        "name": "VALUE",
        "check": "Number"
      }
    ],
    "colour": colour,
    "previousStatement": null,
    "nextStatement": null,
  },
  {
    "type": "variables_get_string",
    "message0": "%1",
    "args0": [
      {
        "type": "field_variable",
        "name": "VAR",
        "variable": "str",
        "variableTypes": ["String"],
        "defaultType": "String"
      }
    ],
    "colour": colour,
    "output": "String",
  },
  {
    "type": "variables_set_string",
    "message0": "赋值 %1 为  %2",
    "args0": [
      {
        "type": "field_variable",
        "name": "VAR",
        "variable": "str",
        "variableTypes": ["String"],
        "defaultType": "String"
      },
      {
        "type": "input_value",
        "name": "VALUE",
        "check": "String"
      }
    ],
    "colour": colour,
    "previousStatement": null,
    "nextStatement": null,
  },
  {
    "type": "variables_add_string",
    "message0": "在 %1 后追加 %2",
    "args0": [
      {
        "type": "field_variable",
        "name": "VAR",
        "variable": "str",
        "variableTypes": ["String"],
        "defaultType": "String"
      },
      {
        "type": "input_value",
        "name": "VALUE",
        "check": "String"
      }
    ],
    "colour": colour,
    "previousStatement": null,
    "nextStatement": null,
  },
  {
    "type": "variables_get_boolean",
    "message0": "%1",
    "args0": [
      {
        "type": "field_variable",
        "name": "VAR",
        "variable": "boo",
        "variableTypes": ["Boolean"],
        "defaultType": "Boolean"
      }
    ],
    "colour": colour,
    "output": "Boolean",
  },
  {
    "type": "variables_set_boolean",
    "message0": "赋值 %1 为  %2",
    "args0": [
      {
        "type": "field_variable",
        "name": "VAR",
        "variable": "boo",
        "variableTypes": ["Boolean"],
        "defaultType": "Boolean"
      },
      {
        "type": "input_value",
        "name": "VALUE",
        "check": "Boolean"
      }
    ],
    "colour": colour,
    "previousStatement": null,
    "nextStatement": null,
  }
]);
