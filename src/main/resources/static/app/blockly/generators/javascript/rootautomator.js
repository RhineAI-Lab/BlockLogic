'use strict';

goog.provide('Blockly.JavaScript.automator');
goog.require('Blockly.JavaScript');

Blockly.JavaScript['automator_new'] = function(block) {
    var code = "new RootAutomator()";
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['automator_tap'] = function(block) {
    var value_obj = Blockly.JavaScript.valueToCode(block, 'OBJ', Blockly.JavaScript.ORDER_ATOMIC, true);
    var value_x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC, true);
    var value_y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC, true);
    var value_f = Blockly.JavaScript.valueToCode(block, 'F', Blockly.JavaScript.ORDER_ATOMIC, true);
    var code = value_obj+".tap("+value_x+","+value_y+","+value_f+");\n";
    return code;
};

Blockly.JavaScript['automator_long_press'] = function(block) {
    var value_obj = Blockly.JavaScript.valueToCode(block, 'OBJ', Blockly.JavaScript.ORDER_ATOMIC, true);
    var value_x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC, true);
    var value_y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC, true);
    var value_f = Blockly.JavaScript.valueToCode(block, 'F', Blockly.JavaScript.ORDER_ATOMIC, true);
    var code = value_obj+".longPress("+value_x+","+value_y+","+value_f+");\n";
    return code;
};

Blockly.JavaScript['automator_swipe'] = function(block) {
    var value_obj = Blockly.JavaScript.valueToCode(block, 'OBJ', Blockly.JavaScript.ORDER_ATOMIC, true);
    var value_x1 = Blockly.JavaScript.valueToCode(block, 'X1', Blockly.JavaScript.ORDER_ATOMIC, true);
    var value_y1 = Blockly.JavaScript.valueToCode(block, 'Y1', Blockly.JavaScript.ORDER_ATOMIC, true);
    var value_x2 = Blockly.JavaScript.valueToCode(block, 'X2', Blockly.JavaScript.ORDER_ATOMIC, true);
    var value_y2 = Blockly.JavaScript.valueToCode(block, 'Y2', Blockly.JavaScript.ORDER_ATOMIC, true);
    var value_d = Blockly.JavaScript.valueToCode(block, 'D', Blockly.JavaScript.ORDER_ATOMIC, true);
    var value_f = Blockly.JavaScript.valueToCode(block, 'F', Blockly.JavaScript.ORDER_ATOMIC, true);
    var code = value_obj+".swipe("+value_x1+","+value_y1+","+value_x2+","+value_y2+","+value_d+","+value_f+");\n";
    return code;
};

Blockly.JavaScript['automator_press'] = function(block) {
    var value_obj = Blockly.JavaScript.valueToCode(block, 'OBJ', Blockly.JavaScript.ORDER_ATOMIC, true);
    var value_x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC, true);
    var value_y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC, true);
    var value_d = Blockly.JavaScript.valueToCode(block, 'D', Blockly.JavaScript.ORDER_ATOMIC, true);
    var value_f = Blockly.JavaScript.valueToCode(block, 'F', Blockly.JavaScript.ORDER_ATOMIC, true);
    var code = value_obj+".press("+value_x+","+value_y+","+value_d+","+value_f+");\n";
    return code;
};

Blockly.JavaScript['automator_touch_down'] = function(block) {
    var value_obj = Blockly.JavaScript.valueToCode(block, 'OBJ', Blockly.JavaScript.ORDER_ATOMIC, true);
    var value_x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC, true);
    var value_y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC, true);
    var value_f = Blockly.JavaScript.valueToCode(block, 'F', Blockly.JavaScript.ORDER_ATOMIC, true);
    var code = value_obj+".touchDown("+value_x+","+value_y+","+value_f+");\n";
    return code;
};


Blockly.JavaScript['automator_touch_move'] = function(block) {
    var value_obj = Blockly.JavaScript.valueToCode(block, 'OBJ', Blockly.JavaScript.ORDER_ATOMIC, true);
    var value_x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC, true);
    var value_y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC, true);
    var value_f = Blockly.JavaScript.valueToCode(block, 'F', Blockly.JavaScript.ORDER_ATOMIC, true);
    var code = value_obj+".touchMove("+value_x+","+value_y+","+value_f+");\n";
    return code;
};


Blockly.JavaScript['automator_touch_up'] = function(block) {
    var value_obj = Blockly.JavaScript.valueToCode(block, 'OBJ', Blockly.JavaScript.ORDER_ATOMIC, true);
    var value_f = Blockly.JavaScript.valueToCode(block, 'F', Blockly.JavaScript.ORDER_ATOMIC, true);
    var code = value_obj+".touchUp("+value_f+");\n";
    return code;
};

