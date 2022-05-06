import * as Blockly from 'blockly';

export class BlocklierTheme {
  static theme = Blockly.Theme.defineTheme('b-base', {
    base: 'classic',
    blockStyles: {
      default_blocks: {
        colourPrimary: '#38b793',
      },
      logic_blocks: {
        colourPrimary: '#4faf38',
      },
      loop_blocks: {
        colourPrimary: '#4274d5',
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
      transforms_blocks: {
        colourPrimary: '#38b793',
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
