"use strict";

goog.provide("Blockly.JavaScript.media");
goog.require("Blockly.JavaScript");

Blockly.JavaScript["media_scan_file"] = function (block) {
  var value = Blockly.JavaScript.valueToCode(block, "PATH", Blockly.JavaScript.ORDER_MEMBER);
  var code = "media.scanFile(" + value + ");\n";
  return code;
};

Blockly.JavaScript["media_play_music"] = function (block) {
  var value1 = Blockly.JavaScript.valueToCode(block, "PATH", Blockly.JavaScript.ORDER_MEMBER) || "''";
  var value2 = Blockly.JavaScript.valueToCode(block, "VOLUME", Blockly.JavaScript.ORDER_MEMBER) || 1;
  var value3 = Blockly.JavaScript.valueToCode(block, "LOOPING", Blockly.JavaScript.ORDER_MEMBER) || false;
  var code = "media.playMusic(" + value1 + "," + value2 + "," + value3 + ");\n";
  return code;
};
Blockly.JavaScript["media_music_seek_to"] = function (block) {
  var value = Blockly.JavaScript.valueToCode(block, "MSEC", Blockly.JavaScript.ORDER_MEMBER);
  var code = "media.musicSeekTo(" + value + ");\n";
  return code;
};

Blockly.JavaScript["media_pause_music"] = function (block) {
  var code = "media.pauseMusic();\n";
  return code;
};
Blockly.JavaScript["media_resume_music"] = function (block) {
  var code = "media.resumeMusic();\n";
  return code;
};
Blockly.JavaScript["media_stop_music"] = function (block) {
  var code = "media.stopMusic();\n";
  return code;
};
Blockly.JavaScript["media_is_music_playing"] = function (block) {
  var code = ["media.isMusicPlaying()", Blockly.JavaScript.ORDER_ATOMIC];
  return code;
};
Blockly.JavaScript["media_get_music_duration"] = function (block) {
  var code = ["media.getMusicDuration()", Blockly.JavaScript.ORDER_ATOMIC];
  return code;
};
Blockly.JavaScript["media_get_music_current_position"] = function (block) {
  var code = ["media.getMusicCurrentPosition()", Blockly.JavaScript.ORDER_ATOMIC];
  return code;
};
