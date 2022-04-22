import { Injectable } from '@angular/core';
import * as JSZip from 'jszip';
import { from, Observable } from 'rxjs';
import * as streamSaver from 'streamsaver';

import { Project } from '../../common/project.class';
import { ProjectFile } from '../../common/project-file.class';
import zip from '../../common/zip';
import { SpaceOpenMode, SpaceSaveMode } from '../common/space-modes.enums';
import { HttpClient } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {
  SpaceDevelopService,
  SpaceLocationMode,
} from './space-develop.service';
import { ParaUtils } from '../../common/utils/para.utils';
import { SpaceState } from './space-state.service';
import { ProjectFolder } from '../../common/project-folder.class';

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

  // OPEN
  openProject(mode: SpaceOpenMode): void {
    if (mode == SpaceOpenMode.LocalFile) {
      this.openLocalFile();
    } else if (mode == SpaceOpenMode.LocalFolder) {
      this.openLocalFolder();
    }
  }

  // OPEN-1  Get project from url
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
              this.openProjectFinal(new Project(files));
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
              this.openProjectFinal(new Project(files));
            }
          },
          error: (err) => {
            openError();
          },
        });
      } else {
        this.developService.openProject(Project.getDefaultProject(), false);
      }
    }
  }

  // OPEN-2  Zip
  openZipFile(file: File): void {
    if (file == undefined) return;
    this.openZipDo(file).subscribe((project: Project) => {
      if (project.files.length == 0) {
        this.notify('打开项目失败', 'error', '项目为空');
      } else {
        this.openProjectFinal(project);
      }
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

  // OPEN-3  Browser
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
      this.openProjectFinal(new Project(projectFiles));
    } else {
      this.notify('浏览器中无项目', 'error');
    }
  }

  // OPEN-4  LocalFiles Default
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
      this.openProjectFinal(new Project([projectFile]));
    }
  }

  // OPEN-5 LocalFile
  async openLocalFile(): Promise<void> {
    let fileHandleList: FileSystemFileHandle[] = [];
    try {
      fileHandleList.push((await window.showOpenFilePicker())[0]);
    } catch (e) {}
    if (fileHandleList.length > 0) {
      const handle = fileHandleList[0];
      const file = await handle.getFile();
      const projectFile = ProjectFile.makeProjectFileByFile(
        file,
        'Project/' + file.name,
      );
      projectFile.handle = handle;
      const project = new Project([projectFile]);
      this.openProjectFinal(project);
    }
  }

  // OPEN-6 LocalFolder
  async openLocalFolder(): Promise<void> {
    const rootHandle: FileSystemDirectoryHandle =
      await window.showDirectoryPicker();
    const files: ProjectFile[] = [];
    const folders: ProjectFolder[] = [];
    async function parseFolder(
      handle: FileSystemDirectoryHandle,
      path: string,
    ): Promise<void> {
      const projectFolder = new ProjectFolder(handle.name);
      projectFolder.handle = handle;
      folders.push(projectFolder);
      for await (const entry of handle.values()) {
        if (entry.kind == 'file') {
          const file = await entry.getFile();
          const projectFile = ProjectFile.makeProjectFileByFile(
            file,
            path + '/' + file.name,
          );
          projectFile.handle = entry;
          files.push(projectFile);
        } else if (entry.kind == 'directory') {
          await parseFolder(entry, path + '/' + entry.name);
        }
      }
    }
    await parseFolder(rootHandle, rootHandle.name);
    const project = new Project(files);
    project.folders = folders;
    this.openProjectFinal(project);
  }

  openProjectFinal(project: Project): void {
    if (project.files.length == 0) {
      this.notify('打开项目失败', 'error', '项目为空');
    } else {
      this.developService.openProject(project);
    }
  }

  // SAVE
  async saveProject(mode: SpaceSaveMode): Promise<void> {
    const project = this.developService.project$.getValue();
    if (project.files.length == 0) {
      this.notify('项目中无文件', 'warning');
      return;
    }
    let handle;
    if (mode == SpaceSaveMode.Another) {
      if (project.files.length == 1) {
        const file = project.files[0];
        const options = this.makeSavePickerOptions(file);
        try {
          handle = await window.showSaveFilePicker(options);
        } catch (e) {}
        if (handle) {
          if (!file.handle) {
            file.handle = handle;
          }
        }
      } else {
        this.notify('多文件项目不支持另存', 'error');
        return;
      }
    } else if (mode == SpaceSaveMode.Local) {
      if (project.files.length == 1) {
        const file = project.files[0];
        if (file.handle) {
          handle = file.handle;
        }
      }
    }
    this.notify('保存中...');
    if (
      mode == SpaceSaveMode.Local &&
      project.files.length > 1 &&
      project.checkAllHandle()
    ) {
      this.saveProjectHandle(project).subscribe({
        next: (num) => {
          this.state.projectState$.next('项目保存成功 共改动' + num + ' 个文件');
          this.notify('保存成功', 'success', '共改动' + num + '个文件');
        },
        error: (err) => {
          this.state.projectState$.next('项目保存失败');
          this.notify('保存失败', 'error', err);
        },
      });
    } else {
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
  }
  saveProjectHandle(project: Project) {
    return new Observable<number>((subscriber) => {
      let needSave = [];
      let completeNum = 0;
      for (const file of project.files) {
        if (file.handle && file.opened && file.code != file.savedCode) {
          needSave.push(file);
        }
      }
      if (needSave.length == 0) {
        subscriber.next(needSave.length);
        return;
      }
      this.state.projectState$.next('项目保存中... 进度: 0/' + needSave.length);
      for (const file of needSave) {
        file.handle?.createWritable().then((outputStream) => {
          outputStream.write(file.code).then(() => {
            file.savedCode = file.code;
            completeNum++;
            this.state.projectState$.next(
              `项目保存中... 进度: ${completeNum}/${needSave.length} 文件: ${file.name}`,
            );
            outputStream.close();
            if (completeNum == needSave.length) {
              subscriber.next(needSave.length);
            }
          });
        });
      }
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
            if (project.files.length == 1) {
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
            if (handle) {
              handle.createWritable().then((outputStream) => {
                outputStream.write(file.code).then(() => {
                  file.savedCode = file.code;
                  outputStream.close();
                  subscriber.complete();
                });
              });
            } else {
              const outputStream = streamSaver.createWriteStream(file.name, {
                size: blob.size,
              });
              const inputStream = blob.stream();
              write(inputStream, outputStream);
            }
          } else if (file.source) {
            const inputStream = file.source.stream();
            if (handle) {
              handle.createWritable().then((outputStream) => {
                inputStream.pipeTo(outputStream).then(() => {
                  outputStream.close();
                  subscriber.complete();
                });
              });
            } else {
              const outputStream = streamSaver.createWriteStream(file.name, {
                size: file.source.size,
              });
              write(inputStream, outputStream);
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

interface BrowserFile {
  path: string;
  content: string;
  file: string;
}
