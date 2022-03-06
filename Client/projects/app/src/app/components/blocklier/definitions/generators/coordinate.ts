import { JavaScript } from './_common';

JavaScript['coordinate_set_screen'] = function (block: any) {
  const value_w = JavaScript.valueToCode(block, 'W', JavaScript.ORDER_ATOMIC);
  const value_h = JavaScript.valueToCode(block, 'H', JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  const code = 'setScreenMetrics(' + value_w + ',' + value_h + ');\n';
  return code;
};

JavaScript['coordinate_click'] = function (block: any) {
  const value_x = JavaScript.valueToCode(block, 'X', JavaScript.ORDER_ATOMIC);
  const value_y = JavaScript.valueToCode(block, 'Y', JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  const code = 'click(' + value_x + ',' + value_y + ');\n';
  return code;
};

JavaScript['coordinate_long_click'] = function (block: any) {
  const value_x = JavaScript.valueToCode(block, 'X', JavaScript.ORDER_ATOMIC);
  const value_y = JavaScript.valueToCode(block, 'Y', JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  const code = 'longClick(' + value_x + ',' + value_y + ');\n';
  return code;
};

JavaScript['coordinate_press'] = function (block: any) {
  const value_x = JavaScript.valueToCode(block, 'X', JavaScript.ORDER_ATOMIC);
  const value_y = JavaScript.valueToCode(block, 'Y', JavaScript.ORDER_ATOMIC);
  const value_d = JavaScript.valueToCode(block, 'D', JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  const code = 'press(' + value_x + ',' + value_y + ',' + value_d + ');\n';
  return code;
};

JavaScript['coordinate_swipe'] = function (block: any) {
  const value_x1 = JavaScript.valueToCode(block, 'X1', JavaScript.ORDER_ATOMIC);
  const value_y1 = JavaScript.valueToCode(block, 'Y1', JavaScript.ORDER_ATOMIC);
  const value_x2 = JavaScript.valueToCode(block, 'X2', JavaScript.ORDER_ATOMIC);
  const value_y2 = JavaScript.valueToCode(block, 'Y2', JavaScript.ORDER_ATOMIC);
  const value_d = JavaScript.valueToCode(block, 'D', JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  const code =
    'swipe(' +
    value_x1 +
    ',' +
    value_y1 +
    ',' +
    value_x2 +
    ',' +
    value_y2 +
    ',' +
    value_d +
    ');\n';
  return code;
};

JavaScript['coordinate_root_tap'] = function (block: any) {
  const value_x = JavaScript.valueToCode(block, 'X', JavaScript.ORDER_ATOMIC);
  const value_y = JavaScript.valueToCode(block, 'Y', JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  const code = 'Tap(' + value_x + ',' + value_y + ');\n';
  return code;
};

JavaScript['coordinate_root_swipe'] = function (block: any) {
  const value_x1 = JavaScript.valueToCode(block, 'X1', JavaScript.ORDER_ATOMIC);
  const value_y1 = JavaScript.valueToCode(block, 'Y1', JavaScript.ORDER_ATOMIC);
  const value_x2 = JavaScript.valueToCode(block, 'X2', JavaScript.ORDER_ATOMIC);
  const value_y2 = JavaScript.valueToCode(block, 'Y2', JavaScript.ORDER_ATOMIC);
  const value_d = JavaScript.valueToCode(block, 'D', JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  const code =
    'Swipe(' +
    value_x1 +
    ',' +
    value_y1 +
    ',' +
    value_x2 +
    ',' +
    value_y2 +
    ',' +
    value_d +
    ');\n';
  return code;
};
