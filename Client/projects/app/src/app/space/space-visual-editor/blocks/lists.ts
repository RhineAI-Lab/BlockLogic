import { Blockly } from 'ngx-blockly';

Blockly.defineBlocksWithJsonArray([
  {
    type: 'lists_get',
    message0: '列表 %1 第 %2 项',
    output: null,
    style: 'list_blocks',
    args0: [
      { type: 'input_value', name: 'ARRAY', check: 'Array' },
      { type: 'input_value', name: 'INDEX', check: 'Number' },
    ],
    tooltip: '获取列表第指定项',
  },
  {
    type: 'lists_set',
    message0: '设置列表 %1 第 %2 项 为 %3',
    previousStatement: null,
    nextStatement: null,
    style: 'list_blocks',
    args0: [
      { type: 'input_value', name: 'ARRAY', check: 'Array' },
      { type: 'input_value', name: 'INDEX', check: 'Number' },
      { type: 'input_value', name: 'VALUE', check: null },
    ],
    inputsInline: true,
    tooltip: '设置列表第某项的值',
  },
]);
