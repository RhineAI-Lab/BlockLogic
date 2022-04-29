import { Python } from '../../_common';

Python['lists_new_coll'] = function (block: any) {
  const mode = block.getFieldValue('MODE');
  let code;
  if (mode === 'List') {
    code = `[]`;
  } else if (mode === 'Map') {
    code = `dict()`;
  } else if (mode === 'Tuple') {
    code = `()`;
  } else {
    code = `[]`;
  }
  return [code, 0];
};

Python['lists_indexOf_new'] = function(block: any) {
    // Find an item in the list.
    const value = Python.valueToCode(block, 'VALUE',
        Python.ORDER_NONE) || '[]';
    const list = Python.valueToCode(block, 'LIST',
        Python.ORDER_NONE) || '\'\'';
    let errorIndex, firstIndexAdjustment, lastIndexAdjustment;
    if (block.workspace.options.oneBasedIndex) {
        errorIndex = ' 0';
        firstIndexAdjustment = ' + 1';
        lastIndexAdjustment = '';
    } else {
        errorIndex = ' -1';
        firstIndexAdjustment = '';
        lastIndexAdjustment = ' - 1';
    }
    if (block.getFieldValue('MODE') == 'FIRST') {
        const functionName = Python.provideFunction_(
            'first_index',
            ['def ' + Python.FUNCTION_NAME_PLACEHOLDER_ +
            '(my_list, elem):',
                '  try: index = my_list.index(elem)' + firstIndexAdjustment,
                '  except: index =' + errorIndex,
                '  return index']);
        const code = functionName + '(' + list + ', ' + value + ')';
        return [code, Python.ORDER_FUNCTION_CALL];
    }
    const functionName = Python.provideFunction_(
        'last_index',
        ['def ' + Python.FUNCTION_NAME_PLACEHOLDER_ + '(my_list, elem):',
            '  try: index = len(my_list) - my_list[::-1].index(elem)' +
            lastIndexAdjustment,
            '  except: index =' + errorIndex,
            '  return index']);
    const code = functionName + '(' + list + ', ' + value + ')';
    return [code, Python.ORDER_FUNCTION_CALL];
};