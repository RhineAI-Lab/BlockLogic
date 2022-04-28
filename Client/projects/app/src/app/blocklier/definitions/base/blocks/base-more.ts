import * as Blockly from 'blockly';

const colour = '#16bbbb';
const baseHelpUrl = '';

Blockly.defineBlocksWithJsonArray([
    {
        type: 'base_more_enum',
        message0: '枚举 %1 并获取索引',
        args0: [
            { type: 'input_value', name: 'SEQUENCE', check: 'Array' },
        ],
        inputsInline: true,
        output: 'Array',
        colour: colour,
        tooltip: '遍历可迭代对象并获取索引',
        helpUrl: baseHelpUrl+'',
    },
]);

Blockly.defineBlocksWithJsonArray([
    {
        type: 'base_more_enum_from',
        message0: '从 %2 枚举 %1 并获取索引',
        args0: [
            { type: 'input_value', name: 'SEQUENCE', check: 'Array' },
            { type: 'input_value', name: 'START', check: 'Number' },
        ],
        inputsInline: true,
        output: 'Array',
        colour: colour,
        tooltip: '从指定索引处，开始遍历可迭代对象，并获取索引',
        helpUrl: baseHelpUrl+'',
    },
]);

Blockly.defineBlocksWithJsonArray([
    {
        type: 'base_more_new_coll',
        message0: '创建新 %1 ',
        args0:[
            { type: 'field_dropdown', name: 'MODE', options: [
                ['字典', 'Map'],
                ['元组', 'Tuple'],
                ['集合','Set'],
            ] },
        ],
        inputsInline: true,
        output: [
            'MAP',
            'TUPLE',
            'SET',
            ],
        colour: colour,
        tooltip: '创建新字典、元组、集合',
        helpUrl: baseHelpUrl+'',
    },
]);
