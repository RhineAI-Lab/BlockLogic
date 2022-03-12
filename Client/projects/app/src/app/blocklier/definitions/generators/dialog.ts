import { JavaScript } from './_common';

JavaScript['dialogs_alert'] = function (block: {
  getFieldValue: (arg0: string) => any;
}) {
  const type = block.getFieldValue('TYPE');
  const title = JavaScript.valueToCode(block, 'TITLE', JavaScript.ORDER_ATOMIC);
  const content = JavaScript.valueToCode(
    block,
    'CONTENT',
    JavaScript.ORDER_ATOMIC,
  );
  const code = 'dialogs.' + type + '(' + title + ', ' + content + ')';
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['dialogs_input'] = function (block: {
  getFieldValue: (arg0: string) => any;
}) {
  const type = block.getFieldValue('TYPE');
  const title = JavaScript.valueToCode(block, 'TITLE', JavaScript.ORDER_ATOMIC);
  const content = JavaScript.valueToCode(
    block,
    'CONTENT',
    JavaScript.ORDER_ATOMIC,
  );
  const code = 'dialogs.' + type + '(' + title + ', ' + content + ')';
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['dialogs_select'] = function (block: {
  getFieldValue: (arg0: string) => any;
}) {
  const type = block.getFieldValue('TYPE');
  const title = JavaScript.valueToCode(block, 'TITLE', JavaScript.ORDER_ATOMIC);
  const content = JavaScript.valueToCode(
    block,
    'CONTENT',
    JavaScript.ORDER_ATOMIC,
  );
  const code = 'dialogs.' + type + '(' + title + ', ' + content + ')';
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['dialogs_alert_callback'] = function (block: {
  getFieldValue: (arg0: string) => any;
}) {
  const type = block.getFieldValue('TYPE');
  const title = JavaScript.valueToCode(block, 'TITLE', JavaScript.ORDER_ATOMIC);
  const content = JavaScript.valueToCode(
    block,
    'CONTENT',
    JavaScript.ORDER_ATOMIC,
  );
  const func = JavaScript.valueToCode(
    block,
    'FUNCTION',
    JavaScript.ORDER_ATOMIC,
  );
  console.log(func);
  const code =
    'dialogs.' +
    type +
    '(' +
    title +
    ',' +
    content +
    (func ? ',' + func : '') +
    '); \n';
  return code;
};

JavaScript['dialogs_input_callback'] = function (block: {
  getFieldValue: (arg0: string) => any;
}) {
  const type = block.getFieldValue('TYPE');
  const title = JavaScript.valueToCode(block, 'TITLE', JavaScript.ORDER_ATOMIC);
  const content = JavaScript.valueToCode(
    block,
    'CONTENT',
    JavaScript.ORDER_ATOMIC,
  );
  const func = JavaScript.valueToCode(
    block,
    'FUNCTION',
    JavaScript.ORDER_ATOMIC,
  );
  console.log(func);
  const code =
    'dialogs.' +
    type +
    '(' +
    title +
    ',' +
    content +
    (func ? ',' + func : '') +
    '); \n';
  return code;
};

JavaScript['dialogs_select_callback'] = function (block: {
  getFieldValue: (arg0: string) => any;
}) {
  const type = block.getFieldValue('TYPE');
  const title = JavaScript.valueToCode(block, 'TITLE', JavaScript.ORDER_ATOMIC);
  const content = JavaScript.valueToCode(
    block,
    'CONTENT',
    JavaScript.ORDER_ATOMIC,
  );
  const func = JavaScript.valueToCode(
    block,
    'FUNCTION',
    JavaScript.ORDER_ATOMIC,
  );
  console.log(func);
  const code =
    'dialogs.' +
    type +
    '(' +
    title +
    ',' +
    content +
    (func ? ',' + func : '') +
    '); \n';
  return code;
};
