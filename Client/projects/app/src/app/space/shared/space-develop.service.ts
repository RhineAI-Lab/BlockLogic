import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Subject } from 'rxjs';

import { Project } from '../../common/project.class';
import { ProjectFile } from '../../common/project-file.class';
import { Sandbox, SandboxOutput } from '../../common/sandbox.class';
import { ParaUtils } from '../../common/utils/para.utils';
import {SpaceEditorMode, SpaceLayoutMode, SpaceOpenMode, SpaceSaveMode} from '../common/space-modes.enums';
import { SpaceDebugService } from './space-debug.service';
import { SpaceFileService } from './space-file.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
// Space区域开发相关管理服务
export class SpaceDevelopService {
  readonly project$ = new BehaviorSubject<Project>(Project.getDefaultProject());
  readonly targetFile$ = new BehaviorSubject<ProjectFile>(
    this.project$.getValue().getTargetFile(),
  );
  readonly debugEvents = this.debugService.events$;
  readonly output$ = new Subject<SandboxOutput>();
  code = '';

  private sandboxOfLastRun?: Sandbox;

  constructor(
    private debugService: SpaceDebugService,
    private fileService: SpaceFileService,
    private httpClient: HttpClient,
  ) {
    this.debugEvents
      .pipe(filter((event) => event.type == 'connect'))
      .subscribe(() => this.runFile());
  }

  init(): void {
    let source = ParaUtils.getUrlParameter('source');
    let location = ParaUtils.getUrlParameter('location');
    this.openProjectFrom(source, location);
  }

  openProjectFrom(source: string, location: string): void {
    if (location == SpaceLocationMode.Browser) {
    } else if (location == SpaceLocationMode.Cloud) {
    } else if (location == SpaceLocationMode.Public || location == '') {
      if (source != '') {
        this.httpClient
          .get(source, { responseType: 'text' })
          .subscribe((code) => {
            // TODO: 打开文件内容错误
            console.log(source);
            console.log(code);
            if (source.endsWith('.js')) {
              const ps = source.split('/');
              const name = ps[ps.length - 1];
              let files: ProjectFile[] = [
                ProjectFile.makeProjectFileByCode('Project/' + name, code),
              ];
              this.openProject(new Project(files));
            } else if (source.endsWith('.json')) {
              // TODO: 打开文件夹项目
            }
          });
      } else {
        this.openProject(Project.getDefaultProject());
      }
    }
  }
  openZipFile(file: File): void {
    this.fileService.openZip(file).subscribe((project: Project) => {
      this.openProject(project);
    });
  }

  openProject(project: Project): void {
    this.project$.next(project);
  }
  saveProject(mode: SpaceSaveMode): void {
    const project = this.project$.getValue();
    this.fileService.saveProject(project, mode);
  }

  changeFile(filePath: string): void {
    if (this.project$.getValue().changeTargetFile(filePath)) {
      this.targetFile$.next(this.project$.getValue().getTargetFile());
    }
  }

  runFile(): void {
    this.sandboxOfLastRun?.destroy();
    const sandbox = new Sandbox();
    sandbox.output$.subscribe({
      next: this.output$.next.bind(this.output$),
      error: this.output$.error.bind(this.output$),
    });
    sandbox.run(this.code);
    this.sandboxOfLastRun = sandbox;
  }

  connectDevice(url: string): void {
    this.debugService.connect(url);
  }
}

export enum SpaceLocationMode {
  Browser = 'browser',
  Cloud = 'cloud',
  Public = 'public',
}
