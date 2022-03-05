import { JavaScript } from './_common';

JavaScript['crypto_digest'] = function (block: {
  getFieldValue: (arg0: string) => any;
}) {
  const value = JavaScript.valueToCode(
    block,
    'DATA',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const value2 = block.getFieldValue('ALGORITHM');
  const code = '$crypto.digest(' + value + ',' + value2 + ')';
  return [code, JavaScript.ORDER_ATOMIC];
};
JavaScript['crypto_encrypt'] = function (block: {
  getFieldValue: (arg0: string) => any;
}) {
  const value = JavaScript.valueToCode(
    block,
    'KEY',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const checked = block.getFieldValue('ENCRYPT');
  const value2 = JavaScript.valueToCode(
    block,
    'MESSAGE',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = '$crypto.encrypt(' + value2 + ',' + value + ',' + checked + ')';
  return [code, JavaScript.ORDER_ATOMIC];
};
JavaScript['crypto_decrypt'] = function (block: {
  getFieldValue: (arg0: string) => any;
}) {
  const value = JavaScript.valueToCode(
    block,
    'KEY',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const checked = block.getFieldValue('DECRYPT');
  const value2 = JavaScript.valueToCode(
    block,
    'MESSAGE',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = '$crypto.decrypt(' + value2 + ',' + value + ',' + checked + ')';
  return [code, JavaScript.ORDER_ATOMIC];
};
JavaScript['crypto_generate_key_pair'] = function (block: {
  getFieldValue: (arg0: string) => any;
}) {
  const value = block.getFieldValue('ALGORITHM');
  const value2 = JavaScript.valueToCode(
    block,
    'LENGTH',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = '$crypto.generateKeyPair(' + value + ',' + value2 + ')';
  return [code, JavaScript.ORDER_ATOMIC];
};
JavaScript['new_crypto_key'] = function (block: any) {
  const value = JavaScript.valueToCode(
    block,
    'MESSAGE',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = 'new $crypto.Key(' + value + ')';
  return [code, JavaScript.ORDER_ATOMIC];
};
JavaScript['crypto_key_data'] = function (block: any) {
  const value = JavaScript.valueToCode(
    block,
    'KEY',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = value + '.data';
  return [code, JavaScript.ORDER_ATOMIC];
};
JavaScript['crypto_keypair_public'] = function (block: any) {
  const value = JavaScript.valueToCode(
    block,
    'KEY',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = value + '.publicKey';
  return [code, JavaScript.ORDER_ATOMIC];
};
JavaScript['crypto_keypair_private'] = function (block: any) {
  const value = JavaScript.valueToCode(
    block,
    'KEY',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = value + '.privateKey';
  return [code, JavaScript.ORDER_ATOMIC];
};
JavaScript['new_key_pair'] = function (block: any) {
  const value = JavaScript.valueToCode(
    block,
    'PUBLIC',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const value2 = JavaScript.valueToCode(
    block,
    'PRIVATE',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = 'new $crypto.KeyPair(' + value + ',' + value2 + ')';
  return [code, JavaScript.ORDER_ATOMIC];
};
