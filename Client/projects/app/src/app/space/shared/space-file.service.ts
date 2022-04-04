import {Injectable} from '@angular/core';

import {Project} from '../../common/project.class';
import {SpaceSaveMode} from '../common/space-modes.enums';

import * as streamSaver from 'streamsaver';
import {ProjectFile} from "../../common/project-file.class";
import * as JSZip from "jszip";

@Injectable({
  providedIn: 'root',
})
export class SpaceFileService {
  constructor() {}

  saveProject(project: Project,mode: SpaceSaveMode): Promise<void> | void {
    if(mode==SpaceSaveMode.Local){
      let files = project.files
      if(files.length==1){
        this.saveFile(files[0])
      }else{
        this.saveZip(files)
      }

    }
  }

  saveFile(file: ProjectFile): Promise<void> | void{
    const blob = new Blob(['StreamSaver is awesome'])
    const fileStream = streamSaver.createWriteStream('sample.txt', {
      size: blob.size
    })
    const readableStream = blob.stream()

    if (window.WritableStream && readableStream.pipeTo) {
      return readableStream.pipeTo(fileStream)
        .then(() => console.log('done writing'))
    }
    let writer = fileStream.getWriter()
    const reader = readableStream.getReader()
    const pump = (): any => {
      reader.read().then(res => res.done
        ? writer.close()
        : writer.write(res.value).then(pump))
    }
    pump()
  }


  saveZip(files: ProjectFile[]){

    const fileStream = streamSaver.createWriteStream('archive.zip')

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

    const readableZipStream = createWriter({
      start (ctrl: any) {
        ctrl.enqueue(file1)
        ctrl.enqueue(file2)
        ctrl.enqueue(file3)
        ctrl.enqueue({name: 'streamsaver-zip-example/empty folder', directory: true})
        // ctrl.close()
      },
      async pull (ctrl: any) {
        // Gets executed everytime zip.js asks for more data
        const url = 'https://d8d913s460fub.cloudfront.net/videoserver/cat-test-video-320x240.mp4'
        const res = await fetch(url)
        const stream = () => res.body
        const name = 'streamsaver-zip-example/cat.mp4'

        ctrl.enqueue({ name, stream })

        // if (done adding all files)
        ctrl.close()
      }
    })

    // more optimized
    if (window.WritableStream && readableZipStream.pipeTo) {
      return readableZipStream.pipeTo(fileStream).then(() => console.log('done writing'))
    }

    // less optimized
    const writer = fileStream.getWriter()
    const reader = readableZipStream.getReader()
    const pump = () => reader.read()
      .then((res: any) => res.done ? writer.close() : writer.write(res.value).then(pump))
    pump()
  }
}

declare function createWriter(v: any): any;