import { Injectable } from '@angular/core';
import * as JSZip from 'jszip';
import {EMPTY, from, Observable, Subscriber} from 'rxjs';
import * as streamSaver from 'streamsaver';

import { Project, ProjectType } from '../../common/project.class';
import { ProjectFile } from '../../common/project-file.class';
import zip from '../../common/zip';
import { SpaceSaveMode } from '../common/space-modes.enums';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class SpaceFileService {
  constructor(private httpClient: HttpClient) {}

  saveProject(project: Project, mode: SpaceSaveMode): Observable<void> {
    return new Observable<void>(subscriber => {
      if (mode == SpaceSaveMode.Local) {
        project.initAll(this.httpClient).subscribe({
          complete: () => {
            const files = project.files;
            if (project.type == ProjectType.File) {
              this.saveFile(files[0]).subscribe({
                complete: () => subscriber.complete(),
                error: err => subscriber.error(err),
              });
            } else {
              this.saveZip(project.files, project.name).subscribe({
                complete: () => subscriber.complete(),
                error: err => subscriber.error(err),
              });
            }
          }
        })
      }
    })
  }

  saveFile(file: ProjectFile): Observable<void> {
    return new Observable<void>(subscriber => {
      let write = (inputStream: ReadableStream, outputStream: WritableStream) => {
        this.write(inputStream, outputStream).subscribe({
          complete: () => subscriber.complete(),
          error: err => subscriber.error(err),
        });
      };
      file.init(this.httpClient).subscribe({
        complete: () => {
          if(file.gotCode){
            const blob = new Blob([file.code]);
            const outputStream = streamSaver.createWriteStream(file.name, {
              size: blob.size,
            });
            const inputStream = blob.stream();
            write(inputStream, outputStream);
          }else if(file.source){
            const outputStream = streamSaver.createWriteStream(file.name, {
              size: file.source.size,
            });
            const inputStream = file.source.stream();
            write(inputStream, outputStream);
          }else{
            subscriber.error('ProjectFile init error');
          }
        },
        error: err => {
          subscriber.error(err);
        },
      });
    });
  }

  openZip(file: File): Observable<Project> {
    return new Observable<Project>(subscriber => {
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
            subscriber.next(new Project(files));
          },
          (error) => {
            subscriber.error(error);
          },
        );
      });
    });
  }

  saveZip(files: ProjectFile[], name: string): Observable<void> {
    return new Observable<void>(subscriber => {
      const inputStream = zip.createWriter({
        start(ctrl: any) {
          for (const file of files) {
            if (!file.gotCode) {
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
        error: err => subscriber.error(err),
      });
    })

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
