export class ProjectFile {
  source: File;
  path: string;
  name: string;
  type: string;
  code = '';

  constructor(source: File) {
    this.source = source;
    this.path = source.webkitRelativePath;
    this.name = source.name;
    const ns = this.name.split('.');
    this.type = ns[ns.length - 1];
  }
}
