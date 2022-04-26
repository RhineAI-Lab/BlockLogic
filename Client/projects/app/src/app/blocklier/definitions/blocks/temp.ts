import * as Blockly from 'blockly';

const colour = '#3264e1';
const baseHelpUrl = '';

Blockly.defineBlocksWithJsonArray([
    {
        type: 'temp_connect',
        message0: 'connect %1 and %2',
        args0: [
            { type: 'input_value', name: 'STR1', check: 'String' },
            { type: 'input_value', name: 'STR2', check: 'String' },
        ],
        inputsInline: true,
        output: 'String',
        colour: colour,
        tooltip: 'Connects two strings together',
        helpUrl: baseHelpUrl+'',
    },
    {
        type: 'temp_expon',
        message0: '计算 %1 的 %2 次方',
        args0: [
            { type: 'input_value', name: 'NUM1', check: 'Number' },
            { type: 'input_value', name: 'NUM2', check: 'Number' },
        ],
        inputsInline: true,
        output: 'Number',
        colour: colour,
        tooltip: '幂计算',
        helpUrl: baseHelpUrl+'',
    }
]);
