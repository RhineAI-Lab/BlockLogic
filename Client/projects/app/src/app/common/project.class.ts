import { ProjectFile } from './project-file.class';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProjectFolder } from './project-folder.class';

export class Project {
  target = -1;
  folders: ProjectFolder[] = [];
  handle?: FileSystemDirectoryHandle;

  constructor(
    public files: ProjectFile[],
    public engine: ProjectEngine = ProjectEngine.BLogic,
  ) {
    if (files.length >= 1) {
      this.checkFolders();
      this.sortFilesByPath();
      this.sortFoldersByPath();
      this.target = this.findDefaultTarget();
    }
  }

  get name(): string {
    if (this.files.length > 0) {
      return this.files[0].path.split('/')[0];
    } else if (this.folders.length > 0) {
      return this.folders[0].path.split('/')[0];
    } else {
      return 'Project';
    }
  }
  get type(): ProjectType {
    return this.files.length == 1 ? ProjectType.File : ProjectType.Folder;
  }

  getFileByPath(path: string): ProjectFile | null {
    for (let i = 0; i < this.files.length; i++) {
      if (this.files[i].path === path) {
        return this.files[i];
      }
    }
    return null;
  }
  getFolderByPath(path: string): ProjectFolder | null {
    for (const folder of this.folders) {
      if (folder.path == path) {
        return folder;
      }
    }
    return null;
  }

  async addFile(path: string, code: string = ''): Promise<void> {
    const file = ProjectFile.makeProjectFileByCode(code, path);
    const parent = this.getFolderByPath(file.parentPath);
    console.log(this)
    if (parent && parent.handle) {
      file.handle = await parent.handle.getFileHandle(file.name, {
        create: true,
      });
      file.savedCode = '';
    }
    this.files.push(file);
    this.sortFilesByPath();
  }
  async addFolder(path: string): Promise<void> {
    const folder = new ProjectFolder(path);
    const parent = this.getFolderByPath(folder.parentPath);
    if (parent && parent.handle) {
      folder.handle = await parent.handle.getDirectoryHandle(folder.name, {
        create: true,
      });
    }
    this.folders.push(folder);
    this.sortFoldersByPath();
  }

  getTargetFile(): ProjectFile {
    return this.files[this.target];
  }
  changeTargetFile(filePath: string): boolean {
    const file = this.getFileByPath(filePath);
    if (file) {
      this.target = this.files.indexOf(file);
      return true;
    } else {
      return false;
    }
  }

  initAll(httpClient?: HttpClient): Observable<void> {
    return new Observable<void>((observer) => {
      let initialized: string[] = [];
      this.files.forEach((file) => {
        if (file.opened || file.source) {
          observer.next();
          initialized.push(file.path);
          if (initialized.length == this.files.length) {
            observer.complete();
          }
        } else {
          file.init(httpClient).subscribe({
            complete: () => {
              initialized.push(file.path);
              if (initialized.length == this.files.length) {
                observer.next();
                observer.complete();
              }
            },
          });
        }
      });
    });
  }

  sortFilesByPath(): void {
    this.files.sort((a: ProjectFile, b: ProjectFile): number => {
      const al = a.path.split('/');
      const bl = b.path.split('/');
      for (let i = 0; i < al.length; i++) {
        if (i == bl.length - 1) {
          if (i == al.length - 1) {
            return al[i] > bl[i] ? 1 : -1;
          } else {
            return -1;
          }
        } else {
          if (i == al.length - 1) {
            return 1;
          } else {
            if (al[i] != bl[i]) {
              return al[i] > bl[i] ? 1 : -1;
            }
          }
        }
      }
      return 1;
    });
  }
  sortFoldersByPath(): void {
    this.folders.sort((a: ProjectFolder, b: ProjectFolder): number => {
      const al = a.path.split('/');
      const bl = b.path.split('/');
      for (let i = 0; i < al.length; i++) {
        if (i == bl.length) {
          break;
        }
        if (al[i] != bl[i]) {
          return al[i] > bl[i] ? 1 : -1;
        }
      }
      return 1;
    });
  }
  checkFolders(): void {
    for (const file of this.files) {
      const ps = file.path.split('/');
      let nowPath = ps[0];
      for (let i = 0; i < ps.length - 1; i++) {
        if (this.getFolderByPath(nowPath) == null) {
          this.folders.push(new ProjectFolder(nowPath));
        }
        nowPath += '/' + ps[i + 1];
      }
    }
  }
  checkAllHandle(): boolean {
    let fullHandle = true;
    for (const file of this.files) {
      if (!file.handle) {
        fullHandle = false;
        break;
      }
    }
    return fullHandle;
  }

  findDefaultTarget(): number {
    const mainFileList = 'main.js index.js'.split(' ');
    let jsFile = -1;
    for (const filesKey in this.files) {
      const file = this.files[filesKey];
      if (mainFileList.includes(file.name)) {
        return parseInt(filesKey, 10);
      } else if (file.type == 'js') {
        jsFile = parseInt(filesKey, 10);
      }
    }
    if (jsFile !== -1) return jsFile;
    for (const filesKey in this.files) {
      if (ProjectFile.SUPPORT_TYPE_LIST.includes(this.files[filesKey].type))
        return parseInt(filesKey, 10);
    }
    return jsFile;
  }

  static getDefaultProject(): Project {
    return new Project(
      [ProjectFile.makeProjectFileByUrl('default-code.js', 'Project/main.js')],
      ProjectEngine.BLogic,
    );
  }
}

export enum ProjectType {
  File,
  Folder,
}

export enum ProjectEngine {
  BLogic,
  AutoJs,
  Harmony,
  PyTorch,
}
