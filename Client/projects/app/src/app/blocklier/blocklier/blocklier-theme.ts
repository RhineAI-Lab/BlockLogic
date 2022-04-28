import * as Blockly from "blockly";

export class BlocklierTheme {

  static theme = Blockly.Theme.defineTheme('b-base', {
    'base': 'classic',
    'blockStyles': {
      'logic_blocks': {
        'colourPrimary': '#FFB771',
      },
      'loop_blocks': {
        'colourPrimary': '#52C7CE',
      },
      'math_blocks': {
        'colourPrimary': '#e55e5e',
      },
      'text_blocks': {
        'colourPrimary': '#518568',
      },
      'list_blocks': {
        'colourPrimary': '#797CDA',
      },
      'colour_blocks': {
        'colourPrimary': '#FFB771',
      },
      'variable_blocks': {
        'colourPrimary': '#E892C5',
      },
      'variable_dynamic_blocks': {
        'colourPrimary': '#eabe86',
      },
      'procedure_blocks': {
        'colourPrimary': '#156780',
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
      'flyoutForegroundColour': '#c6c6c6',
      'scrollbarColour': '#666',
    },
  });

}