import * as Blockly from 'blockly';

export class BlocklierTheme {
  static theme = Blockly.Theme.defineTheme('b-base', {
    base: 'classic',
    blockStyles: {
      default_blocks: {
        colourPrimary: '#38b793',
      },
      logic_blocks: {
        colourPrimary: '#45a92d',
      },
      loop_blocks: {
        colourPrimary: '#487ce3',
      },
      math_blocks: {
        colourPrimary: '#3d98e3',
      },
      text_blocks: {
        colourPrimary: '#e07d35',
      },
      list_blocks: {
        colourPrimary: '#38b793',
      },
      class_blocks: {
        colourPrimary: '#7052e3',
      },
      colour_blocks: {
        colourPrimary: '#939393',
      },
      variable_blocks: {
        colourPrimary: '#e35881',
      },
      variable_dynamic_blocks: {
        colourPrimary: '#e35881',
      },
      procedure_blocks: {
        colourPrimary: '#dc6161',
      },
      module_blocks: {
        colourPrimary: '#f85c5c',
      },
      layer_blocks: {
        colourPrimary: '#ff7a41',
      },
      transforms_blocks: {
        colourPrimary: '#38b793',
      },
      learner_blocks: {
        colourPrimary: '#5360ee',
      },
    },
  });

  static themeLight = Blockly.Theme.defineTheme('b-light', {
    base: 'b-base',
    flyoutForegroundColour: '#2b2b2b',
  });

  static themeDark = Blockly.Theme.defineTheme('b-dark', {
    base: 'b-base',
    componentStyles: {
      workspaceBackgroundColour: '#1e1e1e',
      flyoutBackgroundColour: '#2b2c2d',
      flyoutForegroundColour: '#c6c6c6',
      scrollbarColour: '#666',
    },
  });
}

function getColorFromTheme(key: string): string {
  const style = BlocklierTheme.theme.blockStyles[key + '_blocks'];
  return style ? style.colourPrimary : '#aaaaaa';
}
export const colorMap = new Map<string, string>();
colorMap.set('常用语句', '#888888');
colorMap.set('循环', getColorFromTheme('loop'));
colorMap.set('变量', getColorFromTheme('variable'));
colorMap.set('函数', getColorFromTheme('procedure'));
colorMap.set('逻辑', getColorFromTheme('logic'));
colorMap.set('数学', getColorFromTheme('math'));
colorMap.set('文本', getColorFromTheme('text'));
colorMap.set('集合', getColorFromTheme('list'));
colorMap.set('对象', getColorFromTheme('class'));
colorMap.set('自定义块', '#aaaaaa');
colorMap.set('数据增强', getColorFromTheme('transforms'));
colorMap.set('模型定义', getColorFromTheme('module'));
colorMap.set('内置模型/层', getColorFromTheme('layer'));
colorMap.set('学习', getColorFromTheme('learner'));
colorMap.set('', getColorFromTheme(''));
//TODO: 添加js模式颜色
