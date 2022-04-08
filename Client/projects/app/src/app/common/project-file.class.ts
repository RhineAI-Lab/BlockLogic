import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import {JSZipObject} from "jszip";
import {CodeUtils} from "./utils/code.utils";

export class ProjectFile {
  zipSource?: JSZipObject; // Uninitialized
  urlSource?: string; // Uninitialized
  source?: File;

  path: string;
  name: string;
  type: string;
  code: string;
  gotCode: boolean = false;

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

  init(httpClient?: HttpClient): Observable<void> {
    return new Observable<void>(subscriber => {
      if (this.gotCode||this.source) {
        subscriber.complete();
      }else if(this.urlSource){
        if (!httpClient) {
          subscriber.error('HttpClient is not provided');
          return;
        }
        httpClient
          .get('assets/example/'+this.urlSource, {responseType: 'text'})
          .subscribe({
            next:(code: string) => {
              this.code = code;
              this.gotCode = true;
              subscriber.complete();
            },
            error:(err) => {
              subscriber.error(err.status+' '+err.statusText);
            }
          });
      }else if(this.zipSource) {
        this.zipSource.async('arraybuffer').then(buffer => {
          this.source = new File([buffer], this.name);
          subscriber.complete();
        });
      }else{
        subscriber.error('ProjectFile has no source');
      }
    });
  }

  open(httpClient?: HttpClient): Observable<string> {
    return new Observable(subscriber => {
      this.init(httpClient).subscribe({
        complete:() => {
          if(this.gotCode){
            subscriber.next(this.code);
            subscriber.complete();
          }else if(this.source){
            if(ProjectFile.SUPPORT_OPEN_LIST.includes(this.type)) {
              const reader = new FileReader();
              reader.onload = (e) => {
                this.code = reader.result as string;
                this.gotCode = true;
                subscriber.next(this.code);
                subscriber.complete();
              };
              reader.readAsText(this.source);
            }else{
              subscriber.error('Unsupported file type');
            }
          }else{
            subscriber.error('ProjectFile init error');
          }
        },
        error:(err) => {
          subscriber.error(err);
        }
      });
    });
  }

  isLogicFile(): boolean {
    if(this.gotCode){
      if(this.type=='js'){
        if(CodeUtils.getBlockXml(this.code).length>0){
          return true;
        }
      }
    }
    return false;
  }
  toLogicFile(): boolean {
    if(this.gotCode&&!this.isLogicFile()){
      this.code = CodeUtils.toLogicFile(this.code);
      return true;
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

  static makeProjectFileByFile(file: File | JSZipObject, path: string): ProjectFile {
    const projectFile = ProjectFile.makeProjectFileByPath(path);
    if(file instanceof File) {
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
    projectFile.gotCode = true;
    return projectFile;
  }

  private static makeProjectFileByPath(path: string): ProjectFile {
    const ps = path.split('/');
    const name = ps[ps.length - 1];
    const ns = name.split('.');
    return new ProjectFile(path, name, ns[ns.length - 1], '', '');
  }

  public static SUPPORT_OPEN_LIST = 'js ts jsx tsx xml html css vue json java cpp php python'.split(' ');
}
