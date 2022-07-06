export class FileUtils {
  static getIconByFileName(name: string): string {
    const nameSp = name.split('.');
    const nameLast = nameSp[nameSp.length - 1];
    const hadList =
      'java js jsx ts tsx html xhtml xml css xsd yaml properties gql'.split(
        ' ',
      );
    const zipList = 'zip rar 7z'.split(' ');
    const picList = 'jpg png jpeg ico logo bmp'.split(' ');
    if (name == 'project.json') {
      return 'icon-file-config';
    } else if (hadList.includes(nameLast)) {
      return 'icon-file-' + nameLast;
    } else if (nameLast == 'py') {
      return 'icon-file-python';
    } else if (zipList.includes(nameLast)) {
      return 'icon-file-archive';
    } else if (picList.includes(nameLast)) {
      return 'icon-file-pic';
    } else if (nameSp.length == 1) {
      return 'icon-file-unknown';
    } else {
      return 'icon-file-text';
    }
  }

  static getLanguageByFileType(type: string): string {
    const languages = [
      'javascript js jsx',
      'typescript ts tsx',
      'python py',
      'java java',
      'kotlin kt',
      'java java',
      'html htm html',
      'xml xml config',
      'sql sql',
      'css css',
      'less less',
      'scss scss',
      'json json',
      'yaml yml yaml',
      'markdown md',
    ];
    for (const language of languages) {
      const lan = language.split(' ');
      for (const i in lan) {
        if (i == '0') continue;
        if (type == lan[i]) {
          return lan[0];
        }
      }
    }
    return 'plaintext';
  }
}
