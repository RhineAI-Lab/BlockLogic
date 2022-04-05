import {Injectable} from '@angular/core';
import {EMPTY, from, Observable} from 'rxjs';
import * as streamSaver from 'streamsaver';

import {Project, ProjectType} from '../../common/project.class';
import {ProjectFile} from '../../common/project-file.class';
import zip from '../../common/zip';
import {SpaceSaveMode} from '../common/space-modes.enums';
import * as JSZip from "jszip";

@Injectable({
  providedIn: 'root',
})
export class SpaceFileService {
  constructor() {}

  openZip(file: File): Observable<Project> {
    return from(
      new Promise<Project>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const zip = new JSZip();
          zip.loadAsync(reader.result as ArrayBuffer).then(
            (zip) => {
              const files: ProjectFile[] = [];
              zip.forEach((relativePath, file) => {
                if (file.dir) {
                  return;
                }
                const projectFile = ProjectFile.makeProjectFileByFile(new File([''],''),relativePath);
                // let sourceFile = file.async("arraybuffer"); ??
                // const projectFile = ProjectFile.makeProjectFileByFile(sourceFile,relativePath);
                projectFile.path = relativePath;
                files.push(projectFile);
              });
              resolve(new Project(files));
            },
            (error) => {
              reject(error);
            },
          );
        };
        reader.readAsArrayBuffer(file);
      }),
    );
  }


  saveProject(project: Project, mode: SpaceSaveMode): Observable<void> {
    if (mode == SpaceSaveMode.Local) {
      const files = project.files;
      if (project.getType()==ProjectType.File) {
        return this.saveFile(files[0]);
      } else {
        return this.saveZip(project.files, project.name);
      }
    }
    return EMPTY;
  }

  saveFile(file: ProjectFile): Observable<void> {
    if (file.code.length == 0 && file.source) {
      const outputStream = streamSaver.createWriteStream(file.name, {
        size: file.source.size,
      });
      const inputStream = file.source.stream();
      return this.write(inputStream, outputStream);
    } else {
      const blob = new Blob([file.code]);
      const outputStream = streamSaver.createWriteStream(file.name, {
        size: blob.size,
      });
      const inputStream = blob.stream();
      return this.write(inputStream, outputStream);
    }
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
