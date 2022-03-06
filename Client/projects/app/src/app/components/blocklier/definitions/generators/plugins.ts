import { JavaScript } from './_common';

JavaScript['$plugins_load'] = function (block: any) {
  const name_value = JavaScript.valueToCode(
    block,
    'LOAD',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = '$plugins.load(' + name_value + ');\n';
  return code;
};
