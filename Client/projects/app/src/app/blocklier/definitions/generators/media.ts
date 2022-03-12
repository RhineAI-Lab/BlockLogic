import { JavaScript } from './_common';

JavaScript['media_scan_file'] = function (block: any) {
  const value = JavaScript.valueToCode(block, 'PATH', JavaScript.ORDER_MEMBER);
  const code = 'media.scanFile(' + value + ');\n';
  return code;
};

JavaScript['media_play_music'] = function (block: any) {
  const value1 =
    JavaScript.valueToCode(block, 'PATH', JavaScript.ORDER_MEMBER) || "''";
  const value2 =
    JavaScript.valueToCode(block, 'VOLUME', JavaScript.ORDER_MEMBER) || 1;
  const value3 =
    JavaScript.valueToCode(block, 'LOOPING', JavaScript.ORDER_MEMBER) || false;
  const code =
    'media.playMusic(' + value1 + ',' + value2 + ',' + value3 + ');\n';
  return code;
};
JavaScript['media_music_seek_to'] = function (block: any) {
  const value = JavaScript.valueToCode(block, 'MSEC', JavaScript.ORDER_MEMBER);
  const code = 'media.musicSeekTo(' + value + ');\n';
  return code;
};

JavaScript['media_pause_music'] = function (_block: any) {
  const code = 'media.pauseMusic();\n';
  return code;
};
JavaScript['media_resume_music'] = function (_block: any) {
  const code = 'media.resumeMusic();\n';
  return code;
};
JavaScript['media_stop_music'] = function (_block: any) {
  const code = 'media.stopMusic();\n';
  return code;
};
JavaScript['media_is_music_playing'] = function (_block: any) {
  const code = ['media.isMusicPlaying()', JavaScript.ORDER_ATOMIC];
  return code;
};
JavaScript['media_get_music_duration'] = function (_block: any) {
  const code = ['media.getMusicDuration()', JavaScript.ORDER_ATOMIC];
  return code;
};
JavaScript['media_get_music_current_position'] = function (_block: any) {
  const code = ['media.getMusicCurrentPosition()', JavaScript.ORDER_ATOMIC];
  return code;
};
