import { JavaScript } from './_common';

JavaScript['app_version_code'] = function (_block: any) {
  const code = 'app.versionCode';
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['app_version_name'] = function (_block: any) {
  const code = 'app.versionName';
  return [code, JavaScript.ORDER_ATOMIC];
};
JavaScript['app_autojs'] = function (block: any) {
  const name_value = JavaScript.valueToCode(
    block,
    'AUTO',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = 'app.autojs(' + name_value + ');\n';
  return code;
};
JavaScript['app_launch'] = function (block: any) {
  const name_value = JavaScript.valueToCode(
    block,
    'PACKAGE_NAME',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = 'app.lauch(' + name_value + ');\n';
  return code;
};
JavaScript['app_launch_app'] = function (block: any) {
  const name_value = JavaScript.valueToCode(
    block,
    'APP_NAME',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = 'app.lauchApp(' + name_value + ');\n';
  return code;
};
JavaScript['app_get_packagename'] = function (_block: any) {
  const code = 'app.getPackageName';
  return [code, JavaScript.ORDER_ATOMIC];
};
JavaScript['app_get_app_name'] = function (block: any) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const name_value = JavaScript.valueToCode(
    block,
    'GET',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = 'app.getAppName';
  return code;
};
JavaScript['app_open_app_setting'] = function (_block: any) {
  const code = 'app.openAppSetting';
  return [code, JavaScript.ORDER_ATOMIC];
};
JavaScript['app_viewfile'] = function (block: any) {
  const name_value = JavaScript.valueToCode(
    block,
    'VIEWFILE',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = 'app.viewFile(' + name_value + ');\n';
  return code;
};
JavaScript['app_editfile'] = function (block: any) {
  const name_value = JavaScript.valueToCode(
    block,
    'EDITFILE',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = 'app.editFile(' + name_value + ');\n';
  return code;
};
JavaScript['app_uninstall'] = function (block: any) {
  const name_value = JavaScript.valueToCode(
    block,
    'UNINSTALL',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = 'app.uninstall(' + name_value + ');\n';
  return code;
};
JavaScript['app_openurl'] = function (block: any) {
  const name_value = JavaScript.valueToCode(
    block,
    'URL',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = 'app.openUrl(' + name_value + ');\n';
  return code;
};
JavaScript['app_send_email'] = function (block: any) {
  const name_value = JavaScript.valueToCode(
    block,
    'OPTIONS',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = 'app.sendEmail(' + name_value + ');\n';
  return code;
};
JavaScript['app_start_activitya'] = function (block: any) {
  const name_value = JavaScript.valueToCode(
    block,
    'ACTIVITY',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = 'app.startActivity(' + name_value + ');\n';
  return code;
};
