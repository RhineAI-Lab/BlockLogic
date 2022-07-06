import * as _javascript from 'blockly/javascript';
import * as _python from 'blockly/python';
import * as Blockly from 'blockly';

export const JavaScript = _javascript as any;
export const Python = _python as any;

Python.get = function (block: any) {
  const code = Python.nameDB_.getName(
    block.getFieldValue('VAR'),
    Blockly.VARIABLE_CATEGORY_NAME,
  );
  return [code, Python.ORDER_ATOMIC];
};

Python.set = function (block: any) {
  const argument0 =
    Python.valueToCode(block, 'VALUE', Python.ORDER_NONE) || '0';
  const varName = Python.nameDB_.getName(
    block.getFieldValue('VAR'),
    Blockly.VARIABLE_CATEGORY_NAME,
  );
  return varName + ' = ' + argument0 + '\n';
};

export function connectNecessaryArgs(
  args: string | any[],
  needBefore = true,
): string {
  let code = '';
  for (let i = args.length - 1; i >= 0; i--) {
    const arg = args[i];
    if (arg != null && arg.length > 0) {
      if (code.length > 0) {
        code = arg + ', ' + code;
      } else {
        code = arg;
      }
    } else if (code.length > 0) {
      return '';
    }
  }
  if (needBefore && code.length > 0) {
    code = ',' + code;
  }
  return code;
}

Python.addIndent = function (code: string, indent = '  '): string {
  if (code.length == 0) {
    return code;
  }
  if (code.lastIndexOf('\n') === code.length - 1) {
    code = code.substring(0, code.length - 1);
  }
  return (
    code
      .split('\n')
      .map((line) => indent + line)
      .join('\n') + '\n'
  );
};

Python.checkboxToCode = function (code: string) {
  if (code == 'TRUE') {
    return 'True';
  } else {
    return 'False';
  }
};

Python.defaultValue = function (type: string) {
  type = type || '';
  let returnStr = '';
  if (type.includes('Number')) {
    returnStr = '0';
  } else if (type.includes('String')) {
    returnStr = "\\'\\'";
  } else if (type.includes('Boolean')) {
    returnStr = 'False';
  } else if (type.includes('Array')) {
    returnStr = '[]';
  } else if (type.includes('Object')) {
    returnStr = '{}';
  } else {
    returnStr = 'None';
  }
  return "'" + returnStr + "'";
};
