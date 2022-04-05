import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Subject } from 'rxjs';

import { Project } from '../../common/project.class';
import { ProjectFile } from '../../common/project-file.class';
import { Sandbox, SandboxOutput } from '../../common/sandbox.class';
import { SpaceSaveMode } from '../common/space-modes.enums';
import { SpaceDebugService } from './space-debug.service';
import { SpaceFileService } from './space-file.service';
import {ParaUtils} from "../../common/utils/para.utils";

@Injectable()
// Space区域开发相关管理服务
export class SpaceDevelopService {
  readonly project$ = new BehaviorSubject<Project>(new Project());
  readonly debugEvents = this.debugService.events$;
  readonly output$ = new Subject<SandboxOutput>();

  private sandboxOfLastRun?: Sandbox;

  constructor(
    private debugService: SpaceDebugService,
    private fileService: SpaceFileService,
  ) {
    this.debugEvents
      .pipe(filter((event) => event.type == 'connect'))
      .subscribe(() => this.runFile());
  }

  init(): void{
    let source = ParaUtils.getUrlParameter("source")
    let location = ParaUtils.getUrlParameter("location")
    if(source==''){

    }else if(location=='browser'){

    }else if(location=='account'){

    }else if(location=='public'||location==''){
      let projectUrl = "assets/space"
    }
  }

  openProject(files: ProjectFile[] | string): void {
    if(typeof files != "string"){
      this.project$.next(new Project(files));
    }else{

    }
  }
  saveProject(mode: SpaceSaveMode): void {
    const project = this.project$.getValue();
    this.fileService.saveProject(project, mode);
  }

  runFile(): void {
    // TODO: full implementation
    const code = 'console.debug({ a: 1 });';
    this.sandboxOfLastRun?.destroy();
    const sandbox = new Sandbox();
    sandbox.output$.subscribe({
      next: this.output$.next.bind(this.output$),
      error: this.output$.error.bind(this.output$),
    });
    sandbox.run(code);
    this.sandboxOfLastRun = sandbox;
  }

  connectDevice(url: string): void {
    this.debugService.connect(url);
  }
}
