import * as Blockly from 'blockly';

const colorChooseTool = '#888888';

export class BlocklierTheme {
  private static blockColors = `
default 38b793 默认
logic 45a92d 逻辑
loop 487ce3 循环
math 3d98e3 数学
  `;

  static blockStyles: any = {};
  static colorsMap = new Map();
  static {
    for (const line of this.blockColors.split('\n')) {
      if (line.trim().length == 0) continue;
      const args = line.split(' ');
      this.blockStyles[args[0] + '_blocks'] = { colourPrimary: '#' + args[1] };
      for (let i = 2; i < args.length; i++) {
        this.colorsMap.set(args[i], '#' + args[1]);
      }
    }
    console.log(this.blockStyles);
    console.log(this.colorsMap);
  }
  static theme = Blockly.Theme.defineTheme('b-base', {
    base: 'classic',
    blockStyles: this.blockStyles,
    // default_blocks: {
    //   colourPrimary: '#38b793',
    // },
    // logic_blocks: {
    //   colourPrimary: '#45a92d',
    // },
    // loop_blocks: {
    //   colourPrimary: '#487ce3',
    // },
    // math_blocks: {
    //   colourPrimary: '#3d98e3',
    // },
    // text_blocks: {
    //   colourPrimary: '#dc7f3b',
    // },
    // list_blocks: {
    //   colourPrimary: '#38b793',
    // },
    // class_blocks: {
    //   colourPrimary: '#7658ee',
    // },
    // colour_blocks: {
    //   colourPrimary: '#939393',
    // },
    // variable_blocks: {
    //   colourPrimary: '#e35881',
    // },
    // variable_dynamic_blocks: {
    //   colourPrimary: '#e35881',
    // },
    // procedure_blocks: {
    //   colourPrimary: '#dc6161',
    // },
    // module_blocks: {
    //   colourPrimary: '#f85c5c',
    // },
    // layer_blocks: {
    //   colourPrimary: '#ff7a41',
    // },
    // transforms_blocks: {
    //   colourPrimary: '#38b793',
    // },
    // learner_blocks: {
    //   colourPrimary: '#009561',
    // },
    // data_blocks: {
    //   colourPrimary: '#487ce3',
    // },
    // tensor_blocks: {
    //   colourPrimary: '#3abcd3',
    // },
    // numpy_blocks: {
    //   colourPrimary: '#3abcd3',
    // },
    // time_blocks: {
    //   colourPrimary: '#38b793',
    // },
    // opencv_blocks: {
    //   colourPrimary: '#52c5e8',
    // },

    // console_blocks: {
    //   colourPrimary: '#0eaf9e',
    // },
    // device_blocks: {
    //   colourPrimary: '#3264e1',
    // },
    // dialog_blocks: {
    //   colourPrimary: '#9abc86',
    // },
    // files_blocks: {
    //   colourPrimary: '#b9993d',
    // },
    // global_blocks: {
    //   colourPrimary: '#7476c6',
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
  if (key.startsWith('#')) {
    return key;
  }
  const style = BlocklierTheme.theme.blockStyles[key + '_blocks'];
  return style ? style.colourPrimary : '#aaaaaa';
}
