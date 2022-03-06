import { JavaScript } from './_common';

JavaScript['$power_manager_request_ignore_battery_optimizations2'] =
  function (block: { getFieldValue: (arg0: string) => any }) {
    const battery_checked = block.getFieldValue('BATTERY2');
    const code =
      '$power_manager.requestIgnoreBatteryOptimizations(' +
      battery_checked +
      ');\n';
    return code;
  };
JavaScript['$power_manager_request_ignore_battery_optimizations'] =
  function (block: { getFieldValue: (arg0: string) => any }) {
    const battery_checked = block.getFieldValue('BATTERY');
    const pkg_value = JavaScript.valueToCode(
      block,
      'PKG',
      JavaScript.ORDER_ATOMIC,
      true,
    );
    const code =
      '$power_manager.requestIgnoreBatteryOptimizations(' +
      battery_checked +
      ',' +
      pkg_value +
      ');\n';
    return code;
  };
JavaScript['$power_manager_is_ignoring_battery_optimizations'] = function (
  _block: any,
) {
  const code = '$power_manager.isIgnoringBatteryOptimizations()';
  return [code, JavaScript.ORDER_ATOMIC];
};
JavaScript['$power_manager_is_ignoring_battery_optimizations2'] = function (
  block: any,
) {
  const pkg_value = JavaScript.valueToCode(
    block,
    'PKG',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code =
    '$power_manager.isIgnoringBatteryOptimizations(' + pkg_value + ')';
  return [code, JavaScript.ORDER_ATOMIC];
};
