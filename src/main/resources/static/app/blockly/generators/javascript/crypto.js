'use strict';

goog.provide('Blockly.JavaScript.crypto');
goog.require('Blockly.JavaScript');

Blockly.JavaScript['crypto_digest'] = function(block) {
    var value =Blockly.JavaScript.valueToCode(block,'DATA',Blockly.JavaScript.ORDER_ATOMIC,true);
    var value2 = block.getFieldValue('ALGORITHM');
    var code = "$crypto.digest("+value+","+value2+")";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript['crypto_encrypt'] = function(block) {
    var value = Blockly.JavaScript.valueToCode(block,'KEY',Blockly.JavaScript.ORDER_ATOMIC,true);
    var checked = block.getFieldValue('ENCRYPT');
    var value2 = Blockly.JavaScript.valueToCode(block,'MESSAGE',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = "$crypto.encrypt("+value2+","+value+","+checked+")";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript['crypto_decrypt'] = function(block) {
    var value = Blockly.JavaScript.valueToCode(block,'KEY',Blockly.JavaScript.ORDER_ATOMIC,true);
    var checked = block.getFieldValue('DECRYPT');
    var value2 = Blockly.JavaScript.valueToCode(block,'MESSAGE',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = "$crypto.decrypt("+value2+","+value+","+checked+")";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript['crypto_generate_key_pair'] = function(block) {
    var value = block.getFieldValue('ALGORITHM');
    var value2 = Blockly.JavaScript.valueToCode(block,'LENGTH',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = "$crypto.generateKeyPair("+value+","+value2+")";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript['new_crypto_key'] = function(block) {
    var value = Blockly.JavaScript.valueToCode(block,'MESSAGE',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = "new $crypto.Key("+value+")";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript['crypto_key_data'] = function(block) {
    var value = Blockly.JavaScript.valueToCode(block,'KEY',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = value+".data";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript['crypto_keypair_public'] = function(block) {
    var value = Blockly.JavaScript.valueToCode(block,'KEY',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = value+".publicKey";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript['crypto_keypair_private'] = function(block) {
    var value = Blockly.JavaScript.valueToCode(block,'KEY',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = value+".privateKey";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript['new_key_pair'] = function(block) {
    var value = Blockly.JavaScript.valueToCode(block,'PUBLIC',Blockly.JavaScript.ORDER_ATOMIC,true);
    var value2 = Blockly.JavaScript.valueToCode(block,'PRIVATE',Blockly.JavaScript.ORDER_ATOMIC,true);
    var code = "new $crypto.KeyPair("+value+","+value2+")";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
