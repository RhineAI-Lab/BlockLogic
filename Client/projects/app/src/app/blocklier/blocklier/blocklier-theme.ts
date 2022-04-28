import * as Blockly from "blockly";

export class BlocklierTheme {

  static theme = Blockly.Theme.defineTheme('b-base', {
    'base': 'classic',
    'blockStyles': {
      'logic_blocks': {
        'colourPrimary': '#ff0000',
      },
      'text_blocks': {
        'colourPrimary': '#00ff00',
      },
    },
  });

  static themeLight = Blockly.Theme.defineTheme('b-light', {
    'base': 'b-base',
  });

  static themeDark = Blockly.Theme.defineTheme('b-dark', {
    'base': 'b-base',
    'componentStyles': {
      'workspaceBackgroundColour': '#1e1e1e',
      'flyoutBackgroundColour': '#2b2c2d',
      'scrollbarColour': '#666',
    },
  });

}