
export class BFile{
  sourceFile: File;
  path: string;
  name: string;
  type: string;
  code: string = "";

  constructor(sourceFile: File) {
    this.sourceFile = sourceFile;
    this.path = sourceFile.webkitRelativePath;
    let ps = this.path.split("/")
    this.name = ps[ps.length-1]
    let ns = this.name.split(".")
    this.type = ns[ns.length-1]
  }
}