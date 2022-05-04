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

])