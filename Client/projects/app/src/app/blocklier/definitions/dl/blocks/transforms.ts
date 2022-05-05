import * as Blockly from 'blockly';

const style = 'transforms_blocks';
const baseHelpUrl = '';

Blockly.defineBlocksWithJsonArray([
  {
    type: 'transforms_get',
    message0: '%1',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: 'net',
        variableTypes: ['Module'],
        defaultType: 'Module',
      },
    ],
    style: style,
    output: 'Module',
  },
  {
    type: 'transforms_set',
    message0: '设置 %1 为  %2',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: 'net',
        variableTypes: ['Module'],
        defaultType: 'Module',
      },
      {
        type: 'input_value',
        name: 'VALUE',
        check: 'Module',
      },
    ],
    style: style,
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'transforms_call',
    message0: '调用 %1 %2',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: 'net',
        variableTypes: ['Module'],
        defaultType: 'Module',
      },
      {
        type: 'input_value',
        name: 'INPUT',
        check: 'Tensor',
      },
    ],
    style: style,
    output: 'Tensor',
  },
  {
    type: 'transforms_compose',
    message0: '进行 %1 变换',
    args0: [{ type: 'input_value', name: 'LIST', check: 'Array' }],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    style: style,
    tooltip: '结合不同的变换',
    helpUrl: baseHelpUrl + '',
  },
  {
    type: 'transforms_toTensor',
    message0: '将 %1 转换为张量',
    args0: [{ type: 'input_value', name: 'IMAGE', check: 'Array' }],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    style: style,
    tooltip: '将图像或者ndarray转换为张量',
    helpUrl: baseHelpUrl + '',
  },
  {
    type: 'transforms_toPILImage',
    message0: '将 %1 转换为图像',
    args0: [{ type: 'input_value', name: 'TENSOR', check: 'Array' }],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    style: style,
    tooltip: '将张量转换为图像',
    helpUrl: baseHelpUrl + '',
  },
]);
