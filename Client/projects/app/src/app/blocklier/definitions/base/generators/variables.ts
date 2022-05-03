import { JavaScript, Python } from '../../_common';
import * as Blockly from 'blockly';

const get = function(block: any) {
  const code = Python.nameDB_.getName(block.getFieldValue('VAR'),
    Blockly.VARIABLE_CATEGORY_NAME);
  return [code, Python.ORDER_ATOMIC];
};

const set = function(block: any) {
  const argument0 = Python.valueToCode(block, 'VALUE',
    Python.ORDER_NONE) || '0';
  const varName = Python.nameDB_.getName(block.getFieldValue('VAR'),
    Blockly.VARIABLE_CATEGORY_NAME);
  return varName + ' = ' + argument0 + '\n';
};

Python['variables_get_number'] = get;
Python['variables_set_number'] = set;
Python['variables_get_string'] = get;
Python['variables_set_string'] = set;
Python['variables_get_boolean'] = get;
Python['variables_set_boolean'] = set;

Python['variables_add_number'] = function(block: any) {
  const argument0 = parseInt(Python.valueToCode(block, 'VALUE',
    Python.ORDER_NONE) || '1');
  const varName = Python.nameDB_.getName(block.getFieldValue('VAR'),
    Blockly.VARIABLE_CATEGORY_NAME);
  if (argument0 >= 0) {
    return varName + ' += ' + argument0 + '\n';
  }else{
    return varName + ' -= ' + (-argument0) + '\n';
  }
}

Python['variables_add_string'] = function(block: any) {
  const argument0 = Python.valueToCode(block, 'VALUE',
    Python.ORDER_NONE) || '\'\'';
  const varName = Python.nameDB_.getName(block.getFieldValue('VAR'),
    Blockly.VARIABLE_CATEGORY_NAME);
  return varName + ' += ' + argument0 + '\n';
}

