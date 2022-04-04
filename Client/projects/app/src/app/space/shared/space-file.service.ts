import { Injectable } from '@angular/core';
import {Project} from "../../common/project.class";

@Injectable({
  providedIn: 'root'
})
export class SpaceFileService {

  constructor() { }

  saveProject(project: Project,mode: number){
    if(mode==OpenMode.Pc){
      let files = project.files
      if(files.length==1){

      }else{

      }
    }
  }
}

export enum OpenMode {
  Pc,
  Browser,
  Device,
  Online,
}
