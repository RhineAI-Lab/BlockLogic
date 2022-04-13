import * as esprima from 'esprima'
import {StringUtils} from "./string.utils";

export class CodeUtils {
  static blockStartStr = '//------ 图形块结构记录 请勿随意修改 ------\n/*';

  static getBlockXml(code: string): string {
    code = code.replace(/\r\n/g, '\n');
    let i = code.indexOf(CodeUtils.blockStartStr);
    if (i == -1) {
      return '';
    } else {
      i += CodeUtils.blockStartStr.length;
      const length = code.substring(i).indexOf('*/');
      return code.substring(i, i + length);
    }
  }
  static connectBlockXml(code: string, xml: string): string {
    xml = xml.replace(
      'xmlns="https://developers.google.com/blockly/xml"',
      'xmlns="https://logic.autojs.org/xml"',
    );
    return code + '\n\n\n' + CodeUtils.blockStartStr + xml + '*/\n';
  }
  static toLogicFile(code: string): string {
    return code+'\n\n\n'+CodeUtils.blockStartStr +
      "<xml xmlns=\"https://logic.autojs.org/xml\"></xml>*/\n";
  }

  static getXmlCodeList(code: string): XmlResult[] {
    let result: XmlResult[] = [];
    let syntax = null;
    try {
      syntax = esprima.parseScript(code,{jsx: true ,loc: true, range: true});
    }catch (e) {
      console.warn("语法有误，解析失败");
      return [];
    }
    function search(obj: any) {
      if(typeof(obj)=='string'){
      }else if(Array.isArray(obj)){
        for (let i = 0; i < obj.length; i++) {
          search(obj[i])
        }
      }else if(obj.type){
        if(obj.type==="JSXElement"){
          if(obj.closingElement){
            result.push({
              line:[obj.openingElement.loc.start.line,obj.closingElement.loc.end.line],
              range:[obj.openingElement.range[0],obj.closingElement.range[1]],
              indent: 0,
              tip: '',
            });
          }else{
            result.push({
              line:[obj.openingElement.loc.start.line,obj.openingElement.loc.end.line],
              range:obj.openingElement.range,
              indent: 0,
              tip: '',
            });
          }
          let res = result[result.length-1];
          res.indent = StringUtils.countLastN(code,res.range[0]-1);
          res.tip = StringUtils.getLineContain(code,StringUtils.getLastNotSpaceIndex(code,res.range[0]-1));
          res.tip = res.tip.substring(StringUtils.countLikeSpaceFront(res.tip));
          if(res.tip.length>10){
            res.tip = res.tip.substring(0,10)+"..."
          }else {
            res.tip = res.tip.substring(0,res.tip.length-1)+".."
          }
        }else {
          let values = Object.values(obj);
          for (let i = 0; i < values.length; i++) {
            search(values[i])
          }
        }
      }
    }
    search(syntax.body);
    return result;
  }
}

export interface XmlResult {
  range: [number, number];
  line: [number, number];
  indent: number;
  tip: string
}