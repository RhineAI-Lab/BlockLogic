import { Blockly } from 'ngx-blockly';

Blockly.defineBlocksWithJsonArray([
  {
    type: 'text_to_int',
    message0: '转整数 %1',
    args0: [{ type: 'input_value', name: 'STR', check: 'String' }],
    output: 'Number',
    style: 'text_blocks',
    tooltip: '将字符串转为整数。',
  },
  {
    type: 'text_to_float',
    message0: '转小数 %1',
    args0: [{ type: 'input_value', name: 'STR', check: 'String' }],
    output: 'Number',
    style: 'text_blocks',
    tooltip: '将字符串转为小数。',
  },
  {
    type: 'number_to_text',
    message0: '转文字 %1',
    args0: [{ type: 'input_value', name: 'NUM', check: 'Number' }],
    output: 'String',
    style: 'text_blocks',
    tooltip: '将数字转为字符串。',
  },
]);
