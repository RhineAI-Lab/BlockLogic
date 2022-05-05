import { Python } from '../../_common';
import * as Blockly from "blockly";

Python['transforms_compose'] = function (block: any) {
  const list =
    Python.valueToCode(block, 'LIST', Python.ORDER_ATOMIC, true) || '[]';
  Python.provideFunction_('import_transforms', [
    'form torchvision import transforms',
  ]);
  const code = `transforms.Compose(${list})`;
  return code + '\n';
};

Python['transforms_toTensor'] = function (block: any) {
  Python.provideFunction_('from_torchvision_import_transforms', [
    'from torchvision import transforms',
  ]);
  const code = `transforms.ToTensor()`;
  return [code,Python.ORDER_ATOMIC];
};

Python['transforms_toPILImage'] = function (block: any) {
  Python.provideFunction_('from_torchvision_import_transforms', [
    'from torchvision import transforms',
  ]);
  const code = `transforms.ToPILImage()`;
  return [code,Python.ORDER_ATOMIC];
};

Python['transforms_get'] = Python.get;
Python['transforms_set'] = Python.set;

Python['transforms_call'] = function (block: any) {
  const varName = Python.nameDB_.getName(
      block.getFieldValue('VAR'),
      Blockly.VARIABLE_CATEGORY_NAME,
  );
  const argument0 =
      Python.valueToCode(block, 'INPUT', Python.ORDER_NONE) || 'None';
  const code = varName + '(' + argument0 + ')';
  return [code, Python.ORDER_ATOMIC];
};

Python['transforms_compose'] = function(block: any) {
  Python.provideFunction_('from_torchvision_import_transforms', [
    'from torchvision import transforms',
  ]);
  const elements = new Array(block.itemCount_);
  for (let i = 0; i < block.itemCount_; i++) {
    elements[i] =
        Python.valueToCode(block, 'ADD' + i, Python.ORDER_NONE) || 'None';
  }
  let code = '[\n  ' + elements.join(',\n  ') + '\n]';
  code = 'transforms.Compose(' + code + ')';
  return [code, Python.ORDER_ATOMIC];
}

