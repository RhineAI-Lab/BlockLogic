import { Python } from '../../_common';

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
  const image =
    Python.valueToCode(block, 'IMAGE', Python.ORDER_ATOMIC, true) || 'None';
  Python.provideFunction_('import_transforms', [
    'form torchvision import transforms',
  ]);
  const code = `transforms.ToTensor()(${image})`;
  return code + '\n';
};

Python['transforms_toPILImage'] = function (block: any) {
  const tensor =
    Python.valueToCode(block, 'TENSOR', Python.ORDER_ATOMIC, true) || 'None';
  Python.provideFunction_('import_transforms', [
    'form torchvision import transforms',
  ]);
  const code = `transforms.ToPILImage()(${tensor})`;
  return code + '\n';
};
