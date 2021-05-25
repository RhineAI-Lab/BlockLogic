"use strict";

goog.provide("Blockly.Blocks.Media"); // Deprecated
goog.provide("Blockly.Constants.Media");

goog.require("Blockly");
goog.require("Blockly.Blocks");
goog.require("Blockly.FieldDropdown");
goog.require("Blockly.FieldLabel");
goog.require("Blockly.Mutator");

var colour = "#d4285c";
var baseHelpUrl = "https://pro.autojs.org/docs/#/zh-cn/device?id=";

Blockly.defineBlocksWithJsonArray([
  {
    type: "media_scan_file",
    message0: "扫描指定的媒体文件 %1",
    args0: [{ type: "input_value", name: "PATH", check: "String" }],
    colour: colour,
    tooltip: "扫描路径path的媒体文件，将它加入媒体库中；或者如果该文件以及被删除，则通知媒体库移除该文件。",
    helpUrl: baseHelpUrl + "mediascanfilepath",
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: "media_play_music",
    message0: "播放音乐文件 %1 %2 %3",
    args0: [
      { type: "input_value", name: "PATH", check: "String" },
      { type: "input_value", name: "VOLUME", check: "Number" },
      { type: "input_value", name: "LOOPING", check: "Boolean" },
    ],
    colour: colour,
    tooltip:
      "播放音乐文件path。该函数不会显示任何音乐播放界面。如果文件不存在或者文件不是受支持的音乐格式，则抛出UncheckedIOException异常。",
    helpUrl: baseHelpUrl + "mediaplaymusicpath-volume-looping",
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: "media_music_seek_to",
    message0: "调整播放进度 %1",
    args0: [{ type: "input_value", name: "MSEC", check: "Number" }],
    colour: colour,
    tooltip: "把当前播放进度调整到时间msec的位置。如果当前没有在播放音乐，则调用函数没有任何效果。",
    helpUrl: baseHelpUrl + "mediamusicseektomsec",
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: "media_pause_music",
    message0: "暂停音乐播放",
    colour: colour,
    tooltip: "暂停音乐播放。如果当前没有在播放音乐，则调用函数没有任何效果。",
    helpUrl: baseHelpUrl + "mediapausemusic",
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: "media_resume_music",
    message0: "继续音乐播放",
    colour: colour,
    tooltip: "继续音乐播放。如果当前没有播放过音乐，则调用该函数没有任何效果。",
    helpUrl: baseHelpUrl + "mediaresumemusic",
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: "media_stop_music",
    message0: "停止音乐播放",
    colour: colour,
    tooltip: "停止音乐播放。如果当前没有在播放音乐，则调用函数没有任何效果。",
    helpUrl: baseHelpUrl + "mediastopmusic",
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: "media_is_music_playing",
    message0: "返回当前是否正在播放音乐",
    output: "Boolean",
    colour: colour,
    tooltip: "返回当前是否正在播放音乐",
    helpUrl: baseHelpUrl + "mediaismusicplaying",
  },
  {
    type: "media_get_music_duration",
    message0: "返回当前音乐的时长",
    output: "Number",
    colour: colour,
    tooltip: "返回当前音乐的时长。单位毫秒。",
    helpUrl: baseHelpUrl + "mediagetmusicduration",
  },
  {
    type: "media_get_music_current_position",
    message0: "返回当前音乐的播放进度",
    output: "Number",
    colour: colour,
    tooltip: "返回当前音乐的播放进度(已经播放的时间)，单位毫秒。",
    helpUrl: baseHelpUrl + "mediagetmusiccurrentposition",
  },
]);
