import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { Project } from '../../common/project.class';
import { ProjectFile } from '../../common/project-file.class';
import { Sandbox, SandboxOutput } from '../../common/sandbox.class';
import { ParaUtils } from '../../common/utils/para.utils';
import { SpaceRunMode, SpaceSaveMode } from '../common/space-modes.enums';
import { SpaceDebugService } from './space-debug.service';
import { SpaceFileService } from './space-file.service';

@Injectable()
// Space区域开发相关管理服务
export class SpaceDevelopService {
  readonly project$ = new BehaviorSubject<Project>(Project.getDefaultProject());
  readonly targetFile$ = new BehaviorSubject<ProjectFile>(
    this.project$.getValue().getTargetFile(),
  );
  readonly runMode$ = new BehaviorSubject<SpaceRunMode>(SpaceRunMode.Browser);
  readonly unfoldXml$ = new BehaviorSubject<boolean>(false);
  readonly debugEvents = this.debugService.events$;
  readonly output$ = new Subject<SandboxOutput>();
  readonly notification$ = new Subject<Notification>();
  readonly showConsole$ = new Subject<void>();

  readonly editorState$ = new BehaviorSubject<string>('编辑器初始化中...');
  readonly projectState$ = new BehaviorSubject<string>('项目打开中...');

  syncCode = true;

  private sandboxOfLastRun?: Sandbox;

  constructor(
    private debugService: SpaceDebugService,
    private fileService: SpaceFileService,
    private httpClient: HttpClient,
  ) {
    this.subscribeDebugEvents();
  }

  init(): void {
    this.editorState$.next('编辑器初始化完成');
    const source = ParaUtils.getUrlParameter('source');
    const location = ParaUtils.getUrlParameter('location');
    this.openProjectFrom(source, location);
  }

  get targetCode(): string {
    if (this.targetFile$.getValue().code) {
      return this.targetFile$.getValue().code;
    }
    return '';
  }
  set targetCode(v: string) {
    this.targetFile$.getValue().code = v;
  }

  openProjectFrom(source: string, location: string): void {
    if (location == SpaceLocationMode.Browser) {
    } else if (location == SpaceLocationMode.Cloud) {
    } else if (location == SpaceLocationMode.Public || location == '') {
      if (source != '') {
        let url = 'assets/example/' + source;
        if (url.endsWith('/')) {
          url = url + 'files.txt';
        }
        this.httpClient.get(url, { responseType: 'text' }).subscribe((text) => {
          if (!source.endsWith('/')) {
            const ps = source.split('/');
            const name = ps[ps.length - 1];
            const files: ProjectFile[] = [
              ProjectFile.makeProjectFileByCode(text, 'Project/' + name),
            ];
            this.openProject(new Project(files));
          } else {
            const lines = text.split('\n');
            const files: ProjectFile[] = [];
            const name = lines[0];
            for (let i = 1; i < lines.length; i++) {
              if (lines[i] == '') {
                continue;
              }
              files.push(
                ProjectFile.makeProjectFileByUrl(
                  source + lines[i],
                  name + '/' + lines[i],
                ),
              );
            }
            this.openProject(new Project(files));
          }
        });
      } else {
        this.openProject(Project.getDefaultProject());
      }
    }
  }
  openZipFile(file: File): void {
    if(file==undefined) return;
    this.fileService.openZip(file).subscribe((project: Project) => {
      this.openProject(project);
    });
  }

  openProject(project: Project): void {
    this.project$.next(project);
    this.projectState$.next('项目打开完成');
    if(project.target==-1){
      this.notification$.next({
        type: 'info',
        title: '项目中无可打开的文件',
      })
    }else{
      this.openFile(project.getTargetFile().path);
    }
  }
  saveProject(mode: SpaceSaveMode): void {
    const project = this.project$.getValue();
    this.fileService.saveProject(project, mode).subscribe({
      complete: (() => {
        this.projectState$.next('项目保存成功');
      }),
      error: (() => {
        this.projectState$.next('项目保存失败');
      }),
    });
  }

  openFile(filePath: string): void {
    const file = this.project$.getValue().getFileByPath(filePath);
    if (file) {
      const supportType =
        'js ts jsx tsx html css vue json java cpp php python'.split(' ');
      if (supportType.includes(file.type)) {
        file.open(this.httpClient).subscribe({
          next: (code) => {
            if (this.project$.getValue().changeTargetFile(filePath)) {
              this.targetFile$.next(this.project$.getValue().getTargetFile());
            }
          },
          error: (err) => {
            this.notification$.next({
              type: 'error',
              title: '文件打开错误',
              content: '',
            });
          },
        });
      } else {
        this.notification$.next({
          type: 'error',
          title: '不支持打开该文件类型',
          content: '',
        });
      }
    }
  }

  runFile(): void {
    this.showConsole$.next();
    if (this.runMode$.getValue() == SpaceRunMode.Browser) {
      this.sandboxOfLastRun?.destroy();
      const sandbox = new Sandbox();
      sandbox.output$.subscribe({
        next: this.output$.next.bind(this.output$),
        error: this.output$.error.bind(this.output$),
      });
      sandbox.run(this.targetFile$.getValue().code);
      this.sandboxOfLastRun = sandbox;
    } else if (this.runMode$.getValue() == SpaceRunMode.Device) {
      if (this.debugService.connected) {
        this.debugService.runFile(
          'BLogic: ' + this.targetFile$.getValue().name,
          this.targetCode,
        );
      } else {
        this.notification$.next({
          type: 'error',
          title: '设备未连接',
          content: '使用设备运行模式运行，请先连接设备。',
        });
      }
    }
  }

  async connectDevice(url: string): Promise<void> {
    this.debugService.connect(url);
    await new Promise((r) => setTimeout(r, 100));
    if (!this.debugService.closed && !this.debugService.connected) {
      this.notification$.next({ type: 'info', title: '正在连接...' });
    }
  }

  private subscribeDebugEvents(): void {
    this.debugEvents.subscribe((event) => {
      const device = this.debugService.device; // TODO: avoid accessing the internal service
      if (event.type == 'connect') {
        this.notification$.next({ type: 'remove' });
        this.notification$.next({
          type: 'success',
          title: '连接成功',
          content: `设备：${device}`,
        });
      }
      if (event.type == 'close') {
        this.notification$.next({
          type: 'warning',
          title: '连接断开',
          content: `设备：${device}`,
        });
      }
      if (event.type == 'error') {
        const eventTarget = event.payload.target as
          | (EventTarget & { url: string })
          | undefined;
        this.notification$.next({
          type: 'error',
          title: '连接错误',
          content: `地址: ${eventTarget?.url}`,
        });
      }
      if (event.type == 'message') {
        // event.message Example: 04-07 10:29:36.126 Script-11 Main [remote://BLogic: main.js]/I: HelloWorld
        // this.output$.next();
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
  type: 'info' | 'success' | 'error' | 'warning' | 'remove';
  title?: string;
  content?: string;
}
