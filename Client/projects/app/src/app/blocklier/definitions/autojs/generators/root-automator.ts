import { JavaScript } from '../../_common';

JavaScript['automator_new'] = function (_block: any) {
  const code = 'new RootAutomator()';
  return [code, JavaScript.ORDER_NONE];
};

JavaScript['automator_tap'] = function (block: any) {
  const value_obj = JavaScript.valueToCode(
    block,
    'OBJ',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const value_x = JavaScript.valueToCode(
    block,
    'X',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const value_y = JavaScript.valueToCode(
    block,
    'Y',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const value_f = JavaScript.valueToCode(
    block,
    'F',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code =
    value_obj + '.tap(' + value_x + ',' + value_y + ',' + value_f + ');\n';
  return code;
};

JavaScript['automator_long_press'] = function (block: any) {
  const value_obj = JavaScript.valueToCode(
    block,
    'OBJ',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const value_x = JavaScript.valueToCode(
    block,
    'X',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const value_y = JavaScript.valueToCode(
    block,
    'Y',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const value_f = JavaScript.valueToCode(
    block,
    'F',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code =
    value_obj +
    '.longPress(' +
    value_x +
    ',' +
    value_y +
    ',' +
    value_f +
    ');\n';
  return code;
};

JavaScript['automator_swipe'] = function (block: any) {
  const value_obj = JavaScript.valueToCode(
    block,
    'OBJ',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const value_x1 = JavaScript.valueToCode(
    block,
    'X1',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const value_y1 = JavaScript.valueToCode(
    block,
    'Y1',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const value_x2 = JavaScript.valueToCode(
    block,
    'X2',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const value_y2 = JavaScript.valueToCode(
    block,
    'Y2',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const value_d = JavaScript.valueToCode(
    block,
    'D',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const value_f = JavaScript.valueToCode(
    block,
    'F',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code =
    value_obj +
    '.swipe(' +
    value_x1 +
    ',' +
    value_y1 +
    ',' +
    value_x2 +
    ',' +
    value_y2 +
    ',' +
    value_d +
    ',' +
    value_f +
    ');\n';
  return code;
};

JavaScript['automator_press'] = function (block: any) {
  const value_obj = JavaScript.valueToCode(
    block,
    'OBJ',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const value_x = JavaScript.valueToCode(
    block,
    'X',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const value_y = JavaScript.valueToCode(
    block,
    'Y',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const value_d = JavaScript.valueToCode(
    block,
    'D',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const value_f = JavaScript.valueToCode(
    block,
    'F',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code =
    value_obj +
    '.press(' +
    value_x +
    ',' +
    value_y +
    ',' +
    value_d +
    ',' +
    value_f +
    ');\n';
  return code;
};

JavaScript['automator_touch_down'] = function (block: any) {
  const value_obj = JavaScript.valueToCode(
    block,
    'OBJ',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const value_x = JavaScript.valueToCode(
    block,
    'X',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const value_y = JavaScript.valueToCode(
    block,
    'Y',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const value_f = JavaScript.valueToCode(
    block,
    'F',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code =
    value_obj +
    '.touchDown(' +
    value_x +
    ',' +
    value_y +
    ',' +
    value_f +
    ');\n';
  return code;
};

JavaScript['automator_touch_move'] = function (block: any) {
  const value_obj = JavaScript.valueToCode(
    block,
    'OBJ',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const value_x = JavaScript.valueToCode(
    block,
    'X',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const value_y = JavaScript.valueToCode(
    block,
    'Y',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const value_f = JavaScript.valueToCode(
    block,
    'F',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code =
    value_obj +
    '.touchMove(' +
    value_x +
    ',' +
    value_y +
    ',' +
    value_f +
    ');\n';
  return code;
};

JavaScript['automator_touch_up'] = function (block: any) {
  const value_obj = JavaScript.valueToCode(
    block,
    'OBJ',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const value_f = JavaScript.valueToCode(
    block,
    'F',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = value_obj + '.touchUp(' + value_f + ');\n';
  return code;
};
