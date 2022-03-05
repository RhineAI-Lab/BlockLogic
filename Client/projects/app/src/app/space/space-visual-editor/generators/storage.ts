import { JavaScript } from './_common';

JavaScript['storages_create'] = function (block: {
  getFieldValue: (arg0: string) => any;
}) {
  const type = block.getFieldValue('TYPE');
  const value = JavaScript.valueToCode(block, 'VALUE', JavaScript.ORDER_ATOMIC);
  const code = 'storages.' + type + '(' + value + ')';
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['storages_get'] = function (block: any) {
  const storage = JavaScript.valueToCode(
    block,
    'STORAGE',
    JavaScript.ORDER_ATOMIC,
  );
  const key = JavaScript.valueToCode(block, 'KEY', JavaScript.ORDER_ATOMIC);
  const default_value = JavaScript.valueToCode(
    block,
    'DEFAULT_VALUE',
    JavaScript.ORDER_ATOMIC,
  );
  const code =
    storage + '.get(' + key + (default_value ? ',' + default_value : '') + ')';
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['storages_put'] = function (block: any) {
  const storage = JavaScript.valueToCode(
    block,
    'STORAGE',
    JavaScript.ORDER_ATOMIC,
  );
  const key = JavaScript.valueToCode(block, 'KEY', JavaScript.ORDER_ATOMIC);
  const value = JavaScript.valueToCode(block, 'VALUE', JavaScript.ORDER_ATOMIC);
  const code = storage + '.put(' + key + ',' + value + ');\n';
  return code;
};

JavaScript['storages_remove'] = function (block: any) {
  const storage = JavaScript.valueToCode(
    block,
    'STORAGE',
    JavaScript.ORDER_ATOMIC,
  );
  const key = JavaScript.valueToCode(block, 'KEY', JavaScript.ORDER_ATOMIC);
  const code = storage + '.remove(' + key + ');\n';
  return code;
};

JavaScript['storages_contains'] = function (block: any) {
  const storage = JavaScript.valueToCode(
    block,
    'STORAGE',
    JavaScript.ORDER_ATOMIC,
  );
  const key = JavaScript.valueToCode(block, 'KEY', JavaScript.ORDER_ATOMIC);
  const code = storage + '.contains(' + key + ')';
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['storages_clear'] = function (block: any) {
  const storage = JavaScript.valueToCode(
    block,
    'STORAGE',
    JavaScript.ORDER_ATOMIC,
  );
  const code = storage + '.clear();\n';
  return code;
};
