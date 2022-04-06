import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Subject } from 'rxjs';

import { Project } from '../../common/project.class';
import { ProjectFile } from '../../common/project-file.class';
import { Sandbox, SandboxOutput } from '../../common/sandbox.class';
import { ParaUtils } from '../../common/utils/para.utils';
import { SpaceSaveMode} from '../common/space-modes.enums';
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
  readonly notifier$ = new Subject<Notification>();
  readonly code$ = new BehaviorSubject<string>('');

  holdBox: boolean = false
  syncCode: boolean = true
  unfoldXml: boolean = false

  private sandboxOfLastRun?: Sandbox;

  constructor(
    private debugService: SpaceDebugService,
    private fileService: SpaceFileService,
    private httpClient: HttpClient,
  ) {
    // this.debugEvents
    //   .pipe(filter((event) => event.type == 'connect'))
    //   .subscribe(() => this.runFile());
    this.subscribeDebugEvents()
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
    this.openFile(project.getTargetFile().path);
  }
  saveProject(mode: SpaceSaveMode): void {
    const project = this.project$.getValue();
    this.fileService.saveProject(project, mode);
  }

  openFile(filePath: string): void {
    const file = this.project$.getValue().getFileByPath(filePath);
    if(file){
      const supportType = 'js ts jsx tsx html css vue json java cpp php python'.split(' ');
      if(supportType.includes(file.type)){
        file.open().subscribe((code) => {
          this.code$.next(code);
          if (this.project$.getValue().changeTargetFile(filePath)) {
            this.targetFile$.next(this.project$.getValue().getTargetFile());
          }
        });
      }else{
        this.notifier$.next({type:'error',title:'不支持打开该文件类型',content:''});
      }
    }
  }

  runFile(): void {
    this.sandboxOfLastRun?.destroy();
    const sandbox = new Sandbox();
    sandbox.output$.subscribe({
      next: this.output$.next.bind(this.output$),
      error: this.output$.error.bind(this.output$),
    });
    sandbox.run(this.code$.getValue());
    this.sandboxOfLastRun = sandbox;
  }

  async connectDevice(url: string): Promise<void> {
    this.debugService.connect(url);
    await new Promise((r) => setTimeout(r, 100));
    if (!this.debugService.closed&&!this.debugService.connected) {
      // 连接时间长时提示
      this.notifier$.next({type:'info', title:'正在连接...'})
    }
  }

  private subscribeDebugEvents(): void {
    this.debugEvents.subscribe((event) => {
      const device = this.debugService.device; // TODO: avoid accessing the internal service
      if (event.type == 'connect') {
        // 连接成功时清空消息，防止上次连接强制断开时提示错误
        this.notifier$.next({type:'remove'})
        this.notifier$.next({type:'success', title:'连接成功', content:`设备：${device}`});
      }
      if (event.type == 'close') {
        this.notifier$.next({type:'warning', title:'连接断开', content:`设备：${device}`});
      }
      if (event.type == 'error') {
        const eventTarget = event.payload.target as
          | (EventTarget & { url: string })
          | undefined;
        this.notifier$.next({type:'error', title:'连接错误', content:`地址: ${eventTarget?.url}`});
      }
    });
  }
}

export enum SpaceLocationMode {
  Browser = 'browser',
  Cloud = 'cloud',
  Public = 'public',
}

export interface Notification {
  type: string;
  title?: string;
  content?: string;
}
