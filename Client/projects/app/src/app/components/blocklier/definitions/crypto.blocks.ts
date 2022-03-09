import { BlocklierArgumentReader } from '../models/blocklier-argument-reader.class';
import {
  BlocklierCustomBlock,
  BlocklierCustomBlockCode,
  BlocklierCustomBlockDefinition,
  BlocklierCustomBlockWithJavaScript,
} from '../models/blocklier-custom-block.class';
import { helpUrlBuilder } from './common';

const colour = '#88282a';
const helpUrl = helpUrlBuilder('crypto');

@BlocklierCustomBlock.register('crypto_digest')
export class CryptoDigestBlock
  extends BlocklierCustomBlock
  implements BlocklierCustomBlockWithJavaScript
{
  definition: BlocklierCustomBlockDefinition = {
    lines: [
      {
        message: '计算 %1 摘要 原文: %2',
        args: [
          {
            type: 'field_dropdown',
            name: 'ALGORITHM',
            options: [
              ['MD5', "'MD5'"],
              ['SHA-1', "'SHA-1'"],
              ['SHA-224', "'SHA-224'"],
              ['SHA-256', "'SHA-256'"],
              ['SHA-384', "'SHA-384'"],
              ['SHA-512', "'SHA-512'"],
            ],
          },
          { type: 'input_value', name: 'DATA', check: null },
        ],
      },
    ],
    output: null,
    colour,
    tooltip:
      '对数据data用算法algorithm计算消息摘要，数据data可以是文件、二进制、base64、hex、字符串等数据，解密后数据可以返回二进制、base64、hex、字符串或者直接写入到文件中',
    helpUrl: helpUrl('cryptodigestmessage-algorithm-options'),
  };

  toJavaScript(args: BlocklierArgumentReader): BlocklierCustomBlockCode {
    const data = args.code('DATA');
    const algorithm = args.value('ALGORITHM');
    return [`$crypto.digest(${data}, ${algorithm})`, 0];
  }
}

@BlocklierCustomBlock.register('crypto_encrypt')
export class CryptoEncryptBlock
  extends BlocklierCustomBlock
  implements BlocklierCustomBlockWithJavaScript
{
  definition: BlocklierCustomBlockDefinition = {
    lines: [
      {
        message: '用密钥 %1 对 %2 进行 %3 加密',
        args: [
          { type: 'input_value', name: 'KEY', check: 'Key' },
          { type: 'input_value', name: 'MESSAGE', check: null },
          {
            type: 'field_dropdown',
            name: 'ENCRYPT',
            options: [
              ['AES', "'AES'"],
              ['AES/ECB/NoPadding', "'AES/ECB/NoPadding'"],
              ['AES/ECB/PKCS5Padding', "'AES/ECB/PKCS5Padding'"],
              ['AES/CBC/NoPadding', "'AES/CBC/NoPadding'"],
              ['AES/CBC/PKCS5Padding', "'AES/CBC/PKCS5Padding'"],
              ['AES/CFB/NoPadding', "'AES/CFB/NoPadding'"],
              ['AES/CFB/PKCS5Padding', "'AES/CFB/PKCS5Padding'"],
              ['AES/CTR/NoPadding', "'AES/CTR/NoPadding'"],
              ['AES/CTR/PKCS5Padding', "'AES/CTR/PKCS5Padding'"],
              ['AES/OFB/PKCS5Padding', "'AES/OFB/PKCS5Padding'"],
              ['RSA/ECB/PKCS1Padding', "'RSA/ECB/PKCS1Padding'"],
              ['RSA/ECB/NoPadding', "'RSA/ECB/NoPadding'"],
            ],
          },
        ],
      },
    ],
    inputsInline: true,
    output: null,
    colour,
    tooltip:
      '使用密钥key对数据data用加密算法算法algorithm进行加密，数据data可以是文件、二进制、base64、hex、字符串等数据，加密后数据可以返回二进制、base64、hex、字符串或者直接写入到文件中',
    helpUrl: helpUrl('cryptoencryptdata-key-algorithm-options'),
  };

  toJavaScript(args: BlocklierArgumentReader): BlocklierCustomBlockCode {
    const key = args.code('KEY');
    const checked = args.value('ENCRYPT');
    const message = args.code('MESSAGE');
    return [`$crypto.encrypt(${message}, ${key}, ${checked})`, 0];
  }
}

@BlocklierCustomBlock.register('crypto_decrypt')
export class CryptoDecryptBlock
  extends BlocklierCustomBlock
  implements BlocklierCustomBlockWithJavaScript
{
  definition: BlocklierCustomBlockDefinition = {
    lines: [
      {
        message: '用密钥 %1 对 %2 进行 %3 解密',
        args: [
          { type: 'input_value', name: 'KEY', check: 'Key' },
          { type: 'input_value', name: 'MESSAGE', check: null },
          {
            type: 'field_dropdown',
            name: 'DECRYPT',
            options: [
              ['AES', "'AES'"],
              ['AES/ECB/NoPadding', "'AES/ECB/NoPadding'"],
              ['AES/ECB/PKCS5Padding', "'AES/ECB/PKCS5Padding'"],
              ['AES/CBC/NoPadding', "'AES/CBC/NoPadding'"],
              ['AES/CBC/PKCS5Padding', "'AES/CBC/PKCS5Padding'"],
              ['AES/CFB/NoPadding', "'AES/CFB/NoPadding'"],
              ['AES/CFB/PKCS5Padding', "'AES/CFB/PKCS5Padding'"],
              ['AES/CTR/NoPadding', "'AES/CTR/NoPadding'"],
              ['AES/CTR/PKCS5Padding', "'AES/CTR/PKCS5Padding'"],
              ['AES/OFB/PKCS5Padding', "'AES/OFB/PKCS5Padding'"],
              ['RSA/ECB/PKCS1Padding', "'RSA/ECB/PKCS1Padding'"],
              ['RSA/ECB/NoPadding', "'RSA/ECB/NoPadding'"],
            ],
          },
        ],
      },
    ],
    inputsInline: true,
    output: null,
    colour,
    tooltip:
      '使用密钥key对数据data用解密算法算法algorithm进行解密，数据data可以是文件、二进制、base64、hex、字符串等数据，解密后数据可以返回二进制、base64、hex、字符串或者直接写入到文件中',
    helpUrl: helpUrl('cryptoencryptdata-key-algorithm-options'),
  };

  toJavaScript(args: BlocklierArgumentReader): BlocklierCustomBlockCode {
    const key = args.code('KEY');
    const checked = args.value('DECRYPT');
    const message = args.code('MESSAGE');
    return [`$crypto.decrypt(${message}, ${key}, ${checked})`, 0];
  }
}

@BlocklierCustomBlock.register('crypto_generate_key_pir')
export class CryptoGenerateKeyPairBlock
  extends BlocklierCustomBlock
  implements BlocklierCustomBlockWithJavaScript
{
  definition: BlocklierCustomBlockDefinition = {
    lines: [
      {
        message: '生成一对 %1 算法的密钥对 长度 %2',
        args: [
          {
            type: 'field_dropdown',
            name: 'ALGORITHM',
            options: [
              ['DH', "'DH'"],
              ['DSA', "'DSA'"],
              ['EC', "'EC'"],
              ['RSA', "'RSA'"],
            ],
          },
          { type: 'input_value', name: 'LENGTH', check: 'Number' },
        ],
      },
    ],
    output: 'KeyPair',
    colour,
    tooltip:
      '生成一对密钥，包括公钥和私钥。例如在RSA加密算法中，我们可以用私钥加密，公钥解密做签名；或者公钥加密，私钥解密做数据加密',
    helpUrl: helpUrl('cryptogeneratekeypairalgorithm-length'),
  };

  toJavaScript(args: BlocklierArgumentReader): BlocklierCustomBlockCode {
    const algorithm = args.value('ALGORITHM');
    const length = args.code('LENGTH');
    return [`$crypto.generateKeyPair(${algorithm}, ${length})`, 0];
  }
}

@BlocklierCustomBlock.register('new_crypto_key')
export class CryptoNewKeyBlock
  extends BlocklierCustomBlock
  implements BlocklierCustomBlockWithJavaScript
{
  definition: BlocklierCustomBlockDefinition = {
    lines: [
      {
        message: '新建密钥 %1 ',
        args: [{ type: 'input_value', name: 'MESSAGE', check: null }],
      },
    ],
    output: 'Key',
    colour,
    tooltip: '构造函数，构造一个Key对象。',
    helpUrl: helpUrl('new-keydata-options'),
  };

  toJavaScript(args: BlocklierArgumentReader): BlocklierCustomBlockCode {
    const message = args.code('MESSAGE');
    return [`new $crypto.Key(${message})`, 0];
  }
}

@BlocklierCustomBlock.register('crypto_key_data')
export class CryptoKeyDataBlock
  extends BlocklierCustomBlock
  implements BlocklierCustomBlockWithJavaScript
{
  definition: BlocklierCustomBlockDefinition = {
    lines: [
      {
        message: '获取密钥 %1 的二进制数据',
        args: [{ type: 'input_value', name: 'KEY', check: 'Key' }],
      },
    ],
    output: 'Key',
    colour,
    tooltip: '获取密钥的二进制数据。',
    helpUrl: helpUrl('keydata'),
  };

  toJavaScript(args: BlocklierArgumentReader): BlocklierCustomBlockCode {
    const key = args.code('KEY');
    return [`${key}.data`, 0];
  }
}

@BlocklierCustomBlock.register('crypto_keypair_public')
export class CryptoKeypairPublicBlock
  extends BlocklierCustomBlock
  implements BlocklierCustomBlockWithJavaScript
{
  definition: BlocklierCustomBlockDefinition = {
    lines: [
      {
        message: '获取密钥对 %1 的公钥',
        args: [{ type: 'input_value', name: 'KEY', check: 'KeyPair' }],
      },
    ],
    output: 'Key',
    colour,
    tooltip: '获取密钥对的公钥。',
    helpUrl: helpUrl('keydata'),
  };

  toJavaScript(args: BlocklierArgumentReader): BlocklierCustomBlockCode {
    const key = args.code('KEY');
    return [`${key}.publicKey`, 0];
  }
}

@BlocklierCustomBlock.register('crypto_keypair_private')
export class CryptoKeypairPrivateBlock
  extends BlocklierCustomBlock
  implements BlocklierCustomBlockWithJavaScript
{
  definition: BlocklierCustomBlockDefinition = {
    lines: [
      {
        message: '获取密钥对 %1 的私钥',
        args: [{ type: 'input_value', name: 'KEY', check: 'KeyPair' }],
      },
    ],
    output: 'Key',
    colour,
    tooltip: '获取密钥对的私钥。',
    helpUrl: helpUrl('keydata'),
  };

  toJavaScript(args: BlocklierArgumentReader): BlocklierCustomBlockCode {
    const key = args.code('KEY');
    return [`${key}.privateKey`, 0];
  }
}

@BlocklierCustomBlock.register('new_key_pair')
export class CryptoNewKeyPairBlock
  extends BlocklierCustomBlock
  implements BlocklierCustomBlockWithJavaScript
{
  definition: BlocklierCustomBlockDefinition = {
    lines: [
      {
        message: '新建密钥对 公钥: %1  私钥: %2 ',
        args: [
          { type: 'input_value', name: 'PUBLIC', check: null },
          { type: 'input_value', name: 'PRIVATE', check: null, align: 'right' },
        ],
      },
    ],
    inputsInline: false,
    output: 'KeyPair',
    colour,
    tooltip: '构造函数，构造一个KeyPair对象。',
    helpUrl: helpUrl('new-keypairpublickey-privatekey-options'),
  };

  toJavaScript(args: BlocklierArgumentReader): BlocklierCustomBlockCode {
    const publicKey = args.code('PUBLIC');
    const privateKey = args.code('PRIVATE');
    return `new $crypto.KeyPair(${publicKey}, ${privateKey})`;
  }
}
