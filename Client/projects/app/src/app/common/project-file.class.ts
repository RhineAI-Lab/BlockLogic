
export class ProjectFile {
  source?: File;
  path: string;
  name: string;
  type: string;
  url: string;
  code: string;

  constructor(path: string, name: string, type: string, url: string, code: string) {
    this.path = path;
    this.name = name;
    this.type = type;
    this.url = url;
    this.code = code;
  }

  static makeProjectFileByFile(file: File, path: string): ProjectFile {
    const projectFile = ProjectFile.makeProjectFileByPath(path);
    projectFile.source = file;
    return projectFile;
  }

  static makeProjectFileByUrl(url: string, path: string): ProjectFile {
    const projectFile = ProjectFile.makeProjectFileByPath(path);
    projectFile.url = url;
    return projectFile;
  }

  static makeProjectFileByCode(code: string, path: string): ProjectFile {
    const projectFile = ProjectFile.makeProjectFileByPath(path);
    projectFile.code = code;
    return projectFile;
  }

  private static makeProjectFileByPath(path: string): ProjectFile {
    let ps = path.split('/');
    let name = ps[ps.length-1];
    let ns = name.split('.');
    return new ProjectFile(path, name, ns[ns.length-1], '', '');
  }
}
