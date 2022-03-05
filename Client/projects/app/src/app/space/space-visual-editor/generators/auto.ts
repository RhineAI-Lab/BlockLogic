import { JavaScript } from './_common';

JavaScript['auto_wait_for'] = function (_block: any) {
  const code = 'auto.waitFor();\n';
  return code;
};

JavaScript['auto_set_mode'] = function (block: {
  getFieldValue: (arg0: string) => any;
}) {
  const dropdown_mode = block.getFieldValue('MODE');
  const code = "auto.setMode('" + dropdown_mode + "');\n";
  return code;
};

JavaScript['auto_set_flags'] = function (block: {
  getFieldValue: (arg0: string) => any;
}) {
  const dropdown_mode = block.getFieldValue('FLAG');
  const code = "auto.setFlags(['" + dropdown_mode + "']);\n";
  return code;
};

JavaScript['auto_service'] = function (_block: any) {
  const code = 'auto.service';
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['auto_windows'] = function (_block: any) {
  const code = 'auto.windows';
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['auto_root'] = function (_block: any) {
  const code = 'auto.root';
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['auto_root_in_active_window'] = function (_block: any) {
  const code = 'auto.rootInActiveWindow';
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['auto_set_window_filter'] = function (block: any) {
  const value = JavaScript.valueToCode(
    block,
    'FILTER',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = "auto.setWindowFilter('" + value + "');\n";
  return code;
};
