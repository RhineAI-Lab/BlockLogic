import { Injectable } from '@angular/core';
import * as JSZip from 'jszip';
import { from, Observable } from 'rxjs';
import * as streamSaver from 'streamsaver';

import { Project, ProjectType } from '../../common/project.class';
import { ProjectFile } from '../../common/project-file.class';
import zip from '../../common/zip';
import { SpaceSaveMode } from '../common/space-modes.enums';
import { HttpClient } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {
  SpaceDevelopService,
  SpaceLocationMode,
} from './space-develop.service';
import { ParaUtils } from '../../common/utils/para.utils';
import { SpaceState } from './space-state.service';

@Injectable()
export class SpaceFileService {
  constructor(
    private httpClient: HttpClient,
    private notification: NzNotificationService,
    private state: SpaceState,
    private developService: SpaceDevelopService,
  ) {}

  init(): void {
    const source = ParaUtils.getUrlParameter('source');
    const location = ParaUtils.getUrlParameter('location');
    this.openProjectFrom(source, location);
  }

  // OPEN-0  Get project from url
  openProjectFrom(source: string, location: string): void {
    if (location == SpaceLocationMode.Browser) {
    } else if (location == SpaceLocationMode.Cloud) {
    } else if (location == SpaceLocationMode.Public || location == '') {
      if (source != '') {
        let url = 'assets/example/' + source;
        if (url.endsWith('/')) {
          url = url + 'files.txt';
        }
        const openError = () => {
          this.notify('打开项目失败', 'error', '服务器资源不存在');
          // this.state.emptyCenter$.next();
          this.developService.openProject(Project.getDefaultProject(), false);
        };
        this.httpClient.get(url, { responseType: 'text' }).subscribe({
          next: (text) => {
            if (text.startsWith('<!DOCTYPE html><html lang="zh"><head>')) {
              openError();
            } else if (!source.endsWith('/')) {
              const ps = source.split('/');
              const name = ps[ps.length - 1];
              const files: ProjectFile[] = [
                ProjectFile.makeProjectFileByCode(text, 'Project/' + name),
              ];
              this.developService.openProject(new Project(files));
            } else {
              const lines = text.split('\n');
              const files: ProjectFile[] = [];
              const name = lines[0];
              for (let i = 1; i < lines.length; i++) {
                if (lines[i] == '') {
                  continue;
                }
                files.push(
                  ProjectFile.makeProjectFileByUrl(
                    source + lines[i],
                    name + '/' + lines[i],
                  ),
                );
              }
              this.developService.openProject(new Project(files));
            }
          },
          error: (err) => {
            openError();
          },
        });
      } else {
        this.developService.openProject(Project.getDefaultProject());
      }
    }
  }

  // OPEN-1  Zip
  openZipFile(file: File): void {
    if (file == undefined) return;
    this.openZipDo(file).subscribe((project: Project) => {
      this.developService.openProject(project);
    });
  }
  openZipDo(file: File): Observable<Project> {
    return new Observable<Project>((subscriber) => {
      file.arrayBuffer().then((buffer) => {
        new JSZip().loadAsync(buffer).then(
          (zip) => {
            const files: ProjectFile[] = [];
            zip.forEach((relativePath, file) => {
              if (file.dir) return;
              const projectFile = ProjectFile.makeProjectFileByFile(
                file,
                relativePath,
              );
              files.push(projectFile);
            });
            subscriber.next(new Project(files));
          },
          (error) => {
            subscriber.error(error);
          },
        );
      });
    });
  }

  // OPEN-2  Browser
  openBrowserProject(): void {
    const filesStr = localStorage.getItem('Project');
    if (filesStr) {
      const projectFiles: ProjectFile[] = [];
      const files = JSON.parse(filesStr);
      for (const file of files) {
        if (file.content.length > 0) {
          projectFiles.push(
            ProjectFile.makeProjectFileByCode(file.content, file.path),
          );
        } else {
          projectFiles.push(
            ProjectFile.makeProjectFileByFile(
              dataToFile(file.file, ''),
              file.path,
            ),
          );
        }
      }
      this.developService.openProject(new Project(projectFiles));
    } else {
      this.notify('浏览器中无项目', 'error');
    }
  }

  // OPEN-3  LocalFiles
  openLocalFiles(files: File[]): void {
    if (files.length > 1) {
      const projectFiles: ProjectFile[] = [];
      for (const file of files) {
        projectFiles.push(
          ProjectFile.makeProjectFileByFile(file, file.webkitRelativePath),
        );
      }
      this.developService.openProject(new Project(projectFiles));
    } else if (files.length == 1) {
      const projectFile = ProjectFile.makeProjectFileByFile(
        files[0],
        'Project/' + files[0].name,
      );
      this.developService.openProject(new Project([projectFile]));
    }
  }

  makeSavePickerOptions(file: ProjectFile): any {
    const accept: any = {};
    let desciption = '';
    if (file.type == 'py') {
      accept['text/python'] = ['.py'];
      desciption = 'Python';
    } else if (file.type == 'js') {
      accept['text/javascript'] = ['.js'];
      desciption = 'JavaScript';
    } else if (file.type == 'json') {
      accept['application/json'] = ['.json'];
      desciption = 'JSON';
    } else {
      desciption = file.type + '文件';
    }
    return {
      suggestedName: file.name,
      types: [
        {
          description: desciption,
          accept: accept,
        },
      ],
    };
  }

  // SAVE
  async saveProject(
    mode: SpaceSaveMode,
    another: boolean = false,
  ): Promise<void> {
    const project = this.developService.project$.getValue();
    let handle = null;
    if (another) {
      if (project.files.length == 1) {
        const file = project.files[0];
        const options = this.makeSavePickerOptions(file);
        try {
          handle = await window.showSaveFilePicker(options);
        } catch (e) {}
        if (handle == null) {
          return;
        } else {
          if (!file.handle) {
            file.handle = handle;
          }
        }
      }
    }
    this.notify('保存中...');
    this.saveProjectDo(project, mode, handle).subscribe({
      complete: () => {
        this.state.projectState$.next('项目保存成功');
        this.notify('保存成功', 'success');
        if (mode == SpaceSaveMode.Browser) {
          this.notify(
            '注意',
            'warning',
            '浏览器只保存单一项目，重复操作将覆盖！',
          );
        }
      },
      error: (err) => {
        this.state.projectState$.next('项目保存失败');
        this.notify('保存失败', 'error', err);
      },
    });
  }
  saveProjectDo(
    project: Project,
    mode: SpaceSaveMode,
    handle?: FileSystemFileHandle,
  ): Observable<void> {
    return new Observable<void>((subscriber) => {
      project.initAll(this.httpClient).subscribe({
        complete: () => {
          const files = project.files;
          if (mode == SpaceSaveMode.Local || mode == SpaceSaveMode.Another) {
            if (project.type == ProjectType.File) {
              this.saveSingleFile(files[0], handle).subscribe({
                complete: () => subscriber.complete(),
                error: (err) => subscriber.error(err),
              });
            } else {
              this.saveFolder(project.files, project.name).subscribe({
                complete: () => subscriber.complete(),
                error: (err) => subscriber.error(err),
              });
            }
          } else if (mode == SpaceSaveMode.Browser) {
            this.saveBrowser(files).subscribe({
              complete: () => subscriber.complete(),
              error: (err) => subscriber.error(err),
            });
          } else {
            subscriber.error('Save mode unsupported');
          }
        },
      });
    });
  }

  // SAVE-1  SingleFile
  saveSingleFile(
    file: ProjectFile,
    handle?: FileSystemFileHandle,
  ): Observable<void> {
    return new Observable<void>((subscriber) => {
      let write = (
        inputStream: ReadableStream,
        outputStream: WritableStream,
      ) => {
        this.write(inputStream, outputStream).subscribe({
          complete: () => {
            subscriber.complete();
          },
          error: (err) => subscriber.error(err),
        });
      };
      file.init(this.httpClient).subscribe({
        complete: async () => {
          if (file.opened) {
            if (!handle && file.handle) {
              handle = file.handle;
            }
            const blob = new Blob([file.code]);
            let outputStream: WritableStream;
            if (handle) {
              outputStream = await handle.createWritable();
            } else {
              outputStream = streamSaver.createWriteStream(file.name, {
                size: blob.size,
              });
            }
            const inputStream = blob.stream();
            write(inputStream, outputStream);
          } else if (file.source) {
            let outputStream: WritableStream;
            if (handle) {
              outputStream = handle.createWritable();
            } else {
              outputStream = streamSaver.createWriteStream(file.name, {
                size: file.source.size,
              });
            }
            const inputStream = file.source.stream();
            write(inputStream, outputStream);
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

  // SAVE-2  Folder
  saveFolder(files: ProjectFile[], name: string): Observable<void> {
    return new Observable<void>((subscriber) => {
      const inputStream = zip.createWriter({
        start(ctrl: any) {
          for (const file of files) {
            if (!file.opened) {
              ctrl.enqueue(file.source, file.path);
            } else {
              ctrl.enqueue({
                name: file.path,
                stream: () => new Blob([file.code]).stream(),
              });
            }
          }
          ctrl.close();
        },
      });
      const outputStream = streamSaver.createWriteStream(name + '.zip');
      this.write(inputStream, outputStream).subscribe({
        complete: () => subscriber.complete(),
        error: (err) => subscriber.error(err),
      });
    });
  }

  // SAVE-3  Browser
  saveBrowser(files: ProjectFile[]): Observable<void> {
    return new Observable<void>((subscriber) => {
      const saveFiles: BrowserFile[] = [];
      function end() {
        if (saveFiles.length == files.length) {
          localStorage.setItem('Project', JSON.stringify(saveFiles));
          subscriber.complete();
        }
      }
      for (const file of files) {
        if (file.opened) {
          saveFiles.push({
            path: file.path,
            content: file.code,
            file: '',
          });
          end();
        } else {
          const reader = new FileReader();
          reader.onload = (e) => {
            saveFiles.push({
              path: file.path,
              content: '',
              file: reader.result as string,
            });
            end();
          };
          reader.readAsDataURL(file.source!);
        }
      }
    });
  }

  private write(
    inputStream: ReadableStream,
    outputStream: WritableStream,
  ): Observable<void> {
    if (window.WritableStream && inputStream.pipeTo) {
      return from(inputStream.pipeTo(outputStream));
    } else {
      const writer = outputStream.getWriter();
      const reader = inputStream.getReader();
      const pump = async () => {
        reader.read().then((res: any) => {
          if (!res.done) {
            writer.write(res.value).then(pump);
          } else {
            writer.close();
          }
        });
      };
      return from(pump());
    }
  }

  private notify(
    title: string,
    type: 'info' | 'success' | 'warning' | 'error' | 'remove' = 'info',
    content: string = '',
  ): void {
    if (type == 'remove') {
      this.notification.remove();
    } else {
      this.notification.create(type, title, content);
    }
  }
}

declare function dataToFile(dataUrl: string, fileName: string): File;

declare global {
  interface Window {
    showSaveFilePicker(options: any): any;
  }
}

declare class FileSystemFileHandle {
  constructor(file: File);
  getFile(): File;
  createWritable(): WritableStream;
}

interface BrowserFile {
  path: string;
  content: string;
  file: string;
}
