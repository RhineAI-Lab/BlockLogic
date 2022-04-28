import { JavaScript } from '../../_common';

JavaScript['text_to_int'] = function (block: any) {
  const str_value = JavaScript.valueToCode(
    block,
    'STR',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = 'parseInt(' + str_value + ',10)';
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['text_to_float'] = function (block: any) {
  const str_value = JavaScript.valueToCode(
    block,
    'STR',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = 'parseFloat(' + str_value + ')';
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['number_to_text'] = function (block: any) {
  const str_value = JavaScript.valueToCode(
    block,
    'NUM',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = 'String(' + str_value + ')';
  return [code, JavaScript.ORDER_ATOMIC];
};
