import { Python } from '../../_common';
import * as Blockly from 'blockly';

Python['data_for_dataloader'] = function (block: any) {
  const elements = new Array(block.itemCount_);
  for (let i = 0; i < block.itemCount_; i++) {
    elements[i] =
      Python.valueToCode(block, 'ADD' + i, Python.ORDER_NONE) || 'None';
  }
  const dataloader = Python.nameDB_.getName(
    block.getFieldValue('DATA_LOADER'),
    Blockly.VARIABLE_CATEGORY_NAME,
  );
  const device = Python.nameDB_.getName(
    block.getFieldValue('DEVICE'),
    Blockly.VARIABLE_CATEGORY_NAME,
  );
  const statements = Python.statementToCode(block, 'STAT');
  let code = `for iter_num, (${elements.join(
    ', ',
  )}) in enumerate(${dataloader}):\n`;
  code += `  ${elements.join(', ')} = `;
  for (const ei in elements) {
    code += `${elements[ei]}.to(${device})`;
    if (ei != elements.length - 1 + '') {
      code += ', ';
    }
  }
  code += `\n` + statements;
  return code;
};
