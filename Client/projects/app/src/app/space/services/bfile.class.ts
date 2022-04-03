export class BFile {
  sourceFile: File;
  path: string;
  name: string;
  type: string;
  code = '';

  constructor(sourceFile: File) {
    this.sourceFile = sourceFile;
    this.path = sourceFile.webkitRelativePath;
    const ps = this.path.split('/');
    this.name = ps[ps.length - 1];
    const ns = this.name.split('.');
    this.type = ns[ns.length - 1];
  }
}
