import * as esprima from 'esprima';
import { StringUtils } from './string.utils';
import * as Blockly from "blockly";

export class CodeUtils {
  static getBlockStartStr(type = 'js'): string {
    if (type === 'js') {
      return '//------ 图形块结构记录 请勿随意修改 ------\n/*';
    } else if (type === 'py') {
      return '#------ 图形块结构记录 请勿随意修改 ------\n"""';
    } else {
      return '';
    }
  }
  static getBlockEndStr(type = 'js'): string {
    if (type === 'js') {
      return '*/\n';
    } else if (type === 'py') {
      return '"""\n';
    } else {
      return '';
    }
  }

  static workspaceToCode(workspace: Blockly.WorkspaceSvg, type = 'js'): string {
    let code = '';
    if (type == 'js') {
      code = Blockly.JavaScript.workspaceToCode(workspace);
      if(code.includes('$ui.')){
        code = '"ui";\n\n' + code;
      }
    } else if (type == 'py') {
      // @ts-ignore
      Blockly.Python.moduleClassIndex = 1;
      code = Blockly.Python.workspaceToCode(workspace);
    }
    return code;
  }
  static getBlockXml(code: string, type = 'js'): string {
    code = code.replace(/\r\n/g, '\n');
    let i = code.indexOf(CodeUtils.getBlockStartStr(type));
    if (i == -1) {
      return '';
    } else {
      i += CodeUtils.getBlockStartStr(type).length;
      const length = code.substring(i).indexOf(CodeUtils.getBlockEndStr(type));
      return code.substring(i, i + length);
    }
  }
  static connectBlockXml(code: string, xml: string, type = 'js'): string {
    xml = xml.replace(
      'xmlns="https://developers.google.com/blockly/xml"',
      'xmlns="https://logic.autojs.org/xml"',
    );
    return (
      code +
      '\n\n\n' +
      CodeUtils.getBlockStartStr(type) +
      xml +
      CodeUtils.getBlockEndStr(type)
    );
  }
  static toLogicFile(code: string, type = 'js'): string {
    const defaultXml = '<xml xmlns="https://logic.autojs.org/xml"></xml>';
    if (type == 'js') {
      return CodeUtils.connectBlockXml(code, defaultXml);
    } else if (type == 'py') {
      return CodeUtils.connectBlockXml(code, defaultXml, type);
    } else {
      return '';
    }
  }

  static getXmlCodeList(code: string): XmlResult[] {
    let result: XmlResult[] = [];
    let syntax = null;
    try {
      syntax = esprima.parseScript(code, { jsx: true, loc: true, range: true });
    } catch (e) {
      console.warn('语法有误，解析失败');
      return [];
    }
    function search(obj: any) {
      if (typeof obj == 'string') {
      } else if (Array.isArray(obj)) {
        for (let i = 0; i < obj.length; i++) {
          search(obj[i]);
        }
      } else if (obj.type) {
        if (obj.type === 'JSXElement') {
          if (obj.closingElement) {
            result.push(
              new XmlResult(
                [
                  obj.openingElement.loc.start.line,
                  obj.closingElement.loc.end.line,
                ],
                [obj.openingElement.range[0], obj.closingElement.range[1]],
              ),
            );
          } else {
            result.push(
              new XmlResult(
                [
                  obj.openingElement.loc.start.line,
                  obj.openingElement.loc.end.line,
                ],
                obj.openingElement.range,
              ),
            );
          }
          let res = result[result.length - 1];
          res.indent = StringUtils.countLastN(code, res.range[0] - 1);
          res.tip = StringUtils.getLineContain(
            code,
            StringUtils.getLastNotSpaceIndex(code, res.range[0] - 1),
          );
          res.tip = res.tip.substring(StringUtils.countLikeSpaceFront(res.tip));
          if (res.tip.length > 10) {
            res.tip = res.tip.substring(0, 10) + '...';
          } else {
            res.tip = res.tip.substring(0, res.tip.length - 1) + '..';
          }
          res.tip += ' [line:' + res.line[0] + '~' + res.line[1] + ']';
        } else {
          let values = Object.values(obj);
          for (let i = 0; i < values.length; i++) {
            if (values[i]) {
              search(values[i]);
            }
          }
        }
      }
    }
    search(syntax.body);
    return result;
  }
}

export class XmlResult {
  range: [number, number];
  line: [number, number];
  indent: number;
  tip: string;

  constructor(
    line: [number, number],
    range: [number, number],
    indent: number = 0,
    tip: string = '',
  ) {
    this.range = range;
    this.line = line;
    this.indent = indent;
    this.tip = tip;
  }

  isEmpty(): boolean {
    return this.range[0] == -1;
  }

  static createEmpty(): XmlResult {
    return new XmlResult([-1, -1], [-1, -1], -1, '暂无XML');
  }
}
