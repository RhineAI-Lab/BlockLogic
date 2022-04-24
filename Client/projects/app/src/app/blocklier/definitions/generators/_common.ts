import * as _javascript from 'blockly/javascript';
import * as _python from 'blockly/python';

export const JavaScript = _javascript as any;
export const Python = _python as any;

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
