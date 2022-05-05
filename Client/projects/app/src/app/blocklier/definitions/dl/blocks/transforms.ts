import * as Blockly from 'blockly';

const style = 'list_blocks';
const baseHelpUrl = '';

Blockly.defineBlocksWithJsonArray([
    {
        type:'transforms_compose',
        message0: '进行 %1 变换',
        args0: [
            {type: 'input_value', name: 'LIST', check: 'Array'}
        ],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        style: style,
        tooltip: '结合不同的变换',
        helpUrl: baseHelpUrl + ''
    },
    {
        type:'transforms_toTensor',
        message0: '将 %1 转换为张量',
        args0: [
            {type: 'input_value', name: 'IMAGE', check: 'Array'}
        ],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        style: style,
        tooltip: '将图像或者ndarray转换为张量',
        helpUrl: baseHelpUrl + ''
    },
    {
        type:'transforms_toPILImage',
        message0: '将 %1 转换为图像',
        args0: [
            {type: 'input_value', name: 'TENSOR', check: 'Array'}
        ],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        style: style,
        tooltip: '将张量转换为图像',
        helpUrl: baseHelpUrl + ''
    }
])