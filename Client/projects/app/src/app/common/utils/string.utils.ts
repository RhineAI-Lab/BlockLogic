export class StringUtils {
  static checkIP(value: string): boolean {
    const exp =
      /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    const reg = value.match(exp);
    return reg != null;
  }

  //数上一个换行符距离
  static countLastN(str: string, start: number): number {
    for (let i = start; i >= 0; i--) {
      if (str.charAt(i) === '\n') {
        return start - i;
      }
    }
    return start;
  }

  //查找上一个非空字符坐标
  static getLastNotSpaceIndex(str: string, index: number): number {
    for (let i = index; i >= 0; i--) {
      if (!StringUtils.isSpaceChar(str.charAt(i))) {
        return i;
      }
    }
    return -1;
  }

  //数开头[空类字符]数
  static countLikeSpaceFront(str: string): number {
    for (let i = 0; i < str.length; i++) {
      if (!StringUtils.isSpaceChar(str.charAt(i))) {
        return i;
      }
    }
    return str.length;
  }

  //获取字符坐标所在行
  static getLineContain(str: string, index: number): string {
    let lineNum = 0;
    let start = 0;
    let end = str.length;
    let flag = false;
    for (let i = 0; i < str.length; i++) {
      if (i == index) {
        flag = true;
      }
      if (str.charAt(i) == '\n') {
        if (!flag) {
          start = i;
        } else {
          end = i;
          break;
        }
        lineNum++;
      }
    }
    return str.substring(start + 1, end);
  }

  //检查是否为空白字符
  static isSpaceChar = function (char: string) {
    return char === ' ' || char === '\n' || char === '\t' || char === '\r';
  };
}
