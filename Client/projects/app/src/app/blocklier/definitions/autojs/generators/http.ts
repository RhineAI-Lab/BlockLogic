import { connectNecessaryArgs, JavaScript } from '../../_common';

JavaScript['http_get'] = function (block: any) {
  const url = JavaScript.valueToCode(
    block,
    'URL',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const options = JavaScript.valueToCode(
    block,
    'OPTIONS',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const call_back = JavaScript.valueToCode(
    block,
    'CALLBACK',
    JavaScript.ORDER_FUNCTION_CALL,
    true,
  );
  const code =
    'http.get(' + url + connectNecessaryArgs([options, call_back]) + ')';
  return [code, JavaScript.ORDER_ATOMIC];
};
JavaScript['http_post'] = function (block: any) {
  const url = JavaScript.valueToCode(
    block,
    'URL',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const data =
    JavaScript.valueToCode(block, 'DATA', JavaScript.ORDER_ATOMIC, true) ||
    "''";
  const options = JavaScript.valueToCode(
    block,
    'OPTIONS',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const call_back = JavaScript.valueToCode(
    block,
    'CALLBACK',
    JavaScript.ORDER_FUNCTION_CALL,
    true,
  );
  const code =
    'http.post(' +
    url +
    ',' +
    data +
    connectNecessaryArgs([options, call_back]) +
    ')';
  return [code, JavaScript.ORDER_ATOMIC];
};
JavaScript['http_post_json'] = function (block: any) {
  const url = JavaScript.valueToCode(
    block,
    'URL',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const data =
    JavaScript.valueToCode(block, 'DATA', JavaScript.ORDER_ATOMIC, true) ||
    "''";
  const options = JavaScript.valueToCode(
    block,
    'OPTIONS',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const call_back = JavaScript.valueToCode(
    block,
    'CALLBACK',
    JavaScript.ORDER_FUNCTION_CALL,
    true,
  );
  const code =
    'http.postJson(' +
    url +
    ',' +
    data +
    connectNecessaryArgs([options, call_back]) +
    ')';
  return [code, JavaScript.ORDER_ATOMIC];
};
JavaScript['http_post_multipart'] = function (block: any) {
  const url = JavaScript.valueToCode(
    block,
    'URL',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const data =
    JavaScript.valueToCode(block, 'DATA', JavaScript.ORDER_ATOMIC, true) ||
    "''";
  const options = JavaScript.valueToCode(
    block,
    'OPTIONS',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const call_back = JavaScript.valueToCode(
    block,
    'CALLBACK',
    JavaScript.ORDER_FUNCTION_CALL,
    true,
  );
  const code =
    'http.postMultipart(' +
    url +
    ',' +
    data +
    connectNecessaryArgs([options, call_back]) +
    ')';
  return [code, JavaScript.ORDER_ATOMIC];
};
JavaScript['http_request'] = function (block: any) {
  const url = JavaScript.valueToCode(
    block,
    'URL',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const options = JavaScript.valueToCode(
    block,
    'DATA',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const call_back = JavaScript.valueToCode(
    block,
    'CALLBACK',
    JavaScript.ORDER_FUNCTION_CALL,
    true,
  );
  const code =
    'http.request(' + url + connectNecessaryArgs([options, call_back]) + ')';
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['http_options_container'] = function (block: any) {
  let branch = JavaScript.statementToCode(block, 'OPTIONS');
  branch = JavaScript.addLoopTrap(branch, block);
  return ['{\n' + branch + '}', JavaScript.ORDER_ATOMIC];
};

JavaScript['http_option_headers'] = function (block: any) {
  const headers = JavaScript.valueToCode(
    block,
    'VALUE',
    JavaScript.ORDER_ATOMIC,
  );
  return 'headers:' + headers + ',\n';
};

JavaScript['http_option_method'] = function (block: {
  getFieldValue: (arg0: string) => any;
}) {
  const VALUE = block.getFieldValue('VALUE');
  return "method:'" + VALUE + "',\n";
};

JavaScript['http_option_content_type'] = function (block: any) {
  const VALUE = JavaScript.valueToCode(block, 'VALUE', JavaScript.ORDER_ATOMIC);
  return 'contentType:' + VALUE + ',\n';
};

JavaScript['http_option_body'] = function (block: any) {
  const VALUE = JavaScript.valueToCode(block, 'VALUE', JavaScript.ORDER_ATOMIC);
  return 'body:' + VALUE + ',\n';
};

JavaScript['http_response'] = function (block: {
  getFieldValue: (arg0: string) => any;
}) {
  const value = block.getFieldValue('VALUE');
  const response =
    JavaScript.valueToCode(block, 'RES', JavaScript.ORDER_ATOMIC) || '';
  const code = response + '.' + value;
  return [code, JavaScript.ORDER_MEMBER];
};
