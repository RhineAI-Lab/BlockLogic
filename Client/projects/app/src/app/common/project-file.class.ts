import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JSZipObject } from 'jszip';
import { CodeUtils } from './utils/code.utils';

export class ProjectFile {
  // Source
  zipSource?: JSZipObject; // Uninitialized
  urlSource?: string; // Uninitialized
  source?: File;
  handle?: FileSystemFileHandle;

  // Attr
  path: string;
  name: string;
  type: string;

  // Opened
  code: string;
  codeType: CodeType = CodeType.UNKNOWN;
  get opened(): boolean {
    return this.codeType != CodeType.UNKNOWN;
  }
  get isBlockFile(): boolean {
    return (
      this.codeType == CodeType.PY_BLOCK_DL ||
      this.codeType == CodeType.JS_BLOCK_AUTO
    );
  }

  constructor(
    path: string,
    name: string,
    type: string,
    url: string,
    code: string,
  ) {
    this.path = path;
    this.name = name;
    this.type = type;
    this.urlSource = url;
    this.code = code;
  }

  // init: any source -> file
  init(httpClient?: HttpClient): Observable<void> {
    return new Observable<void>((subscriber) => {
      if (this.opened || this.source) {
        subscriber.complete();
      } else if (this.urlSource) {
        if (!httpClient) {
          subscriber.error('HttpClient is not provided');
          return;
        }
        httpClient
          .get('assets/example/' + this.urlSource, { responseType: 'text' })
          .subscribe({
            next: (code: string) => {
              this.code = code;
              this.analysisCode();
              subscriber.complete();
            },
            error: (err) => {
              subscriber.error(err.status + ' ' + err.statusText);
            },
          });
      } else if (this.zipSource) {
        this.zipSource.async('arraybuffer').then((buffer) => {
          this.source = new File([buffer], this.name);
          subscriber.complete();
        });
      } else {
        subscriber.error('ProjectFile has no source');
      }
    });
  }

  // open: any source | file -> code
  open(httpClient?: HttpClient): Observable<string> {
    return new Observable((subscriber) => {
      this.init(httpClient).subscribe({
        complete: () => {
          if (this.opened) {
            subscriber.next(this.code);
            subscriber.complete();
          } else if (this.source) {
            if (ProjectFile.SUPPORT_TYPE_LIST.includes(this.type)) {
              const reader = new FileReader();
              reader.onload = (e) => {
                this.code = reader.result as string;
                this.analysisCode();
                subscriber.next(this.code);
                subscriber.complete();
              };
              reader.readAsText(this.source);
            } else {
              subscriber.error('Unsupported file type');
            }
          } else {
            subscriber.error('ProjectFile init error');
          }
        },
        error: (err) => {
          subscriber.error(err);
        },
      });
    });
  }

  analysisCode(): void {
    if (!ProjectFile.CODE_TYPE_LIST.includes(this.type)) {
      this.codeType = CodeType.NOT_CODE;
    } else if (this.type == 'js') {
      if (CodeUtils.getBlockXml(this.code).length > 0) {
        this.codeType = CodeType.JS_BLOCK_AUTO;
      } else {
        this.codeType = CodeType.JS_AUTO;
      }
    } else if (this.type == 'py') {
      if (CodeUtils.getBlockXml(this.code).length > 0) {
        this.codeType = CodeType.PY_BLOCK_DL;
      } else {
        this.codeType = CodeType.PY_BASE;
      }
    } else {
      this.codeType = CodeType.OTHER_CODE;
    }
  }

  toBlockFile(): boolean {
    if (this.opened && !this.isBlockFile) {
      if (this.type == 'js') {
        this.code = CodeUtils.toLogicFile(this.code);
        this.codeType = CodeType.JS_BLOCK_AUTO;
        return true;
      }
    }
    return false;
  }

  renamePath(newPath: string): void {
    this.path = newPath;
    const ps = this.path.split('/');
    this.name = ps[ps.length - 1];
    const ns = this.name.split('.');
    this.type = ns[ns.length - 1];
  }

  static makeProjectFileByFile(
    file: File | JSZipObject,
    path: string,
  ): ProjectFile {
    const projectFile = ProjectFile.makeProjectFileByPath(path);
    if (file instanceof File) {
      projectFile.source = file;
    } else {
      projectFile.zipSource = file;
    }
    return projectFile;
  }
  static makeProjectFileByUrl(url: string, path: string): ProjectFile {
    const projectFile = ProjectFile.makeProjectFileByPath(path);
    projectFile.urlSource = url;
    return projectFile;
  }
  static makeProjectFileByCode(code: string, path: string): ProjectFile {
    const projectFile = ProjectFile.makeProjectFileByPath(path);
    projectFile.code = code;
    projectFile.analysisCode();
    return projectFile;
  }

  private static makeProjectFileByPath(path: string): ProjectFile {
    const ps = path.split('/');
    const name = ps[ps.length - 1];
    const ns = name.split('.');
    return new ProjectFile(path, name, ns[ns.length - 1], '', '');
  }

  public static SUPPORT_TYPE_LIST =
    'js ts jsx tsx xml html css vue json java cpp php py txt yaml'.split(' ');
  public static CODE_TYPE_LIST =
    'js ts jsx tsx xml html css vue json java cpp php py'.split(' ');
}

export enum CodeType {
  UNKNOWN,
  NOT_CODE,
  JS_BASE,
  JS_AUTO,
  JS_BLOCK_AUTO,
  PY_BASE,
  PY_BLOCK_DL,
  OTHER_CODE,
}
