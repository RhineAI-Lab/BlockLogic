import * as Blockly from 'blockly';

const colour = '#999999';

Blockly.defineBlocksWithJsonArray([
  {
    type: 'puzzle',
    message0: '%1',
    args0: [{ type: 'input_value', name: 'VALUE' }],
    previousStatement: null,
    nextStatement: null,
    colour: colour,
    tooltip: '用于将属性块封装成语句',
  },
  {
    type: 'explain',
    message0: '注释 %1',
    args0: [{ type: 'field_input', name: 'TEXT', text: '' }],
    previousStatement: null,
    nextStatement: null,
    colour: '#555555',
    tooltip: '单行注释',
  },
  {
    type: 'explain_multi',
    message0: '多行注释 %1',
    args0: [{ type: 'field_multilinetext', name: 'TEXT', text: '' }],
    previousStatement: null,
    nextStatement: null,
    colour: '#555555',
    tooltip: '多行注释',
  },
  {
    type: 'puzzle_block_attr',
    message0: '%1',
    args0: [{ type: 'field_multilinetext', name: 'TEXT', text: '' }],
    output: null,
    colour: colour,
    tooltip: '自定义有参代码块',
  },
  {
    type: 'puzzle_block',
    message0: '%1',
    args0: [{ type: 'field_multilinetext', name: 'TEXT', text: '' }],
    previousStatement: null,
    nextStatement: null,
    colour: colour,
    tooltip: '自定义代码块',
  },
]);
