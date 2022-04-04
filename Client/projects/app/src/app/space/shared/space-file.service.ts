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



}
