export class BFile {
  sourceFile: File;
  path: string;
  name: string;
  type: string;
  code = '';

  constructor(sourceFile: File) {
    this.sourceFile = sourceFile;
    this.path = sourceFile.webkitRelativePath;
    this.name = sourceFile.name;
    const ns = this.name.split('.');
    this.type = ns[ns.length - 1];
  }
}
