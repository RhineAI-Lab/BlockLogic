import * as Blockly from 'blockly';

const colour = '#3c2eaf';
const baseHelpUrl = 'https://pro.autojs.org/docs/#/zh-cn/ui?id=';

Blockly.defineBlocksWithJsonArray([
  {
    type: 'ui_btn_on_click',
    message0: '当控件 %1 被点击',
    message1: ' %1',
    args0: [{ type: 'field_input', name: 'ID', text: 'id' }],
    args1: [{ type: 'input_statement', name: 'STAT' }],
    previousStatement: null,
    nextStatement: null,
    colour: colour,
    tooltip: '当控件被点击时运行',
    helpUrl: baseHelpUrl + 'attrname-value',
  },
]);
