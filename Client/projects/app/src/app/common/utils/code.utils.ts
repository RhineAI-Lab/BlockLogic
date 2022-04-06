export class CodeUtils {
  static blockStartStr = '//------ 图形块结构记录 请勿随意修改 ------\n/*';

  static getBlockXml(code: string): string {
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
}
