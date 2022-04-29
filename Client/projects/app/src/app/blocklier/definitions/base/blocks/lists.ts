import * as Blockly from 'blockly';

const colour = '#797CDA';
const baseHelpUrl = '';

Blockly.defineBlocksWithJsonArray([
  {
    type: 'lists_new_coll',
    message0: '创建空 %1 ',
    args0: [
      {
        type: 'field_dropdown',
        name: 'MODE',
        options: [
          ['列表', 'list'],
          ['字典', 'Map'],
          ['元组', 'Tuple'],
        ],
      },
    ],
    inputsInline: true,
    output: ['Array', 'Map', 'Tuple'],
    colour: colour,
    tooltip: '创建新列表、字典、元组',
    helpUrl: baseHelpUrl + '',
  },
]);

Blockly.defineBlocksWithJsonArray([
  {
    type: 'lists_indexOf_new',
    message0: '在 %1 中查找 %2 出现的 %3',
    args0: [
      { type: 'input_value', name: 'LIST', check: 'Array' },
      { type: 'field_dropdown', name: 'MODE', options: [
        ['第一次', 'FIRST'],
        ['最后一次', 'LAST'],
        ] },
      { type: 'input_value', name: 'VALUE', check: null },
    ],
    inputsInline: true,
    output: 'Number',
    colour: colour,
    tooltip: '在列表中查找指定元素的索引',
    helpUrl: baseHelpUrl + '',
  },
]);

Blockly.defineBlocksWithJsonArray([
  {
    type: 'lists_getIndex_new',
    message0: '在 %1 中 %2 第 %3 项',
    args0: [
      { type: 'input_value', name: 'LIST', check: 'Array' },
      { type: 'field_dropdown', name: 'MODE', options: [
          ['取得', 'GET'],
          ['移除', 'DEL'],
        ] },
      { type: 'input_value', name: 'INDEX', check: 'Number' },
    ],
    inputsInline: true,
    output: 'Number',
    colour: colour,
    tooltip: '在列表中获取或删除指定索引的元素',
    helpUrl: baseHelpUrl + '',
  },
]);
