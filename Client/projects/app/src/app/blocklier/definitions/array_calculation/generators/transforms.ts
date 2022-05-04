import { Python } from '../../_common';

Python['transforms_compose'] = function (block: any) {
    const list = Python.valueToCode(block, 'LIST', Python.ORDER_ATOMIC, true) || '[]';
    Python.provideFunction_('import_transforms', ['import transforms']);
    const code = `transforms.Compose(${list})`;
    return code + '\n' ;
}