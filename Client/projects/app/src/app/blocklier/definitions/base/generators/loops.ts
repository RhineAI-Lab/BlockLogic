import { Python } from '../../_common';

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


