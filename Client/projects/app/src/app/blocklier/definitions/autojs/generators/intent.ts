import { JavaScript } from '../../_common';

JavaScript['intent_intent'] = function (block: any) {
  const name_value = JavaScript.valueToCode(
    block,
    'INTENT',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = 'app.intent(' + name_value + ');\n';
  return code;
};
JavaScript['intent_start_activity'] = function (block: any) {
  const name_value = JavaScript.valueToCode(
    block,
    'START',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = 'app.startActivity(' + name_value + ');\n';
  return code;
};
JavaScript['intent_send_broadcast'] = function (block: any) {
  const name_value = JavaScript.valueToCode(
    block,
    'SEND',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = 'app.sendBroadcast(' + name_value + ');\n';
  return code;
};
JavaScript['intent_start_service'] = function (block: any) {
  const name_value = JavaScript.valueToCode(
    block,
    'SERVICE',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = 'app.startService(' + name_value + ');\n';
  return code;
};
JavaScript['intent_send_broadcast_by_name'] = function (block: any) {
  const name_value = JavaScript.valueToCode(
    block,
    'CAST',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = 'app.sendBroadcast(' + name_value + ');\n';
  return code;
};
JavaScript['intent_intent_to_shell'] = function (block: any) {
  const name_value = JavaScript.valueToCode(
    block,
    'SHELL',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = 'app.intentToShell(' + name_value + ');\n';
  return code;
};
JavaScript['intent_parse_uri'] = function (block: any) {
  const name_value = JavaScript.valueToCode(
    block,
    'URI',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = 'app.parseUri(' + name_value + ');\n';
  return code;
};
JavaScript['intent_get_uri_for_file'] = function (block: any) {
  const name_value = JavaScript.valueToCode(
    block,
    'FORFILE',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = 'app.getUriForFile(' + name_value + ');\n';
  return code;
};
JavaScript['intent_get_installed_apps'] = function (block: any) {
  const name_value = JavaScript.valueToCode(
    block,
    'INSTALL',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = 'app.getInstalledApps(' + name_value + ');\n';
  return code;
};
