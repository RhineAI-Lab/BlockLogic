import { Blockly } from 'ngx-blockly';

import { CodeDefinition, CustomBlockEnhanced } from './common';

export class ListsGetBlock extends CustomBlockEnhanced {
  type = 'lists_get';

  defineBlock(): void {
    this.block.jsonInit({
      message0: '列表 %1 第 %2 项',
      output: null,
      style: 'list_blocks',
      args0: [
        { type: 'input_value', name: 'ARRAY', check: 'Array' },
        { type: 'input_value', name: 'INDEX', check: 'Number' },
      ],
      tooltip: '获取列表第指定项',
    });
  }

  override toJavaScriptCode(block: Blockly.Block): CodeDefinition {
    const array = Blockly.JavaScript.valueToCode(
      block,
      'ARRAY',
      Blockly.JavaScript.ORDER_ATOMIC,
      true,
    );
    const index = Blockly.JavaScript.valueToCode(
      block,
      'INDEX',
      Blockly.JavaScript.ORDER_ATOMIC,
      true,
    );
    const code = array + '[' + index + '-1]';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  }
}

export class ListsSetBlock extends CustomBlockEnhanced {
  type = 'lists_set';

  defineBlock(): void {
    this.block.jsonInit({
      message0: '设置列表 %1 第 %2 项 为 %3',
      previousStatement: null,
      nextStatement: null,
      style: 'list_blocks',
      args0: [
        { type: 'input_value', name: 'ARRAY', check: 'Array' },
        { type: 'input_value', name: 'INDEX', check: 'Number' },
        { type: 'input_value', name: 'VALUE', check: null },
      ],
      inputsInline: true,
      tooltip: '设置列表第某项的值',
    });
  }

  override toJavaScriptCode(block: Blockly.Block): CodeDefinition {
    const array = Blockly.JavaScript.valueToCode(
      block,
      'ARRAY',
      Blockly.JavaScript.ORDER_ATOMIC,
      true,
    );
    const index = Blockly.JavaScript.valueToCode(
      block,
      'INDEX',
      Blockly.JavaScript.ORDER_ATOMIC,
      true,
    );
    let value = Blockly.JavaScript.valueToCode(
      block,
      'VALUE',
      Blockly.JavaScript.ORDER_ATOMIC,
      true,
    );
    if (value == null || value.length === 0) {
      value = 'null';
    }
    const code = array + '[' + index + '-1]=' + value + ';\n';
    return code;
  }
}
