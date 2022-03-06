import { ArgumentReader, CodeDefinition, CustomBlockEnhanced } from './common';

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

  override toJavaScriptCodeInternal(arg: ArgumentReader): CodeDefinition {
    const array = arg('ARRAY');
    const index = arg('INDEX');
    return [`${array}[${index}-1]`, 0];
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

  override toJavaScriptCodeInternal(arg: ArgumentReader): CodeDefinition {
    const array = arg('ARRAY');
    const index = arg('INDEX');
    const value = arg('VALUE') || 'null';
    return `${array}[${index}-1] = ${value};\n`;
  }
}
