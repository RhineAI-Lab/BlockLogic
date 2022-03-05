import { Blockly } from 'ngx-blockly';

const colour = '#90b01f';
const baseHelpUrl =
  'https://pro.autojs.org/docs/#/zh-cn/widgetsBasedAutomation?id=';

Blockly.defineBlocksWithJsonArray([
  {
    type: 'simple_click',
    message0: '点击第 %1 个文本包含 %2 的控件',
    args0: [
      { type: 'input_value', name: 'I', check: 'Number' },
      { type: 'input_value', name: 'TEXT', check: 'String' },
    ],
    inputsInline: true,
    output: 'Boolean',
    colour: colour,
    tooltip: '点击包含指定文本的控件，返回是否成功，第一项填-1则点击全部',
    helpUrl: baseHelpUrl + 'clicktext-i',
  },
  {
    type: 'simple_long_click',
    message0: '长按第 %1 个文本包含 %2 的控件',
    args0: [
      { type: 'input_value', name: 'I', check: 'Number' },
      { type: 'input_value', name: 'TEXT', check: 'String' },
    ],
    inputsInline: true,
    output: 'Boolean',
    colour: colour,
    tooltip: '长按包含指定文本的控件，返回是否成功，第一项填-1则长按全部',
    helpUrl: baseHelpUrl + 'longclicktext-i',
  },
  {
    type: 'simple_scroll_up',
    message0: '向左/上滑动第 %1 个文本包含 %2 的控件',
    args0: [
      { type: 'input_value', name: 'I', check: 'Number' },
      { type: 'input_value', name: 'TEXT', check: 'String' },
    ],
    inputsInline: true,
    output: 'Boolean',
    colour: colour,
    tooltip:
      '向左/上滑动包含指定文本的控件，返回是否成功，第一项填-1则向左/上滑动全部',
    helpUrl: baseHelpUrl + 'scrollupi',
  },
  {
    type: 'simple_scroll_down',
    message0: '向右/下滑动第 %1 个文本包含 %2 的控件',
    args0: [
      { type: 'input_value', name: 'I', check: 'Number' },
      { type: 'input_value', name: 'TEXT', check: 'String' },
    ],
    inputsInline: true,
    output: 'Boolean',
    colour: colour,
    tooltip:
      '向右/下滑动全部包含指定文本的控件，返回是否成功，第一项填-1则向右/下滑动全部',
    helpUrl: baseHelpUrl + 'scrolldowni',
  },
  {
    type: 'simple_set_text',
    message0: '设置第 %1 个输入框的文本为 %2',
    args0: [
      { type: 'input_value', name: 'I', check: 'Number' },
      { type: 'input_value', name: 'TEXT', check: 'String' },
    ],
    inputsInline: true,
    output: 'Boolean',
    colour: colour,
    tooltip: '设置文本框文本，返回是否成功，第一项填-1则设置全部',
    helpUrl: baseHelpUrl + 'settexti-text',
  },
  {
    type: 'simple_input',
    message0: '向第 %1 个输入框追加文本 %2',
    args0: [
      { type: 'input_value', name: 'I', check: 'Number' },
      { type: 'input_value', name: 'TEXT', check: 'String' },
    ],
    inputsInline: true,
    output: 'Boolean',
    colour: colour,
    tooltip: '追加文本框文本，返回是否成功，第一项填-1则操作全部',
    helpUrl: baseHelpUrl + 'inputi-text',
  },
]);
