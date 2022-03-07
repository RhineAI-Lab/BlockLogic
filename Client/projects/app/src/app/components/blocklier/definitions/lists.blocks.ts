import {
  ArgumentReader,
  BlockDefinition,
  CodeDefinition,
  CustomBlock,
} from '../blocklier-models';

export class ListsGetBlock extends CustomBlock {
  type = 'lists_get';

  override definition: BlockDefinition = {
    lines: [
      {
        message: '列表 %1 第 %2 项',
        args: [
          { type: 'input_value', name: 'ARRAY', check: 'Array' },
          { type: 'input_value', name: 'INDEX', check: 'Number' },
        ],
      },
    ],
    output: null,
    style: 'list_blocks',
    tooltip: '获取列表第指定项',
  };

  override js(arg: ArgumentReader): CodeDefinition {
    const array = arg('ARRAY');
    const index = arg('INDEX');
    return [`${array}[${index}-1]`, 0];
  }
}

export class ListsSetBlock extends CustomBlock {
  type = 'lists_set';

  override definition: BlockDefinition = {
    lines: [
      {
        message: '设置列表 %1 第 %2 项 为 %3',
        args: [
          { type: 'input_value', name: 'ARRAY', check: 'Array' },
          { type: 'input_value', name: 'INDEX', check: 'Number' },
          { type: 'input_value', name: 'VALUE', check: null },
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    style: 'list_blocks',
    inputsInline: true,
    tooltip: '设置列表第某项的值',
  };

  override js(arg: ArgumentReader): CodeDefinition {
    const array = arg('ARRAY');
    const index = arg('INDEX');
    const value = arg('VALUE') || 'null';
    return `${array}[${index}-1] = ${value};\n`;
  }
}
