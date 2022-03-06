import { JavaScript } from './_common';

JavaScript['console_show'] = function (block: {
  getFieldValue: (arg0: string) => any;
}) {
  const value = block.getFieldValue('VALUE');
  return 'console.' + value + '();\n';
};

JavaScript['console_clear'] = function (_block: any) {
  return 'console.clear();\n';
};

JavaScript['console_output'] = function (block: {
  getFieldValue: (arg0: string) => any;
}) {
  const TYPE = block.getFieldValue('TYPE');
  const CONTENT = JavaScript.valueToCode(
    block,
    'CONTENT',
    JavaScript.ORDER_ATOMIC,
  );
  return 'console.' + TYPE + '(' + CONTENT + ');\n';
};

JavaScript['console_time'] = function (block: {
  getFieldValue: (arg0: string) => any;
}) {
  const TYPE = block.getFieldValue('TYPE');
  const NAME = JavaScript.valueToCode(block, 'NAME', JavaScript.ORDER_ATOMIC);
  return 'console.' + TYPE + '(' + NAME + ');\n';
};

JavaScript['console_set_size'] = function (block: any) {
  const WIDTH = JavaScript.valueToCode(block, 'WIDTH', JavaScript.ORDER_ATOMIC);
  const HEIGHT = JavaScript.valueToCode(
    block,
    'HEIGHT',
    JavaScript.ORDER_ATOMIC,
  );
  return 'console.setSize(' + WIDTH + ',' + HEIGHT + ');\n';
};

JavaScript['console_set_position'] = function (block: any) {
  const X = JavaScript.valueToCode(block, 'X', JavaScript.ORDER_ATOMIC);
  const Y = JavaScript.valueToCode(block, 'Y', JavaScript.ORDER_ATOMIC);
  return 'console.setPosition(' + X + ',' + Y + ');\n';
};

JavaScript['console_config'] = function (block: any) {
  let branch = JavaScript.statementToCode(block, 'DO');
  branch = JavaScript.addLoopTrap(branch, block);
  return 'console.setGlobalLogConfig({\n' + branch + '});\n';
};

JavaScript['console_config_path'] = function (block: any) {
  const PATH = JavaScript.valueToCode(block, 'VALUE', JavaScript.ORDER_ATOMIC);
  return "'path':" + PATH + ',\n';
};

JavaScript['console_config_file_size'] = function (block: any) {
  const VALUE = JavaScript.valueToCode(block, 'VALUE', JavaScript.ORDER_ATOMIC);
  return "'maxFileSize':" + VALUE + ',\n';
};

JavaScript['console_config_level'] = function (block: {
  getFieldValue: (arg0: string) => any;
}) {
  const VALUE = block.getFieldValue('VALUE');
  return "'rootLevel':'" + VALUE + "',\n";
};

JavaScript['console_config_backup_size'] = function (block: any) {
  const VALUE = JavaScript.valueToCode(block, 'VALUE', JavaScript.ORDER_ATOMIC);
  return "'maxBackupSize':" + VALUE + ',\n';
};

JavaScript['console_config_file_pattern'] = function (block: any) {
  const VALUE = JavaScript.valueToCode(block, 'VALUE', JavaScript.ORDER_ATOMIC);
  return "'filePattern':" + VALUE + ',\n';
};
