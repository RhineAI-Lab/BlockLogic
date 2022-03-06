import { JavaScript } from './_common';

JavaScript['simple_click'] = function (block: any) {
  const value_i = JavaScript.valueToCode(
    block,
    'I',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  let value_text = JavaScript.valueToCode(
    block,
    'TEXT',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  console.log(value_i);
  if (value_i != '-1') {
    value_text += ',' + value_i;
  }
  const code = 'click(' + value_text + ')';
  return [code, JavaScript.ORDER_NONE];
};

JavaScript['simple_long_click'] = function (block: any) {
  const value_i = JavaScript.valueToCode(
    block,
    'I',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  let value_text = JavaScript.valueToCode(
    block,
    'TEXT',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  console.log(value_i);
  if (value_i != '-1') {
    value_text += ',' + value_i;
  }
  const code = 'longClick(' + value_text + ')';
  return [code, JavaScript.ORDER_NONE];
};

JavaScript['simple_scroll_up'] = function (block: any) {
  const value_i = JavaScript.valueToCode(
    block,
    'I',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  let value_text = JavaScript.valueToCode(
    block,
    'TEXT',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  console.log(value_i);
  if (value_i != '-1') {
    value_text += ',' + value_i;
  }
  const code = 'scrollUp(' + value_text + ')';
  return [code, JavaScript.ORDER_NONE];
};

JavaScript['simple_scroll_down'] = function (block: any) {
  const value_i = JavaScript.valueToCode(
    block,
    'I',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  let value_text = JavaScript.valueToCode(
    block,
    'TEXT',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  console.log(value_i);
  if (value_i != '-1') {
    value_text += ',' + value_i;
  }
  const code = 'scrollDown(' + value_text + ')';
  return [code, JavaScript.ORDER_NONE];
};

JavaScript['simple_set_text'] = function (block: any) {
  const value_i = JavaScript.valueToCode(
    block,
    'I',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  let value_text = JavaScript.valueToCode(
    block,
    'TEXT',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  console.log(value_i);
  if (value_i != '-1') {
    value_text = value_i + ',' + value_text;
  }
  const code = 'setText(' + value_text + ')';
  return [code, JavaScript.ORDER_NONE];
};

JavaScript['simple_input'] = function (block: any) {
  const value_i = JavaScript.valueToCode(
    block,
    'I',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  let value_text = JavaScript.valueToCode(
    block,
    'TEXT',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  console.log(value_i);
  if (value_i != '-1') {
    value_text = value_i + ',' + value_text;
  }
  const code = 'input(' + value_text + ')';
  return [code, JavaScript.ORDER_NONE];
};
