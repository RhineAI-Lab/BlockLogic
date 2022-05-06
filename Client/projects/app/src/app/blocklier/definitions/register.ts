
import * as Blockly from 'blockly';

const modeKeys = ['prefix', 'style', 'url'];

const blockKeys = ['style', 'inline', 'help', 'tip', 'mutator'];
const blockKeysTruth = ['style', 'inline', 'helpUrl', 'tooltip', 'mutator'];

const fieldKeys = ['input', 'checkbox', 'image', 'angle', 'colour', 'label'];

const codeTypes = ['Python', 'JavaScript', 'PHP', 'Dart', 'Lua'];
const codeTypesAdd: Array<string> = [];
for (const codeType of codeTypes) {
  codeTypesAdd.push(codeType + 'Code');
}

const generatorKeys = ['import'];

let prefix = 'unknown';
let style = 'default_blocks';
let help = '';

export const defineBlocksWithText = function (blocks: string): void {
  const list = blocks.split(/\n\s*\n/);
  for (let item of list) {
    item = item.trim();
    if (item.length == 0) continue;
    if (modeKeys.includes(getKey(item.split('\n')[0]))) {
      for (const line of item.split('\n')) {
        const key = getKey(line);
        if (key == 'prefix') {
          prefix = getValue(line);
        } else if (key == 'style') {
          style = getValue(line);
        } else if (key == 'help') {
          help = getValue(line);
        } else {
          console.warn('unknown key: ' + key);
        }
      }
    } else {
      try {
        registerBlock(item);
      } catch (e) {
        console.error(e);
      }
    }
  }
}

function registerBlock(item: string): void {
  const block: any = {};
  const lines = item.split('\n');
  console.log(lines);
  block.type = prefix + '_' + getValue(lines[0]);
  const check = getKey(lines[0]);
  if (check == 'STAT') {
    block.previousStatement = null;
    block.nextStatement = null;
  } else {
    block.output = parseCheck(check);
  }
  block.style = style;
  block.helpUrl = help;
  let mode = 'msg';
  let msgN = 0;
  let generators = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (i == 0) continue;
    if (mode == 'msg') {
      if (checkKeys(line, blockKeys)) {
        mode = 'key';
      }
    } else if (mode == 'key') {
      if (codeTypes.includes(line) || codeTypesAdd.includes(line)) {
        mode = 'code';
      }
    }
    if (mode == 'msg') {
      const res = parseArgs(line);
      block['message' + msgN] = res[0];
      block['args' + msgN] = res[1];
    } else if (mode == 'key') {
      if (lines.includes(':')) {
        const key = getKey(line);
        const keyI = blockKeys.indexOf(key);
        if (keyI == -1) continue;
        if (key == 'help') {
          block.helpUrl = block.helpUrl + getValue(line);
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
  console.log(block);
  Blockly.defineBlocksWithJsonArray([block]);
  for (let i = 0; i < generators.length; i++) {
    const start = generators[i];
    const end = generators[i + 1] || lines.length;
    const type = lines[start];
    const code = lines.slice(start + 1, end).join('\n');
    registerGenerator(type, code, block);
  }
}

function registerGenerator(type: string, code: string, block: any): void {
  if (type.startsWith('Python')) {
    if (type == 'PythonCode') {
    } else if (type == 'Python') {
    }
  }
}

function parseArgs(msg: string): any {
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
    if (end == -1) continue;
    findStart = end + 1;

    const inner = msg.substring(start + 1, end).trim();
    const arg: any = {};
    arg.name = 'C'+args.length
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
      } else {
        console.warn('unknown arg: (' + inner + ')');
      }
    } else if (startChar == '[') {
      arg.type = 'field_dropdown';
    } else if (startChar == '{') {
      if (inner == 'STAT') {
        arg.type = 'input_statement';
      } else {
        arg.type = 'input_value';
      }
    }

    args.push(arg);
    msg = msg.substring(0, start) + '%'+args.length + msg.substring(end + 1);
    findStart -= inner.length + 2 -1 - (''+args.length).length;

  }
  return [msg, args];
}

function parseCheck(
  str: string,
  mustArray = false,
): string | Array<string> | null {
  if (str == 'null') return null;
  const list: Array<string> = [];
  if (str.length == 0) return list;
  for (let item of str.split('|')) {
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


