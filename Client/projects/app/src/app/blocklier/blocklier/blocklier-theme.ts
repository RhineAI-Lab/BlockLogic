import * as Blockly from "blockly";

export class BlocklierTheme {

  static theme = Blockly.Theme.defineTheme('b-base', {
    'base': 'classic',
    'blockStyles': {
      'logic_blocks': {
        'colourPrimary': '#fa7749',
      },
      'loop_blocks': {
        'colourPrimary': '#8faf1f',
      },
      'math_blocks': {
        'colourPrimary': '#009ae5',
      },
      'text_blocks': {
        'colourPrimary': '#5d61de',
      },
      'list_blocks': {
        'colourPrimary': '#04c28d',
      },
      'colour_blocks': {
        'colourPrimary': '#f1316f',
      },
      'variable_blocks': {
        'colourPrimary': '#753fff',
      },
      'variable_dynamic_blocks': {
        'colourPrimary': '#eabe86',
      },
      'procedure_blocks': {
        'colourPrimary': '#f56a6a',
      },
    },
  });

  static themeLight = Blockly.Theme.defineTheme('b-light', {
    'base': 'b-base',
    'flyoutForegroundColour': '#2b2b2b',
  });

  static themeDark = Blockly.Theme.defineTheme('b-dark', {
    'base': 'b-base',
    'componentStyles': {
      'workspaceBackgroundColour': '#1e1e1e',
      'flyoutBackgroundColour': '#2b2c2d',
      'flyoutForegroundColour': '#c6c6c6',
      'scrollbarColour': '#666',
    },
  });

}