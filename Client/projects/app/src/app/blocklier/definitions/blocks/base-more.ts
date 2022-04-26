import * as Blockly from 'blockly';

const colour = '#16bbbb';
const baseHelpUrl = '';

Blockly.defineBlocksWithJsonArray([
    {
        type: 'base_more_enum',
        message0: '从 %4 起遍历 %3 作为 %2 并获取索引 %1 \n 执行 %5',
        args0: [
            { type: 'input_value', name: 'KEY', check: 'Object' },
            { type: 'input_value', name: 'VALUE', check: 'Object' },
            { type: 'input_value', name: 'SEQUENCE', check: 'Array' },
            { type: 'input_value', name: 'START', check: 'Number' },
            { type: 'input_statement', name: 'DO' },
        ],
        args1: [{
            "type": "input_statement",
            "name": "DO"
        }],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        colour: colour,
        tooltip: '遍历可迭代对象并获取索引',
        helpUrl: baseHelpUrl+'',
    },
]);

Blockly.defineBlocksWithJsonArray([
    {
        type: 'base_more_new_dict',
        message0: '创建新字典',
        inputsInline: true,
        output: 'MAP',
        colour: colour,
        tooltip: '创建新字典',
        helpUrl: baseHelpUrl+'',
    },
]);

