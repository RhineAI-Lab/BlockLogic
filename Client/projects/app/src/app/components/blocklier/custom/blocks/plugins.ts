import { Blockly } from 'ngx-blockly';

const colour = '#e5af00';
const baseHelpUrl = 'https://pro.autojs.org/docs/#/zh-cn/app?id=';

Blockly.defineBlocksWithJsonArray([
  {
    type: '$plugins_load',
    message0: '加载插件 %1 ',
    previousStatement: null,
    nextStatement: null,
    args0: [{ type: 'input_value', name: 'LOAD', check: 'String' }],
    colour: colour,
    tooltip:
      '加载一个插件，返回插件模块中module.exports导出的对象。如果插件未安装，抛出PluginLoadException异常。',
    helpUrl: baseHelpUrl + 'pluginsloadpackagename',
  },
]);
