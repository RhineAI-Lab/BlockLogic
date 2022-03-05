import { JavaScript } from './_common';

JavaScript['globals_sleep'] = function (block: any) {
  const value = JavaScript.valueToCode(block, 'VALUE', JavaScript.ORDER_ATOMIC);
  const code = 'sleep(' + value + ');\n';
  return code;
};

JavaScript['globals_current_package'] = function (_block: any) {
  return ['currentPackage()', JavaScript.ORDER_ATOMIC];
};

JavaScript['globals_current_activity'] = function (_block: any) {
  return ['currentActivity()', JavaScript.ORDER_ATOMIC];
};

JavaScript['globals_set_clip'] = function (block: any) {
  const value = JavaScript.valueToCode(block, 'VALUE', JavaScript.ORDER_ATOMIC);
  const code = 'setClip(' + value + ');\n';
  return code;
};

JavaScript['globals_get_clip'] = function (_block: any) {
  return ['getClip()', JavaScript.ORDER_ATOMIC];
};

JavaScript['globals_toast'] = function (block: {
  getFieldValue: (arg0: string) => any;
}) {
  const isLog = block.getFieldValue('TYPE');
  const content = JavaScript.valueToCode(
    block,
    'CONTENT',
    JavaScript.ORDER_ATOMIC,
  );
  const code =
    'toast' + (isLog === 'TRUE' ? 'Log' : '') + '(' + content + ');\n';
  return code;
};

JavaScript['globals_wait_for_activity'] = function (block: any) {
  const value = JavaScript.valueToCode(block, 'VALUE', JavaScript.ORDER_ATOMIC);
  const code = 'waitForActivity(' + value + ');\n';
  return code;
};

JavaScript['globals_wait_for_package'] = function (block: any) {
  const value = JavaScript.valueToCode(block, 'VALUE', JavaScript.ORDER_ATOMIC);
  const code = 'waitForPackage(' + value + ');\n';
  return code;
};

JavaScript['globals_exit'] = function (_block: any) {
  return 'exit();\n';
};

JavaScript['globals_random'] = function (block: any) {
  const min = JavaScript.valueToCode(block, 'MIN', JavaScript.ORDER_ATOMIC);
  const max = JavaScript.valueToCode(block, 'MAX', JavaScript.ORDER_ATOMIC);
  const code = 'random(' + min + ',' + max + ')';
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['globals_random_float'] = function (_block: any) {
  return ['random()', JavaScript.ORDER_ATOMIC];
};

JavaScript['globals_requires_api'] = function (block: {
  getFieldValue: (arg0: string) => any;
}) {
  const value = block.getFieldValue('VALUE');
  return 'requiresApi(' + value + ');\n';
};

JavaScript['globals_requires_version'] = function (block: any) {
  let value = JavaScript.valueToCode(block, 'VALUE', JavaScript.ORDER_ATOMIC);
  const num = parseInt(value.substring(1, value.length - 1));
  if (!isNaN(num)) {
    value = num + '';
  }
  return 'requiresAutojsVersion(' + value + ');\n';
};

JavaScript['globals_request_permissions'] = function (block: any) {
  const value = JavaScript.valueToCode(block, 'VALUE', JavaScript.ORDER_ATOMIC);
  return 'runtime.requestPermissions(' + value + ');\n';
};

JavaScript['globals_load_jar'] = function (block: any) {
  const value = JavaScript.valueToCode(block, 'VALUE', JavaScript.ORDER_ATOMIC);
  return 'runtime.loadJar(' + value + ');\n';
};

JavaScript['globals_load_dex'] = function (block: any) {
  const value = JavaScript.valueToCode(block, 'VALUE', JavaScript.ORDER_ATOMIC);
  return 'runtime.loadDex(' + value + ');\n';
};
