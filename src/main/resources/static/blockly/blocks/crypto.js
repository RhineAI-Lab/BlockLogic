'use strict';

goog.provide('Blockly.Blocks.Crypto');  // Deprecated
goog.provide('Blockly.Constants.Crypto');

goog.require('Blockly');
goog.require('Blockly.Blocks');
goog.require('Blockly.FieldDropdown');
goog.require('Blockly.FieldLabel');
goog.require('Blockly.Mutator');

var colour = "#88282a";
var baseHelpUrl = "https://pro.autojs.org/docs/#/zh-cn/crypto?id=";

Blockly.defineBlocksWithJsonArray([
    {
        "type": "crypto_digest",
        "message0": "计算 %1 摘要 原文: %2",
        "args0":[
            {"type":"field_dropdown","name":"ALGORITHM","options":[["MD5","'MD5'"],["SHA-1","'SHA-1'"],["SHA-224","'SHA-224'"],["SHA-256","'SHA-256'"],["SHA-384","'SHA-384'"],["SHA-512","'SHA-512'"]]},
            {"type":"input_value","name":"DATA","check":null}
        ],
        "output":null,
        "colour": colour,
        "tooltip":"对数据data用算法algorithm计算消息摘要，数据data可以是文件、二进制、base64、hex、字符串等数据，解密后数据可以返回二进制、base64、hex、字符串或者直接写入到文件中",
        "helpUrl": baseHelpUrl+"cryptodigestmessage-algorithm-options"
    },{
        "type": "crypto_encrypt",
        "message0": "用密钥 %1 对 %2 进行 %3 加密",
        "args0":[
            {"type":"input_value","name":"KEY","check":"Key"},
            {"type":"input_value","name":"MESSAGE","check":null},
            {"type":"field_dropdown","name":"ENCRYPT","options":[["AES","'AES'"],["AES/ECB/NoPadding","'AES/ECB/NoPadding'"],["AES/ECB/PKCS5Padding","'AES/ECB/PKCS5Padding'"],["AES/CBC/NoPadding","'AES/CBC/NoPadding'"],["AES/CBC/PKCS5Padding","'AES/CBC/PKCS5Padding'"],["AES/CFB/NoPadding","'AES/CFB/NoPadding'"],["AES/CFB/PKCS5Padding","'AES/CFB/PKCS5Padding'"],["AES/CTR/NoPadding","'AES/CTR/NoPadding'"],["AES/CTR/PKCS5Padding","'AES/CTR/PKCS5Padding'"],["AES/OFB/PKCS5Padding","'AES/OFB/PKCS5Padding'"],["RSA/ECB/PKCS1Padding","'RSA/ECB/PKCS1Padding'"],["RSA/ECB/NoPadding","'RSA/ECB/NoPadding'"]]},
        ],
        "inputsInline":true,
        "output":null,
        "colour": colour,
        "tooltip":"使用密钥key对数据data用加密算法算法algorithm进行加密，数据data可以是文件、二进制、base64、hex、字符串等数据，加密后数据可以返回二进制、base64、hex、字符串或者直接写入到文件中",
        "helpUrl": baseHelpUrl+"cryptoencryptdata-key-algorithm-options"
    },{
        "type": "crypto_decrypt",
        "message0": "用密钥 %1 对 %2 进行 %3 解密",
        "args0":[
            {"type":"input_value","name":"KEY","check":"Key"},
            {"type":"input_value","name":"MESSAGE","check":null},
            {"type":"field_dropdown","name":"DECRYPT","options":[["AES","'AES'"],["AES/ECB/NoPadding","'AES/ECB/NoPadding'"],["AES/ECB/PKCS5Padding","'AES/ECB/PKCS5Padding'"],["AES/CBC/NoPadding","'AES/CBC/NoPadding'"],["AES/CBC/PKCS5Padding","'AES/CBC/PKCS5Padding'"],["AES/CFB/NoPadding","'AES/CFB/NoPadding'"],["AES/CFB/PKCS5Padding","'AES/CFB/PKCS5Padding'"],["AES/CTR/NoPadding","'AES/CTR/NoPadding'"],["AES/CTR/PKCS5Padding","'AES/CTR/PKCS5Padding'"],["AES/OFB/PKCS5Padding","'AES/OFB/PKCS5Padding'"],["RSA/ECB/PKCS1Padding","'RSA/ECB/PKCS1Padding'"],["RSA/ECB/NoPadding","'RSA/ECB/NoPadding'"]]},
        ],
        "inputsInline":true,
        "output":null,
        "colour": colour,
        "tooltip":"使用密钥key对数据data用解密算法算法algorithm进行解密，数据data可以是文件、二进制、base64、hex、字符串等数据，解密后数据可以返回二进制、base64、hex、字符串或者直接写入到文件中",
        "helpUrl": baseHelpUrl+"cryptoencryptdata-key-algorithm-options"
    },{
        "type": "crypto_generate_key_pair",
        "message0": "生成一对 %1 算法的密钥对 长度 %2",
        "args0":[
            {"type":"field_dropdown","name":"ALGORITHM","options":[["DH","'DH'"],["DSA","'DSA'"],["EC","'EC'"],["RSA","'RSA'"]]},
            {"type":"input_value","name":"LENGTH","check":"Number"},
        ],
        "output":"KeyPair",
        "colour": colour,
        "tooltip":"生成一对密钥，包括公钥和私钥。例如在RSA加密算法中，我们可以用私钥加密，公钥解密做签名；或者公钥加密，私钥解密做数据加密",
        "helpUrl": baseHelpUrl+"cryptogeneratekeypairalgorithm-length"
    },{
        "type": "new_crypto_key",
        "message0": "新建密钥 %1 ",
        "args0":[
            {"type":"input_value","name":"MESSAGE","check":null},
        ],
        "output":"Key",
        "colour": colour,
        "tooltip":"构造函数，构造一个Key对象。",
        "helpUrl": baseHelpUrl+"new-keydata-options"
    },{
        "type": "crypto_key_data",
        "message0": "获取密钥 %1 的二进制数据",
        "args0":[
            {"type":"input_value","name":"KEY","check":"Key"},
        ],
        "output":"Key",
        "colour": colour,
        "tooltip":"获取密钥的二进制数据。",
        "helpUrl": baseHelpUrl+"keydata"
    },{
        "type": "crypto_keypair_private",
        "message0": "获取密钥对 %1 的公钥",
        "args0":[
            {"type":"input_value","name":"KEY","check":"KeyPair"},
        ],
        "output":"Key",
        "colour": colour,
        "tooltip":"获取密钥对的公钥。",
        "helpUrl": baseHelpUrl+"keydata"
    },{
        "type": "crypto_keypair_public",
        "message0": "获取密钥 %1 的私钥",
        "args0":[
            {"type":"input_value","name":"KEY","check":"KeyPair"},
        ],
        "output":"Key",
        "colour": colour,
        "tooltip":"获取密钥对的私钥。",
        "helpUrl": baseHelpUrl+"keydata"
    },{
        "type": "new_key_pair",
        "message0": "新建密钥对 公钥: %1  私钥: %2 ",
        "args0":[
            {"type":"input_value","name":"PUBLIC","check":null},
            {"type":"input_value","name":"PRIVATE","check":null,"align":"right"},
        ],
        "inputsInline":false,
        "output":"KeyPair",
        "colour": colour,
        "tooltip":"构造函数，构造一个KeyPair对象。",
        "helpUrl": baseHelpUrl+"new-keypairpublickey-privatekey-options"
    },
]);
