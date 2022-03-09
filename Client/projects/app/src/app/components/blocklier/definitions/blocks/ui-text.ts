import * as Blockly from 'blockly';

const colour = '#3c2eaf';
const baseHelpUrl = 'https://pro.autojs.org/docs/#/zh-cn/ui?id=';

Blockly.defineBlocksWithJsonArray([
  {
    type: 'ui_text_set_text',
    message0: '设置控件 %1 文本 %2',
    args0: [
      { type: 'field_input', name: 'ID', text: 'id' },
      { type: 'input_value', name: 'TEXT', check: 'String' },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: colour,
    tooltip: '设置文本控件文本',
    helpUrl: baseHelpUrl + 'attrname-value',
  },
]);
