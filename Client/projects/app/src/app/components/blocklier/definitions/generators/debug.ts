import { JavaScript } from './_common';

JavaScript['$debug_dump_hprof'] = function (block: any) {
  const name_value = JavaScript.valueToCode(
    block,
    'HPROF',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = '$debug.dumpHprof(' + name_value + ');\n';
  return code;
};
JavaScript['$debug_dump_and_send_hprof'] = function (_block: any) {
  const code = '$debug.dumpAndSendHprof';
  return [code, JavaScript.ORDER_ATOMIC];
};
JavaScript['$debug_get_stack_trace'] = function (block: any) {
  const name_value = JavaScript.valueToCode(
    block,
    'TRACE',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = '$debug.getStackTrace(' + name_value + ');\n';
  return code;
};
JavaScript['$debug_set_memory_leak_detection_enabled'] = function (block: {
  getFieldValue: (arg0: string) => any;
}) {
  const name_checked = block.getFieldValue('ENABLED');
  const code = '$debug.setMemoryLeakDetectionEnabled(' + name_checked + ');\n';
  return code;
};
JavaScript['$debug_gc'] = function (block: any) {
  const name_value = JavaScript.valueToCode(
    block,
    'GC',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = '$debug.gc(' + name_value + ');\n';
  return code;
};
