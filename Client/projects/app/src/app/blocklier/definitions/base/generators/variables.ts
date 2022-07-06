import { JavaScript, Python } from '../../_common';
import * as Blockly from 'blockly';

Python['variables_get_number'] = Python.get;
Python['variables_set_number'] = Python.set;
Python['variables_get_string'] = Python.get;
Python['variables_set_string'] = Python.set;
Python['variables_get_boolean'] = Python.get;
Python['variables_set_boolean'] = Python.set;

Python['variables_add_number'] = function (block: any) {
  const argument0 =
    Python.valueToCode(block, 'VALUE', Python.ORDER_NONE) || '1';
  const varName = Python.nameDB_.getName(
    block.getFieldValue('VAR'),
    Blockly.VARIABLE_CATEGORY_NAME,
  );
  if (isNaN(argument0) || argument0 >= 0) {
    return varName + ' += ' + argument0 + '\n';
  } else {
    return varName + ' -= ' + -parseInt(argument0) + '\n';
  }
};

Python['variables_add_string'] = function (block: any) {
  const argument0 =
    Python.valueToCode(block, 'VALUE', Python.ORDER_NONE) || "''";
  const varName = Python.nameDB_.getName(
    block.getFieldValue('VAR'),
    Blockly.VARIABLE_CATEGORY_NAME,
  );
  return varName + ' += ' + argument0 + '\n';
};

Python['variables_split'] = function (block: any) {
  const varName = Python.nameDB_.getName(
    block.getFieldValue('VAR'),
    Blockly.VARIABLE_CATEGORY_NAME,
  );
  const elements = new Array(block.itemCount_);
  for (let i = 0; i < block.itemCount_; i++) {
    elements[i] =
      Python.valueToCode(block, 'ADD' + i, Python.ORDER_NONE) || '_';
  }
  let code = elements.join(', ');
  code = code + ' = ' + varName + '\n';
  return code;
};
