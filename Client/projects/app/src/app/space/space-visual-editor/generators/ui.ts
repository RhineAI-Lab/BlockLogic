import { connectNecessaryArgs, JavaScript } from './_common';

JavaScript['ui_layout'] = function (block: any) {
  JavaScript.setRunMode_('ui');
  const value = JavaScript.valueToCode(
    block,
    'UI_XML',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = '$ui.layout(\n' + value + '\n);\n';
  return code;
};
JavaScript['ui_layout_file'] = function (block: any) {
  JavaScript.setRunMode_('ui');
  const value = JavaScript.valueToCode(
    block,
    'FILE_PATH',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = '$ui.layoutFile(' + value + ');\n';
  return code;
};
JavaScript['ui_xml'] = function (block: {
  getFieldValue: (arg0: string) => any;
}) {
  const value = block.getFieldValue('TEXT');
  return [value, JavaScript.ORDER_ATOMIC];
};
JavaScript['ui_get_attr'] = function (block: {
  getFieldValue: (arg0: string) => any;
}) {
  const id_value = block.getFieldValue('ID');
  const name_value = JavaScript.valueToCode(
    block,
    'NAME',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = 'ui.' + id_value + '.attr(' + name_value + ')';
  return [code, JavaScript.ORDER_ATOMIC];
};
JavaScript['ui_set_attr'] = function (block: {
  getFieldValue: (arg0: string) => any;
}) {
  const id_value = block.getFieldValue('ID');
  const name_value = JavaScript.valueToCode(
    block,
    'NAME',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const value_value = JavaScript.valueToCode(
    block,
    'VALUE',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code =
    'ui.' + id_value + '.attr(' + name_value + ',' + value_value + ');\n';
  return code;
};
JavaScript['ui_inflate'] = function (block: any) {
  const xml_value = JavaScript.valueToCode(
    block,
    'UI_XML',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const parent_value = JavaScript.valueToCode(
    block,
    'UI_PARENT',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const in_value = JavaScript.valueToCode(
    block,
    'IN_PARENT',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code =
    '$ui.inflate(' +
    xml_value +
    connectNecessaryArgs([parent_value, in_value], true) +
    ')';
  return [code, JavaScript.ORDER_ATOMIC];
};
JavaScript['ui_find_view'] = function (block: any) {
  const xml_value = JavaScript.valueToCode(
    block,
    'UI_XML',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = '$ui.findView(' + xml_value + ')';
  return [code, JavaScript.ORDER_ATOMIC];
};
JavaScript['ui_is_ui_thread'] = function (_block: any) {
  const code = '$ui.isUiThread()';
  return [code, JavaScript.ORDER_ATOMIC];
};
JavaScript['ui_finish'] = function (_block: any) {
  JavaScript.setRunMode_('ui');
  const code = '$ui.finish();\n';
  return code;
};
JavaScript['ui_use_android_resources'] = function (_block: any) {
  JavaScript.setRunMode_('ui');
  const code = '$ui.useAndroidResources();\n';
  return code;
};
JavaScript['ui_set_content_view'] = function (block: any) {
  JavaScript.setRunMode_('ui');
  const view_value = JavaScript.valueToCode(
    block,
    'UI_VIEW',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = '$ui.setContentView(' + view_value + ');\n';
  return code;
};
JavaScript['ui_register_widget'] = function (block: any) {
  const name_value = JavaScript.valueToCode(
    block,
    'NAME',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const function_value = JavaScript.valueToCode(
    block,
    'FUNCTION',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code =
    '$ui.registerWidget(' + name_value + ',' + function_value + ');\n';
  return code;
};
JavaScript['ui_status_bar_color'] = function (block: any) {
  const color_value = JavaScript.valueToCode(
    block,
    'COLOR',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = '$ui.statusBarColor(' + color_value + ');\n';
  return code;
};
JavaScript['ui_run'] = function (block: any) {
  const stat = JavaScript.statementToCode(block, 'STAT');
  const code = 'ui.run(function(){\n' + stat + '});\n';
  return code;
};
JavaScript['ui_post'] = function (block: any) {
  const time_value = JavaScript.valueToCode(
    block,
    'TIME',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const stat = JavaScript.statementToCode(block, 'STAT');
  const code = 'ui.post(function(){\n' + stat + '},' + time_value + ');\n';
  return code;
};
