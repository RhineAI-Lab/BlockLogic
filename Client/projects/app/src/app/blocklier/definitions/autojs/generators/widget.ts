import { JavaScript } from '../../_common';

JavaScript['widget_do_text'] = function (block: {
  getFieldValue: (arg0: string) => any;
}) {
  const dropdown_attr = block.getFieldValue('ATTR');
  const dropdown_way = block.getFieldValue('WAY');
  const text_value = block.getFieldValue('VALUE');
  const dropdown_meth = block.getFieldValue('METH');
  const code =
    dropdown_attr +
    dropdown_way +
    "('" +
    text_value +
    "').findOne()." +
    dropdown_meth +
    '();\n';
  return code;
};

JavaScript['widget_do_input'] = function (block: {
  getFieldValue: (arg0: string) => any;
}) {
  const dropdown_attr = block.getFieldValue('ATTR');
  const dropdown_way = block.getFieldValue('WAY');
  const text_value = block.getFieldValue('VALUE');
  const input = JavaScript.valueToCode(
    block,
    'INPUT',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code =
    dropdown_attr +
    dropdown_way +
    "('" +
    text_value +
    "').findOne().setText(" +
    input +
    ');\n';
  return code;
};

JavaScript['widget_attr_selector'] = function (block: {
  getFieldValue: (arg0: string) => any;
}) {
  const dropdown_attr = block.getFieldValue('ATTR');
  const dropdown_way = block.getFieldValue('WAY');
  const text_value = JavaScript.valueToCode(
    block,
    'VALUE',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = dropdown_attr + dropdown_way + '(' + text_value + ')';
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['widget_status_selector'] = function (block: {
  getFieldValue: (arg0: string) => any;
}) {
  const dropdown_attr = block.getFieldValue('ATTR');
  const dropdown_value = block.getFieldValue('VALUE');
  const code = dropdown_attr + '(' + dropdown_value + ')';
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['widget_find_one'] = function (block: any) {
  const value_selector = JavaScript.valueToCode(
    block,
    'SELECTOR',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = value_selector + '.findOne()';
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['widget_parent'] = function (block: any) {
  const value = JavaScript.valueToCode(
    block,
    'VALUE',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = value + '.parent()';
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['widget_children'] = function (block: any) {
  const value = JavaScript.valueToCode(
    block,
    'VALUE',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = value + '.children()';
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['widget_find_once'] = function (block: any) {
  const value_selector = JavaScript.valueToCode(
    block,
    'SELECTOR',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = value_selector + '.findOnce()';
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['widget_exists'] = function (block: any) {
  const value_selector = JavaScript.valueToCode(
    block,
    'SELECTOR',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = value_selector + '.exists()';
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['widget_until_find'] = function (block: any) {
  const value_selector = JavaScript.valueToCode(
    block,
    'SELECTOR',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = value_selector + '.untilFind()';
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['widget_find'] = function (block: any) {
  const value_selector = JavaScript.valueToCode(
    block,
    'SELECTOR',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = value_selector + '.find()';
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['widget_wait'] = function (block: any) {
  const value_selector = JavaScript.valueToCode(
    block,
    'SELECTOR',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = value_selector + '.waitFor();\n';
  return code;
};

JavaScript['widget_until_find'] = function (block: any) {
  const value_selector = JavaScript.valueToCode(
    block,
    'SELECTOR',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = value_selector + '.untilFind()';
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['widget_operate'] = function (block: {
  getFieldValue: (arg0: string) => any;
}) {
  const dropdown_meth = block.getFieldValue('METH');
  const value_selector = JavaScript.valueToCode(
    block,
    'WIDGET',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = value_selector + '.' + dropdown_meth + '()';
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['widget_set_text'] = function (block: any) {
  const value_selector = JavaScript.valueToCode(
    block,
    'WIDGET',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const value_text = JavaScript.valueToCode(
    block,
    'TEXT',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = value_selector + '.setText(' + value_text + ')';
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['widget_get_attr'] = function (block: {
  getFieldValue: (arg0: string) => any;
}) {
  const dropdown_meth = block.getFieldValue('METH');
  const value_selector = JavaScript.valueToCode(
    block,
    'WIDGET',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = value_selector + '.' + dropdown_meth + '()';
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['widget_selectors_join'] = function (block: { itemCount_: number }) {
  const elements = new Array(block.itemCount_);
  for (let i = 0; i < block.itemCount_; i++) {
    elements[i] = JavaScript.valueToCode(
      block,
      'ADD' + i,
      JavaScript.ORDER_ATOMIC,
      true,
    );
  }
  const code = elements.join('.');
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['widget_algorithm'] = function (block: {
  getFieldValue: (arg0: string) => any;
}) {
  const dropdown_way = block.getFieldValue('WAY');
  const value_selector = JavaScript.valueToCode(
    block,
    'SELECTOR',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = value_selector + ".algorithm('" + dropdown_way + "')";
  return [code, JavaScript.ORDER_ATOMIC];
};
