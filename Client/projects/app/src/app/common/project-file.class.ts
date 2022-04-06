import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';

export class ProjectFile {
  source?: File;
  path: string;
  name: string;
  type: string;
  url: string;
  code: string;

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
    this.url = url;
    this.code = code;
  }

  open(httpClient?: HttpClient): Observable<string> {
    return from(
      new Promise<string>((resolve, reject) => {
        if (this.code.length == 0) {
          if (this.source) {
            const fr = new FileReader();
            fr.onloadend = () => {
              this.code = fr.result as string;
              resolve(this.code);
            };
            fr.readAsText(this.source);
          } else if (this.url) {
            if (!httpClient) {
              reject('HttpClient is not provided');
              return;
            }
            httpClient
              .get(this.url, { responseType: 'text' })
              .subscribe((code: string) => {
                this.code = code;
                resolve(code);
              });
          } else {
            reject('No one source is provided');
          }
        } else {
          resolve(this.code);
        }
      }),
    );
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
    const ps = path.split('/');
    const name = ps[ps.length - 1];
    const ns = name.split('.');
    return new ProjectFile(path, name, ns[ns.length - 1], '', '');
  }
}
