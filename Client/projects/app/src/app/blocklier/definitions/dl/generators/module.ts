import { Python } from '../../_common';
import * as Blockly from 'blockly';

Python['modules_define'] = function (block: any) {
  const varName = Python.nameDB_.getName(
    block.getFieldValue('VAR'),
    Blockly.VARIABLE_CATEGORY_NAME,
  );
  let statementsInit = Python.statementToCode(block, 'INIT');
  statementsInit = Python.addIndent(statementsInit);
  const valueInput =
    Python.valueToCode(block, 'INPUT', Python.ORDER_ATOMIC) || 'x';
  let statementsForward = Python.statementToCode(block, 'FORWARD');
  statementsForward = Python.addIndent(statementsForward);
  const valueOutput =
    Python.valueToCode(block, 'OUTPUT', Python.ORDER_ATOMIC) || valueInput;

  let className = 'MyModule';
  if (Python.moduleClassIndex != 1) {
    className = className + Python.moduleClassIndex;
  }
  Python.moduleClassIndex += 1;

  Python.definitions_['from_torch_import_nn'] = 'from torch import nn';
  let code = 'class ' + className + '(nn.Module):\n';
  code += '  def __init__(self):\n';
  code += '    super(' + className + ', self).__init__()\n';
  code += statementsInit;
  code += '  def forward(self, ' + valueInput + '):\n';
  code += statementsForward;
  code += '    return ' + valueOutput + '\n';
  code += varName + ' = ' + className + '()\n';
  return code;
};

Python['modules_call'] = function (block: any) {
  const varName = Python.nameDB_.getName(
    block.getFieldValue('VAR'),
    Blockly.VARIABLE_CATEGORY_NAME,
  );
  const argument0 =
    Python.valueToCode(block, 'INPUT', Python.ORDER_NONE) || '0';
  const code = varName + '(' + argument0 + ')';
  return [code, Python.ORDER_ATOMIC];
};

Python['modules_get'] = Python.get;
Python['modules_set'] = Python.set;

Python['modules_sequential'] = function (block: any) {
  Python.definitions_['from_torch_import_nn'] = 'from torch import nn';
  const elements = new Array(block.itemCount_);
  for (let i = 0; i < block.itemCount_; i++) {
    elements[i] =
      Python.valueToCode(block, 'ADD' + i, Python.ORDER_NONE) || 'None';
  }
  let code = elements.join(',\n')+'\n';
  return code;
};
