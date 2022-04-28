import { JavaScript } from '../../_common';

JavaScript['$settings_set_enabled'] = function (block: {
  getFieldValue: (arg0: string) => any;
}) {
  const flag = block.getFieldValue('VALUE');
  const value = block.getFieldValue('KEY');
  const code = '$settings.setEnabled("' + value + '",' + flag + ');\n';
  return code;
};
JavaScript['$settings_is_enabled'] = function (block: {
  getFieldValue: (arg0: string) => any;
}) {
  const value = block.getFieldValue('KEY');
  const code = '$settings.isEnabled("' + value + '");\n';
  return code;
};
