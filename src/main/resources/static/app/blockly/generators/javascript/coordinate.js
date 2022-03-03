'use strict';

goog.provide('Blockly.JavaScript.coordinate');
goog.require('Blockly.JavaScript');

Blockly.JavaScript['coordinate_set_screen'] = function(block) {
  var value_w = Blockly.JavaScript.valueToCode(block, 'W', Blockly.JavaScript.ORDER_ATOMIC);
  var value_h = Blockly.JavaScript.valueToCode(block, 'H', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'setScreenMetrics('+value_w+','+value_h+');\n';
  return code;
};

Blockly.JavaScript['coordinate_click'] = function(block) {
  var value_x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'click('+value_x+','+value_y+');\n';
  return code;
};

Blockly.JavaScript['coordinate_long_click'] = function(block) {
  var value_x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'longClick('+value_x+','+value_y+');\n';
  return code;
};

Blockly.JavaScript['coordinate_press'] = function(block) {
  var value_x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
  var value_d = Blockly.JavaScript.valueToCode(block, 'D', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'press('+value_x+','+value_y+','+value_d+');\n';
  return code;
};

Blockly.JavaScript['coordinate_swipe'] = function(block) {
  var value_x1 = Blockly.JavaScript.valueToCode(block, 'X1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y1 = Blockly.JavaScript.valueToCode(block, 'Y1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_x2 = Blockly.JavaScript.valueToCode(block, 'X2', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y2 = Blockly.JavaScript.valueToCode(block, 'Y2', Blockly.JavaScript.ORDER_ATOMIC);
  var value_d = Blockly.JavaScript.valueToCode(block, 'D', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'swipe('+value_x1+','+value_y1+','+value_x2+','+value_y2+','+value_d+');\n';
  return code;
};

Blockly.JavaScript['coordinate_root_tap'] = function(block) {
  var value_x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'Tap('+value_x+','+value_y+');\n';
  return code;
};

Blockly.JavaScript['coordinate_root_swipe'] = function(block) {
  var value_x1 = Blockly.JavaScript.valueToCode(block, 'X1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y1 = Blockly.JavaScript.valueToCode(block, 'Y1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_x2 = Blockly.JavaScript.valueToCode(block, 'X2', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y2 = Blockly.JavaScript.valueToCode(block, 'Y2', Blockly.JavaScript.ORDER_ATOMIC);
  var value_d = Blockly.JavaScript.valueToCode(block, 'D', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'Swipe('+value_x1+','+value_y1+','+value_x2+','+value_y2+','+value_d+');\n';
  return code;
};
