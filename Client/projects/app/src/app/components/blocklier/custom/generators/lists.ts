import { JavaScript } from './_common';

JavaScript['lists_set'] = function (block: any) {
  const array = JavaScript.valueToCode(
    block,
    'ARRAY',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const index = JavaScript.valueToCode(
    block,
    'INDEX',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  let value = JavaScript.valueToCode(
    block,
    'VALUE',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  if (value == null || value.length === 0) {
    value = 'null';
  }
  const code = array + '[' + index + '-1]=' + value + ';\n';
  return code;
};

JavaScript['lists_get'] = function (block: any) {
  const array = JavaScript.valueToCode(
    block,
    'ARRAY',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const index = JavaScript.valueToCode(
    block,
    'INDEX',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = array + '[' + index + '-1]';
  return [code, JavaScript.ORDER_ATOMIC];
};
