import { Python, JavaScript } from './_common';
import * as Blockly from 'blockly';

const modeKeys = ['prefix', 'style', 'help'];

const blockKeys = ['style', 'tip', 'mutator', 'help', 'inline', 'colour','extensions'];
const blockKeysTruth = ['style', 'tooltip', 'mutator'];

const fieldKeys = [
  'input',
  'number',
  'checkbox',
  'image',
  'angle',
  'colour',
  'label',
];

const alignKeys = ['L', 'R', 'C'];

const codeTypes = ['Python', 'JavaScript', 'PHP', 'Dart', 'Lua'];
const codeTypesAdd: Array<string> = [];
for (const codeType of codeTypes) {
  codeTypesAdd.push(codeType + 'Code');
}

const generatorKeys = ['import', 'order'];

const opt: any = {};
opt.prefix = 'unknown';
opt.style = 'default_blocks';
opt.help = '';
opt.colour = 'null';

export const defineBlocksWithDt = function (
  blocks: string,
  debugMode = false,
): void {
  // 处理统一换行符
  blocks = blocks.replace(/\r\n/g, '\n');
  blocks = blocks.replace(/\r/g, '\n');
  // 过滤注释内容
  blocks = blocks.replace(/\n\/\/.*\n/g, '\n');
  blocks = blocks.replace(/\/\/.*\n/g, '\n');
  blocks = blocks.replace(/\/\*.*?\*\//g, '\n');
  // 分单元
  const list = blocks.split(/\n\s*\n/);
  for (let item of list) {
    item = item.trim();
    if (item.length == 0) continue;
    if (modeKeys.includes(getKey(item.split('\n')[0]))) {
      for (const line of item.split('\n')) {
        const key = getKey(line);
        if (modeKeys.includes(key)) {
          opt[key] = getValue(line);
        } else {
          console.warn('unknown key: ' + key);
        }
      }
    } else {
      try {
        registerBlock(item, debugMode);
      } catch (e) {
        console.error(e);
      }
    }
  }
};

function registerBlock(item: string, debugMode: boolean): void {
  const block: any = {};
  const lines = item.split('\n');
  if (lines[0].includes(':')) {
    block.type = opt.prefix + '_' + getKey(lines[0]);
    const check = getValue(lines[0]);
    if (check == 'STAT') {
      block.previousStatement = null;
      block.nextStatement = null;
    } else if (check == 'PREV') {
      block.previousStatement = null;
    } else if (check == 'NEXT') {
      block.nextStatement = null;
    } else if (check == 'SINGLE') {
    } else {
      block.output = parseCheck(check);
    }
  } else {
    block.type = opt.prefix + '_' + lines[0].trim();
    block.previousStatement = null;
    block.nextStatement = null;
  }
  block.style = opt.style;
  if (opt.help.length > 0) {
    block.helpUrl = opt.help;
  }
  if (opt.colour != 'null') {
    block.colour = opt.colour;
  }
  let mode = 'msg';
  let msgN = 0;
  let argsN = 0;
  let generators = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (i == 0) continue;
    if (mode == 'msg') {
      if (checkKeys(line, blockKeys)) {
        mode = 'key';
      }
      if (codeTypes.includes(line) || codeTypesAdd.includes(line)) {
        mode = 'code';
      }
    } else if (mode == 'key') {
      if (codeTypes.includes(line) || codeTypesAdd.includes(line)) {
        mode = 'code';
      }
    }
    if (mode == 'msg') {
      const res = parseArgs(line, argsN);
      block['message' + msgN] = res[0];
      block['args' + msgN] = res[1];
      msgN++;
      argsN += res[1].length;
    } else if (mode == 'key') {
      if (line.includes(':')) {
        const key = getKey(line);
        const keyI = blockKeys.indexOf(key);
        if (keyI == -1) continue;
        if (key == 'help') {
          block.helpUrl = block.helpUrl ? block.helpUrl : '' + getValue(line);
        } else if (key == 'inline') {
          block.inputsInline = eval(getValue(line));
        } else {
          block[blockKeysTruth[keyI]] = getValue(line);
        }
      }
    } else if (mode == 'code') {
      if (codeTypes.includes(line) || codeTypesAdd.includes(line)) {
        generators.push(i);
      }
    }
  }
  if (debugMode) {
    console.log(block);
  }
  Blockly.defineBlocksWithJsonArray([block]);
  for (let i = 0; i < generators.length; i++) {
    const start = generators[i];
    const end = generators[i + 1] || lines.length;
    const type = lines[start];
    const code = lines.slice(start + 1, end).join('\n');
    registerGenerator(type, code, block, debugMode);
  }
}

function registerGenerator(
  type: string,
  code: string,
  block: any,
  debugMode: boolean,
): void {
  const lines = code.split('\n');
  let func = function () {};
  const BlocklyT = Blockly;
  let Gene = null;
  if (type.startsWith('Python')) {
    Gene = Python;
  } else if (type.startsWith('JavaScript')) {
    Gene = JavaScript;
  }
  let fs = `func = function(block){\ncode='';\n\n`;
  let argNum = 0;
  for (let i = 0; ; i++) {
    if (block['args' + i]) {
      for (const arg of block['args' + i]) {
        if (arg.type == 'input_value') {
          fs += `let A${argNum} = Gene.valueToCode(block, '${
            arg.name
          }', Gene.ORDER_ATOMIC) || ${Gene.defaultValue(arg.check)}\n`;
        } else if (arg.type == 'input_statement') {
          fs += `let A${argNum} = Gene.statementToCode(block, '${arg.name}') || 'pass\\n'\n`;
        } else if (arg.type == 'input_dummy') {
          fs += `let A${argNum} = ''\n`;
        } else if (arg.type == 'field_variable') {
          fs += `let A${argNum} = Gene.nameDB_.getName(block.getFieldValue('${arg.name}'),BlocklyT.VARIABLE_CATEGORY_NAME)\n`;
        } else if (arg.type == 'field_checkbox') {
          fs += `let A${argNum} = Gene.checkboxToCode(block.getFieldValue('${arg.name}'))\n`;
        } else if (arg.type.startsWith('field_')) {
          fs += `let A${argNum} = block.getFieldValue('${arg.name}')\n`;
        }
        argNum++;
      }
    } else {
      break;
    }
  }
  let first = true;
  let order = 0;
  if (type.startsWith('Python')) {
    order = Python.ORDER_ATOMIC;
    for (let i = 0; i < lines.length; i++) {
      if (checkKeys(lines[i], generatorKeys)) {
        const line = lines[i];
        const key = getKey(line);
        const value = getValue(line);
        if (key == 'import') {
          if (first) {
            fs += '\n';
            first = false;
          }
          fs += `Gene.definitions_['${value.replace(
            / /g,
            '_',
          )}'] = '${value}';\n`;
        } else if (key == 'order') {
          if (value.match(/^[0-9]+$/)) {
            order = parseFloat(value);
          } else {
            order = Python['ORDER_' + value];
          }
        }
        lines.splice(i, 1);
        i--;
      }
    }
    fs += '\n';
    code = lines.join('\n');
    if (type == 'PythonCode') {
      fs += `${code}\n`;
    } else if (type == 'Python') {
      for (let i = 0; i < argNum; i++) {
        while(true){
          let res = code.match(new RegExp('\\$A' + i + '([^0-9]|$)'));
          if (res == null || res.index == null) {
            break;
          }
          let len = res[0].length - 1;
          if (res.index + res.length + 1 == code.length) {
            len++;
          }
          code =
            code.substring(0, res.index) +
            '${A' +
            i +
            '}' +
            code.substring(res.index + len);
        }
      }
      if(block.output === undefined){
        fs += `code = \`${code}\`\n`;
      }else {
        fs += `code = \`${code}\`\n`;
      }
    }
  }
  if (block.output === undefined) {
    fs += `\nreturn code;\n}`;
  } else {
    fs += `\nreturn [code,${order}];\n}`;
  }
  if (debugMode) {
    console.log(fs);
  }
  eval(fs);
  Python[block.type] = func;
}

function parseArgs(msg: string, argsN: number = 0): any {
  const args = [];
  let findStart = 0;
  for (;;) {
    const res = msg.substring(findStart).match(/[\{|\[|\(]/);
    if (res == null) break;
    const start = res.index! + findStart;
    if (msg[start - 2] == '\\') continue;
    const startChar = msg[start];
    const endChar = startChar == '{' ? '}' : startChar == '[' ? ']' : ')';
    let end = msg.indexOf(endChar, start + 1);
    while (end > 0 && msg[end - 1] == '\\') {
      end = msg.indexOf(endChar, end + 1);
    }
    if (end == -1) break;
    findStart = end + 1;

    let inner = msg.substring(start + 1, end).trim();
    const arg: any = {};
    arg.name = 'A' + (argsN + args.length);
    if (startChar == '(') {
      if (inner.startsWith('var ')) {
        arg.type = 'field_variable';
        arg.variable = getKey(inner).substring(4);
        const types = parseCheck(getValue(inner), true);
        arg.variableTypes = types;
        if (types == null || types.length == 0) {
          arg.defaultType = null;
        } else {
          arg.defaultType = types[0];
        }
      } else if (fieldKeys.includes(inner)) {
        arg.type = 'field_' + inner;
      } else if (inner.includes(':') && fieldKeys.includes(getKey(inner))) {
        const key = getKey(inner);
        const value = getValue(inner);
        arg.type = 'field_' + key;
        if (key == 'input') {
          arg.text = value;
        } else if (key == 'number') {
          arg.value = parseFloat(value);
        } else if (key == 'checkbox') {
          arg.checked = eval(value);
        } else if (key == 'angle') {
          arg.angle = parseFloat(value);
        }
      } else {
        console.warn('unknown arg: (' + inner + ')');
      }
    } else if (startChar == '[') {
      arg.type = 'field_dropdown';
      arg.options = [];
      const optionsStr = inner.split('/');
      for (const option of optionsStr) {
        if (option.includes(':')) {
          arg.options.push([getKey(option), getValue(option)]);
        } else {
          arg.options.push([option, option]);
        }
      }
    } else if (startChar == '{') {
      let inKey = inner;
      if (inner.includes(':')) {
        const key = getValue(inner);
        if (key == 'L') {
          arg.align = 'LEFT';
        } else if (key == 'R') {
          arg.align = 'RIGHT';
        } else if (key == 'C') {
          arg.align = 'CENTRE';
        } else if (['LEFT', 'RIGHT', 'CENTER'].includes(key)) {
          arg.align = key;
        }
        inKey = getKey(inner);
      }
      if (inKey == 'STAT' || inKey == '') {
        arg.type = 'input_statement';
      } else {
        arg.type = 'input_value';
        arg.check = parseCheck(inKey);
      }
    }
    args.push(arg);
    msg = msg.substring(0, start) + '%' + args.length + msg.substring(end + 1);
    findStart -= inner.length + 1 - (args.length + '').length;
  }
  return [msg, args];
}

function parseCheck(
  str: string,
  mustArray = false,
): string | Array<string> | null {
  if (str == 'null') return null;
  if (str == 'any') return null;
  const list: Array<string> = [];
  if (str.length == 0) return list;
  for (let item of str.split(',')) {
    item = item.trim();
    item = item.replace('num', 'Number');
    item = item.replace('str', 'String');
    item = item.replace('boo', 'Boolean');
    item = item.replace('list', 'Array');
    list.push(item);
  }
  if (list.length == 1 && !mustArray) return list[0];
  return list;
}

function checkKeys(line: string, keys: Array<string>): boolean {
  if (line.includes(':')) {
    const key = getKey(line);
    if (keys.includes(key)) {
      return true;
    }
  }
  return false;
}

function getKey(block: string): string {
  return block.split(':')[0].trim();
}
function getValue(block: string): string {
  const i = block.indexOf(':');
  if (i == -1) return '';
  return block.substring(i + 1).trim();
}
