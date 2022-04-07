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
  readonly debugOutput$ = new Subject<string>();
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
        this.httpClient.get(url, { responseType: 'text' }).subscribe({
          next: (text) => {
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
          },
          error: (err) => {
            this.notifiy('打开项目失败', 'error', '服务器资源不存在');
          },
        });
      } else {
        this.openProject(Project.getDefaultProject());
      }
    }
  }
  openZipFile(file: File): void {
    if (file == undefined) return;
    this.fileService.openZip(file).subscribe((project: Project) => {
      this.openProject(project);
    });
  }

  openProject(project: Project): void {
    this.project$.next(project);
    this.projectState$.next('项目打开完成');
    if (project.target == -1) {
      this.notifiy('项目中无可打开的文件', 'error');
    } else {
      this.openFile(project.getTargetFile().path);
    }
  }
  saveProject(mode: SpaceSaveMode): void {
    const project = this.project$.getValue();
    this.notifiy('保存中...');
    this.fileService.saveProject(project, mode).subscribe({
      complete: () => {
        this.projectState$.next('项目保存成功');
        this.notifiy('保存成功', 'success');
      },
      error: (err) => {
        this.projectState$.next('项目保存失败');
        this.notifiy('保存失败', 'error');
      },
    });
  }

  openFile(filePath: string): void {
    const file = this.project$.getValue().getFileByPath(filePath);
    if (file) {
      file.open(this.httpClient).subscribe({
        next: (code) => {
          if (this.project$.getValue().changeTargetFile(filePath)) {
            this.targetFile$.next(this.project$.getValue().getTargetFile());
          }
        },
        error: (err) => {
          if (err == 'Unsupported file type') err = '该文件类型不支持打开';
          this.notifiy('文件打开失败', 'error', err);
        },
      });
    } else {
      this.notifiy('文件打开失败', 'error', '文件不存在');
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
      this.debugOutput$.next(this.targetFile$.getValue().path+' 开始运行');
      sandbox.run(this.targetFile$.getValue().code);
      this.sandboxOfLastRun = sandbox;
    } else if (this.runMode$.getValue() == SpaceRunMode.Device) {
      if (this.debugService.connected) {
        this.debugService.runFile(
          this.targetFile$.getValue().name,
          this.targetCode,
        );
      } else {
        this.notifiy(
          '设备未连接',
          'error',
          '使用设备运行模式运行，请先连接设备。',
        );
      }
    }
  }

  notifiy(
    title: string,
    type: 'info' | 'success' | 'warning' | 'error' | 'remove' = 'info',
    content: string = '',
  ): void {
    this.notification$.next({
      type: type,
      title: title,
      content: content,
    });
  }

  async connectDevice(url: string): Promise<void> {
    this.debugService.connect(url);
    await new Promise((r) => setTimeout(r, 100));
    if (!this.debugService.closed && !this.debugService.connected) {
      this.notifiy('正在连接...', 'info');
    }
  }

  private subscribeDebugEvents(): void {
    this.debugEvents.subscribe((event) => {
      const device = this.debugService.device; // TODO: avoid accessing the internal service
      if (event.type == 'connect') {
        this.notifiy('', 'remove');
        this.notifiy('设备连接成功', 'success', `设备：${device}`);
      }
      if (event.type == 'close') {
        this.notifiy('设备断开连接', 'warning', `设备：${device}`);
      }
      if (event.type == 'error') {
        const eventTarget = event.payload.target as
          | (EventTarget & { url: string })
          | undefined;
        this.notifiy('连接错误', 'error', `地址：${eventTarget?.url}`);
      }
      if (event.type == 'message') {
        // event.message Example: 04-07 10:29:36.126 Script-11 Main [remote://BLogic: main.js]/I: HelloWorld
        let text = event.message;
        let spaceNum = 0;
        for (const t in text.split('')) {
          if(text[parseInt(t)] == ' ') spaceNum++;
          if(spaceNum==4){
            text = text.substring(parseInt(t)+1);
            break;
          }
        }
        this.debugOutput$.next(text);
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
