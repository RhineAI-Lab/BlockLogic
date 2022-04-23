
export class ProjectFolder {

  path: string;
  name: string;
  handle?: FileSystemDirectoryHandle;

  constructor(path: string, handle?: FileSystemDirectoryHandle) {
    this.path = path;
    const ps = path.split('/');
    this.name = ps[ps.length - 1];
    this.handle = handle;
  }

  get parentPath(): string {
    return this.path.substring(0, this.path.lastIndexOf('/'));
  }


  renamePath(newPath: string): void {
    this.path = newPath;
    const ps = this.path.split('/');
    this.name = ps[ps.length - 1];
  }

}

