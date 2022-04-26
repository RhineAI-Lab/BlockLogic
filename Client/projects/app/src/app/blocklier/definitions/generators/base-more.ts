import { Python } from './_common';

Python['base_more_enum'] = function (block: any) {
    const key = Python.valueToCode(block, 'KEY', Python.ORDER_ATOMIC);
    const data = Python.valueToCode(block, 'DATA', Python.ORDER_ATOMIC);
    const sequence = Python.valueToCode(block, 'SEQUENCE', Python.ORDER_ATOMIC);
    const start = Python.valueToCode(block, 'START', Python.ORDER_ATOMIC);
    let branch = Python.statementToCode(block, 'DO');
    branch = Python.addLoopTrap(branch, block) || Python.PASS;
    const code = `for ${key}, ${data} in enumerate(${sequence}, start = ${start}):\n  ${branch}`;
    return code;
};

Python['base_more_new_dict'] = function (block: any) {
    const code = `dict()`;
    return [code, 0];
};