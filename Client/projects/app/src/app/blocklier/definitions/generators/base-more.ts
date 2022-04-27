import { Python } from './_common';

Python['base_more_enum'] = function (block: any) {
    const sequence = Python.valueToCode(block, 'SEQUENCE', Python.ORDER_ATOMIC);
    const code = `enumerate(${sequence})`;
    return [code, 0];
};

Python['base_more_enum_from'] = function (block: any) {
    const sequence = Python.valueToCode(block, 'SEQUENCE', Python.ORDER_ATOMIC);
    const start = Python.valueToCode(block, 'START', Python.ORDER_ATOMIC);
    const code = `enumerate(${sequence}, start = ${start})`;
    return [code, 0];
};

Python['base_more_new_coll'] = function (block: any) {
    const mode = block.getFieldValue('MODE');
    if (mode === 'Map') {
        const code = `dict()`;
        return [code, 0];
    } else if (mode === 'Tuple') {
        const code = `()`;
        return [code, 0];
    } else if (mode === 'Set') {
        const code = `{}`;
        return [code, 0];
    } else {return [`[]`,0];}
};

// Python['base_more_dict_with'] = function (block: any) {
//     let elements = new Array(block.itemCount_);
//     for (var i = 0; i < block.itemCount_; i++) {
//         elements[i] = Python.valueToCode(block, 'ADD' + i,
//             Python.ORDER_NONE) || 'None';
//     }
//     const code = '[' + elements.join(', ') + ']';
//     return [code, 0];
// };

