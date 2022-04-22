
export class ProjectFolder {

  path: string;
  name: string;
  handle?: FileSystemFileHandle;

  constructor(path: string, handle?: FileSystemFileHandle) {
    this.path = path;
    const ps = path.split('/');
    this.name = ps[ps.length - 1];
    this.handle = handle;
  }

  renamePath(newPath: string): void {
    this.path = newPath;
    const ps = this.path.split('/');
    this.name = ps[ps.length - 1];
  }

}

declare class FileSystemFileHandle {
  constructor(file: File);
  getFile(): File;
  createWritable(): WritableStream;
}
