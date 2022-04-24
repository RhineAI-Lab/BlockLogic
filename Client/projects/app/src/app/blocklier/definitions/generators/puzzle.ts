import { JavaScript, Python } from './_common';

JavaScript['puzzle'] = function (block: any) {
  const value_value = JavaScript.valueToCode(
    block,
    'VALUE',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = value_value + ';\n';
  return code;
};

JavaScript['explain'] = function (block: {
  getFieldValue: (arg0: string) => string;
}) {
  const code = '//' + block.getFieldValue('TEXT') + '\n';
  return code;
};

JavaScript['explain_multi'] = function (block: {
  getFieldValue: (arg0: string) => any;
}) {
  const value = block.getFieldValue('TEXT');
  const code = '/*\n' + value + '\n*/\n';
  return code;
};

JavaScript['puzzle_block_attr'] = function (block: {
  getFieldValue: (arg0: string) => any;
}) {
  const value = block.getFieldValue('TEXT');
  return [value, JavaScript.ORDER_ATOMIC];
};

JavaScript['puzzle_block'] = function (block: {
  getFieldValue: (arg0: string) => any;
}) {
  const value = block.getFieldValue('TEXT');
  const code = value + '\n';
  return code;
};



Python['puzzle'] = function (block: any) {
  const value_value = Python.valueToCode(
    block,
    'VALUE',
    Python.ORDER_ATOMIC,
    true,
  );
  const code = value_value + '\n';
  return code;
};

Python['explain'] = function (block: {
  getFieldValue: (arg0: string) => string;
}) {
  const code = '#' + block.getFieldValue('TEXT') + '\n';
  return code;
};

Python['explain_multi'] = function (block: {
  getFieldValue: (arg0: string) => any;
}) {
  const value = block.getFieldValue('TEXT');
  const code = '\"\"\"\n' + value + '\n\"\"\"\n';
  return code;
};

Python['puzzle_block_attr'] = function (block: {
  getFieldValue: (arg0: string) => any;
}) {
  const value = block.getFieldValue('TEXT');
  return [value, Python.ORDER_ATOMIC];
};

Python['puzzle_block'] = function (block: {
  getFieldValue: (arg0: string) => any;
}) {
  const value = block.getFieldValue('TEXT');
  const code = value + '\n';
  return code;
};