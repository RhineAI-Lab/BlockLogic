import { BlocklierArgumentReader } from '../models/blocklier-argument-reader.class';
import {
  BlocklierCustomBlock,
  BlocklierCustomBlockCode,
  BlocklierCustomBlockDefinition,
  BlocklierCustomBlockWithJavaScript,
} from '../models/blocklier-custom-block.class';

const style = 'list_blocks';

@BlocklierCustomBlock.register('lists_get')
export class ListsGetBlock
  extends BlocklierCustomBlock
  implements BlocklierCustomBlockWithJavaScript
{
  definition: BlocklierCustomBlockDefinition = {
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

  toJavaScript(args: BlocklierArgumentReader): BlocklierCustomBlockCode {
    const array = args.code('ARRAY');
    const index = args.code('INDEX');
    return [`${array}[${index}-1]`, 0];
  }
}

@BlocklierCustomBlock.register('lists_set')
export class ListsSetBlock
  extends BlocklierCustomBlock
  implements BlocklierCustomBlockWithJavaScript
{
  definition: BlocklierCustomBlockDefinition = {
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

  toJavaScript(args: BlocklierArgumentReader): BlocklierCustomBlockCode {
    const array = args.code('ARRAY');
    const index = args.code('INDEX');
    const value = args.code('VALUE') || 'null';
    return `${array}[${index}-1] = ${value};\n`;
  }
}
