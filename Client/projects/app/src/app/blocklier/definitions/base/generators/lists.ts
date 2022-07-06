import { Python } from '../../_common';
import { JavaScript } from '../../_common';

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
Python['lists_create_with'] = function (block: any) {
  // Create a list with any number of elements of any type.
  const elements = new Array(block.itemCount_);
  for (let i = 0; i < block.itemCount_; i++) {
    elements[i] =
      Python.valueToCode(block, 'ADD' + i, Python.ORDER_NONE) || 'None';
  }
  const code = '[' + elements.join(', ') + ']';
  return [code, 0];
};

Python['lists_dict_new_coll'] = function (block: any) {
  let elements = [];
  for (let i = 0; i < block.itemCount_; i++) {
    let key = block.getFieldValue('KEY' + i);
    let value =
      Python.valueToCode(block, 'ADD' + i, Python.ORDER_ATOMIC, true) || "''";
    elements.push(`  '${key}': ${value}`);
  }
  const code = '{\n' + elements.join(',\n') + '\n}';
  return [code, Python.ORDER_ATOMIC];
};

Python['lists_new_num'] = function (block: any) {
  let elements = [];
  for (let i = 0; i < block.itemCount_; i++) {
    let value = block.getFieldValue('ADD' + i);
    elements.push(value);
  }
  const code = '[' + elements.join(', ') + ']';
  return [code, Python.ORDER_ATOMIC];
};

Python['lists_indexOf_new'] = function (block: any) {
  // Find an item in the list.
  const value = Python.valueToCode(block, 'VALUE', Python.ORDER_ATOMIC) || '[]';
  const list = Python.valueToCode(block, 'LIST', Python.ORDER_ATOMIC) || "''";
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
    const functionName = Python.provideFunction_('first_index', [
      'def ' + Python.FUNCTION_NAME_PLACEHOLDER_ + '(my_list, elem):',
      '  try: index = my_list.index(elem)' + firstIndexAdjustment,
      '  except: index =' + errorIndex,
      '  return index',
    ]);
    const code = functionName + '(' + list + ', ' + value + ')';
    return [code, Python.ORDER_FUNCTION_CALL];
  }
  const functionName = Python.provideFunction_('last_index', [
    'def ' + Python.FUNCTION_NAME_PLACEHOLDER_ + '(my_list, elem):',
    '  try: index = len(my_list) - my_list[::-1].index(elem)' +
      lastIndexAdjustment,
    '  except: index =' + errorIndex,
    '  return index',
  ]);
  const code = functionName + '(' + list + ', ' + value + ')';
  return [code, Python.ORDER_FUNCTION_CALL];
};

Python['lists_getIndex_new1'] = function (block: any) {
  const list = Python.valueToCode(block, 'LIST', Python.ORDER_ATOMIC) || '[]';
  const mode = block.getFieldValue('MODE');
  let index = Python.valueToCode(block, 'INDEX', Python.ORDER_ATOMIC) || '1';
  index = parseInt(index);
  index -= 1;
  let code;
  if (mode === 'GET') {
    code = `${list}[${index}]`;
  } else if (mode === 'DEL') {
    code = `${list}.pop(${index})`;
  }
  return [code, Python.ORDER_ATOMIC];
};

Python['lists_getIndex_new2'] = function (block: any) {
  const list = Python.valueToCode(block, 'LIST', Python.ORDER_ATOMIC) || '[]';
  const mode = block.getFieldValue('MODE');
  let index = block.getFieldValue('INDEX');
  let code;
  if (mode === 'GET') {
    if (index === 'FIRST') {
      code = `${list}[0]`;
    } else if (index === 'LAST') {
      code = `${list}[-1]`;
    } else if (index === 'RANDOM') {
      Python.provideFunction_('import_random', ['import random']);
      code = `${list}[random.randint(0, len(${list})-1)]`;
    }
  } else if (mode === 'DEL') {
    if (index === 'FIRST') {
      code = `${list}.pop(0)`;
    } else if (index === 'LAST') {
      code = `${list}.pop(-1)`;
    } else if (index === 'RANDOM') {
      Python.provideFunction_('import_random', ['import random']);
      code = `${list}.pop(random.randint(0, len(${list})-1))`;
    }
  }
  return [code, Python.ORDER_ATOMIC];
};

Python['lists_setValue_new1'] = function (block: any) {
  const list = Python.valueToCode(block, 'LIST', Python.ORDER_ATOMIC) || '[]';
  let index = Python.valueToCode(block, 'INDEX', Python.ORDER_ATOMIC) || '1';
  const value = Python.valueToCode(block, 'VALUE', Python.ORDER_ATOMIC) || '0';
  index = parseInt(index) - 1;
  return `${list}[${index}] = ${value}\n`;
};

Python['lists_setValue_new2'] = function (block: any) {
  const list = Python.valueToCode(block, 'LIST', Python.ORDER_ATOMIC) || '[]';
  const index = block.getFieldValue('INDEX');
  const value = Python.valueToCode(block, 'VALUE', Python.ORDER_ATOMIC) || '0';
  let code;
  if (index === 'ADD') {
    code = `${list}.append(${value})`;
  } else if (index === 'FIRST') {
    code = `${list}[0] = ${value}`;
  } else if (index === 'LAST') {
    code = `${list}[-1] = ${value}`;
  } else if (index === 'RANDOM') {
    Python.provideFunction_('import_random', ['import random']);
    code = `${list}[random.randint(0, len(${list})-1)] = ${value}`;
  }
  return code + '\n';
};

JavaScript['lists_getIndex_new1'] = function (block: any) {
  const list =
    JavaScript.valueToCode(block, 'LIST', JavaScript.ORDER_ATOMIC) || '[]';
  const mode = block.getFieldValue('MODE');
  let index =
    JavaScript.valueToCode(block, 'INDEX', JavaScript.ORDER_ATOMIC) || '1';
  index = parseInt(index);
  index -= 1;
  let code;
  if (mode === 'GET') {
    code = `${list}[${index}]`;
  } else if (mode === 'DEL') {
    code = `${list}.splice(${index}, 1)`;
  }
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['lists_getIndex_new2'] = function (block: any) {
  const list =
    JavaScript.valueToCode(block, 'LIST', JavaScript.ORDER_ATOMIC) || '[]';
  const mode = block.getFieldValue('MODE');
  let index = block.getFieldValue('INDEX');
  let code;
  if (mode === 'GET') {
    if (index === 'FIRST') {
      code = `${list}[0]`;
    } else if (index === 'LAST') {
      code = `${list}[${list}.length-1]`;
    } else if (index === 'RANDOM') {
      code = `${list}[random(0, ${list}.length-1)]`;
    }
  } else if (mode === 'DEL') {
    if (index === 'FIRST') {
      code = `${list}.shift()`;
    } else if (index === 'LAST') {
      code = `${list}.pop()`;
    } else if (index === 'RANDOM') {
      code = `${list}.splice(random(0, ${list}.length-1), 1)`;
    }
  }
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['lists_setValue_new1'] = function (block: any) {
  const list =
    JavaScript.valueToCode(block, 'LIST', JavaScript.ORDER_ATOMIC) || '[]';
  let index =
    JavaScript.valueToCode(block, 'INDEX', JavaScript.ORDER_ATOMIC) || '1';
  const value =
    JavaScript.valueToCode(block, 'VALUE', JavaScript.ORDER_ATOMIC) || '0';
  index = parseInt(index) - 1;
  return `${list}[${index}] = ${value}\n`;
};

JavaScript['lists_setValue_new2'] = function (block: any) {
  const list =
    JavaScript.valueToCode(block, 'LIST', JavaScript.ORDER_ATOMIC) || '[]';
  const index = block.getFieldValue('INDEX');
  const value =
    JavaScript.valueToCode(block, 'VALUE', JavaScript.ORDER_ATOMIC) || '0';
  let code;
  if (index === 'ADD') {
    code = `${list}.push(${value})`;
  } else if (index === 'FIRST') {
    code = `${list}[0] = ${value}`;
  } else if (index === 'LAST') {
    code = `${list}[${list}.length-1] = ${value}`;
  } else if (index === 'RANDOM') {
    JavaScript.provideFunction_('import_random', ['import random']);
    code = `${list}[random(0, list.length-1)] = ${value}`;
  }
  return code + '\n';
};
