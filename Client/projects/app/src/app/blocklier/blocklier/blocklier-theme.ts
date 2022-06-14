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
        colourPrimary: '#dc7f3b',
      },
      list_blocks: {
        colourPrimary: '#38b793',
      },
      class_blocks: {
        colourPrimary: '#7658ee',
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
        colourPrimary: '#009561',
      },
      data_blocks: {
        colourPrimary: '#487ce3',
      },
      tensor_blocks: {
        colourPrimary: '#3abcd3',
      },
      numpy_blocks: {
        colourPrimary: '#3abcd3',
      },
      time_blocks: {
        colourPrimary: '#38b793',
      },
      opencv_blocks: {
        colourPrimary: '#52c5e8',
      },

      console_blocks: {
        colourPrimary: '#0eaf9e',
      },
      device_blocks: {
        colourPrimary: '#3264e1',
      },
      // dialog_blocks: {
      //   colourPrimary: '#',
      // },
      // files_blocks: {
      //   colourPrimary: '#',
      // },
      // global_blocks: {
      //   colourPrimary: '#',
      // },
      // http_blocks: {
      //   colourPrimary: '#',
      // },
      // intent_blocks: {
      //   colourPrimary: '#',
      // },
      // media_blocks: {
      //   colourPrimary: '#',
      // },
      // plugins_blocks: {
      //   colourPrimary: '#',
      // },
      // power_manager_blocks: {
      //   colourPrimary: '#',
      // },
      // root_automator_blocks: {
      //   colourPrimary: '#',
      // },
      // setting_blocks: {
      //   colourPrimary: '#',
      // },
      // simple_blocks: {
      //   colourPrimary: '#',
      // },
      // storages_blocks: {
      //   colourPrimary: '#',
      // },
      // temp_blocks: {
      //   colourPrimary: '#',
      // },
      // ui_blocks: {
      //   colourPrimary: '#',
      // },
      // widget_blocks: {
      //   colourPrimary: '#',
      // },
      // app_blocks: {
      //   colourPrimary: '#',
      // },
      // auto_blocks: {
      //   colourPrimary: '#',
      // },
      // coordinate_blocks: {
      //   colourPrimary: '#',
      // },
      // crypto_blocks: {
      //   colourPrimary: '#',
      // },
      // debug_blocks: {
      //   colourPrimary: '#',
      // },
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

export function themeColor(key: string): string {
  if (key.startsWith('#')){
    return key
  }
  const style = BlocklierTheme.theme.blockStyles[key + '_blocks'];
  return style ? style.colourPrimary : '#aaaaaa';
}

export const colorsMap = new Map([
  ['常用语句', '#888888'],
  ['循环', 'loop'],
  ['变量', 'variable'],
  ['函数', 'procedure'],
  ['逻辑', 'logic'],
  ['数学', 'math'],
  ['文本', 'text'],
  ['集合', 'list'],
  ['列表', 'list'],
  ['对象', 'class'],
  ['自定义块', '#aaaaaa'],

  ['数据增强', 'transforms'],
  ['模型定义', 'module'],
  ['内置模型/层', 'layer'],
  ['学习', 'learner'],
  ['张量', 'tensor'],
  ['Numpy', 'numpy'],
  ['导入数据', 'data'],
  ['时间', 'time'],
  ['图像读写', 'opencv'],

  ['设备', 'device'],
  ['', ''],
]);
