import * as Blockly from 'blockly';

const style = 'puzzle_blocks';
const style2 = 'notes_blocks';

Blockly.defineBlocksWithJsonArray([
  {
    type: 'puzzle',
    message0: '%1',
    args0: [{ type: 'input_value', name: 'VALUE' }],
    previousStatement: null,
    nextStatement: null,
    style: style,
    tooltip: '用于将属性块封装成语句',
  },
  {
    type: 'explain',
    message0: '注释 %1',
    args0: [{ type: 'field_input', name: 'TEXT', text: '' }],
    previousStatement: null,
    nextStatement: null,
    style: style2,
    tooltip: '单行注释',
  },
  {
    type: 'explain_multi',
    message0: '多行注释 %1',
    args0: [{ type: 'field_multilinetext', name: 'TEXT', text: '' }],
    previousStatement: null,
    nextStatement: null,
    style: style2,
    tooltip: '多行注释',
  },
  {
    type: 'puzzle_block_attr',
    message0: '%1',
    args0: [{ type: 'field_multilinetext', name: 'TEXT', text: '' }],
    output: null,
    style: style,
    tooltip: '自定义有参代码块',
  },
  {
    type: 'puzzle_block',
    message0: '%1',
    args0: [{ type: 'field_multilinetext', name: 'TEXT', text: '' }],
    previousStatement: null,
    nextStatement: null,
    style: style,
    tooltip: '自定义代码块',
  },
]);
