import {
  BlocklierArgumentReader,
  BlocklierBlockDefinition,
  BlocklierCodeDefinition,
  BlocklierCustomBlock,
} from '../blocklier-models';

const style = 'list_blocks';

@BlocklierCustomBlock.register()
export class ListsGetBlock extends BlocklierCustomBlock {
  type = 'lists_get';

  override definition: BlocklierBlockDefinition = {
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
    style,
    tooltip: '获取列表第指定项',
  };

  override toJS(args: BlocklierArgumentReader): BlocklierCodeDefinition {
    const array = args.code('ARRAY');
    const index = args.code('INDEX');
    return [`${array}[${index}-1]`, 0];
  }
}

@BlocklierCustomBlock.register()
export class ListsSetBlock extends BlocklierCustomBlock {
  type = 'lists_set';

  override definition: BlocklierBlockDefinition = {
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
    style,
    inputsInline: true,
    tooltip: '设置列表第某项的值',
  };

  override toJS(args: BlocklierArgumentReader): BlocklierCodeDefinition {
    const array = args.code('ARRAY');
    const index = args.code('INDEX');
    const value = args.code('VALUE') || 'null';
    return `${array}[${index}-1] = ${value};\n`;
  }
}
