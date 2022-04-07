import { Injectable } from '@angular/core';
import * as JSZip from 'jszip';
import {EMPTY, from, Observable, Subscriber} from 'rxjs';
import * as streamSaver from 'streamsaver';

import { Project, ProjectType } from '../../common/project.class';
import { ProjectFile } from '../../common/project-file.class';
import zip from '../../common/zip';
import { SpaceSaveMode } from '../common/space-modes.enums';

@Injectable({
  providedIn: 'root',
})
export class SpaceFileService {
  constructor() {}

  saveProject(project: Project, mode: SpaceSaveMode): Observable<void> {
    if (mode == SpaceSaveMode.Local) {
      const files = project.files;
      if (project.type == ProjectType.File) {
        return this.saveFile(files[0]);
      } else {
        return this.saveZip(project.files, project.name);
      }
    }
    return EMPTY;
  }

  saveFile(file: ProjectFile): Observable<void> {
    const observable = new Observable<void>(subscriber => {
      let write = (inputStream: ReadableStream, outputStream: WritableStream) => {
        this.write(inputStream, outputStream).subscribe({
          next: () => {
            subscriber.next();
          },
          complete: () => {
            subscriber.complete();
          },
          error: err => {
            subscriber.error(err);
          },
        });
      };
      if (file.code.length == 0 && file.source) {
        let fileEnd = (source: File) => {
          const outputStream = streamSaver.createWriteStream(file.name, {
            size: source.size,
          });
          const inputStream = source.stream();
          write(inputStream, outputStream);
        }
        if (file.source instanceof File) {
          fileEnd(file.source);
        }else{
          file.source.async('arraybuffer').then(buffer => {
            file.source = new File([buffer], file.name);
            fileEnd(file.source);
          });
        }
      } else {
        const blob = new Blob([file.code]);
        const outputStream = streamSaver.createWriteStream(file.name, {
          size: blob.size,
        });
        const inputStream = blob.stream();
        write(inputStream, outputStream);
      }
    });
    return observable;
  }

  openZip(file: File): Observable<Project> {
    return new Observable<Project>((observer) => {
      file.arrayBuffer().then((buffer) => {
        new JSZip().loadAsync(buffer).then(
          (zip) => {
            const files: ProjectFile[] = [];
            zip.forEach((relativePath, file) => {
              if (file.dir) return;
              const projectFile = ProjectFile.makeProjectFileByFile(
                file, relativePath,
              );
              files.push(projectFile);
            });
            observer.next(new Project(files));
          },
          (error) => {
            observer.error(error);
          },
        );
      });
    });
  }

  saveZip(files: ProjectFile[], name: string): Observable<void> {
    const inputStream = zip.createWriter({
      start(ctrl: any) {
        for (const file of files) {
          if (file.code.length == 0) {
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
    return this.write(inputStream, outputStream);
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
}
