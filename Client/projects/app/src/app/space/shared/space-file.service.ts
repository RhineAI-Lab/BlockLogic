import {Injectable} from '@angular/core';

import {Project} from '../../common/project.class';
import {SpaceSaveMode} from '../common/space-modes.enums';

import * as streamSaver from 'streamsaver';
import {ProjectFile} from "../../common/project-file.class";
import * as JSZip from "jszip";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class SpaceFileService {
  readonly saveStart$ = new Subject<void>();
  readonly saveDone$ = new Subject<void>();
  readonly saveFail$ = new Subject<void>();

  constructor() {}

  saveProject(project: Project,mode: SpaceSaveMode): Promise<void> | void {
    if(mode==SpaceSaveMode.Local){
      let files = project.files
      if(files.length==1){
        this.saveFile(files[0])
      }else{
        this.saveZip(project.files, project.name)
      }

    }
  }

  saveFile(file: ProjectFile): Promise<void> | void{
    if(file.code.length==0){
      const outputStream = streamSaver.createWriteStream(file.name, {
        size: file.source.size
      })
      const inputStream = file.source.stream()
      this.saveFianl(inputStream,outputStream)
    }else{
      const blob = new Blob([file.code])
      const outputStream = streamSaver.createWriteStream(file.name, {
        size: blob.size
      })
      const inputStream = blob.stream()
      this.saveFianl(inputStream,outputStream)
    }
  }

  saveZip(files: ProjectFile[],name: string){

    const file1 = new File(['file1 content'], 'streamsaver-zip-example/file1.txt')
    const file2 = {
      name: 'streamsaver-zip-example/file2.txt',
      stream () {
        return new ReadableStream({
          start (ctrl) {
            ctrl.enqueue(new TextEncoder().encode('file2 generated with readableStream'))
            ctrl.close()
          }
        })
      }
    }
    const file3 = {
      name: 'streamsaver-zip-example/blob-example.txt',
      stream: () => new Blob(['support blobs too']).stream()
    }

    const inputStream = createWriter({
      start (ctrl: any) {
        ctrl.enqueue(file1)
        ctrl.enqueue(file2)
        ctrl.enqueue(file3)
        ctrl.enqueue({name: 'streamsaver-zip-example/empty folder', directory: true})
        ctrl.close()
      },
      async pull (ctrl: any) {
        // Egs: Download and zip
        // const url = 'https://d8d913s460fub.cloudfront.net/videoserver/cat-test-video-320x240.mp4'
        // const res = await fetch(url)
        // const stream = () => res.body
        // const name = 'streamsaver-zip-example/cat.mp4'
        //
        // ctrl.enqueue({ name, stream })
        // ctrl.close()
      }
    })

    const outputStream = streamSaver.createWriteStream(name)
    this.saveFianl(inputStream,outputStream)

  }

  saveFianl(inputStream: any, outputStream: any){
    if (window.WritableStream && inputStream.pipeTo) {
      return inputStream.pipeTo(outputStream).then(() => {
        this.saveDone$.next()
      })
    }
    let writer = outputStream.getWriter()
    const reader = inputStream.getReader()
    const pump = (): any => {
      reader.read().then((res: any) => {
        res.done ? writer.close() : writer.write(res.value).then(pump)
        if(res.done){
          this.saveDone$.next()
        }
      })
    }
    pump()
  }
}

declare function createWriter(v: any): any;