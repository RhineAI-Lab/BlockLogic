import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { Project } from '../../common/project.class';
import { ProjectFile } from '../../common/project-file.class';
import { Sandbox, SandboxOutput } from '../../common/sandbox.class';
import { SpaceEditorMode, SpaceRunMode } from '../common/space-modes.enums';
import { SpaceDebugService } from './space-debug.service';
import { SpaceState } from './space-state.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CodeUtils, XmlResult } from '../../common/utils/code.utils';

@Injectable()
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
  readonly showConsole$ = new Subject<void>();

  readonly closeEvent$ = new Subject<ProjectFile>();
  readonly deleteEvent$ = new Subject<ProjectEvent>();
  readonly renameEvent$ = new Subject<ProjectEvent>();

  syncCode = true;

  private sandboxOfLastRun?: Sandbox;

  xmlList: XmlResult[] = [];
  readonly targetXml$ = new BehaviorSubject<XmlResult>(XmlResult.createEmpty());

  constructor(
    private state: SpaceState,
    private debugService: SpaceDebugService,
    private httpClient: HttpClient,
    private notification: NzNotificationService,
  ) {
    this.subscribeDebugEvents();
    this.state.editorMode$.subscribe((mode) => {
      if (mode == SpaceEditorMode.Design) {
        this.freshXmlList();
      }
    });
  }

  init(): void {
    this.state.editorState$.next('编辑器初始化完成');
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

  openProject(project: Project, needTip: boolean = true): void {
    this.project$.next(project);
    if (needTip) {
      const tip = `项目${
        project.files.length == 1 ? project.files[0].name : project.name
      } 打开完成`;
      this.state.projectState$.next(tip);
      this.notify(tip, 'success');
    }
    if (project.target == -1) {
      this.notify('项目中无可打开的文件', 'error');
    } else {
      this.openFile(project.getTargetFile().path);
    }
  }
  openFile(filePath: string): void {
    const file = this.project$.getValue().getFileByPath(filePath);
    if (file) {
      file.open(this.httpClient).subscribe({
        complete: () => {
          if (this.project$.getValue().changeTargetFile(filePath)) {
            const targetFile = this.project$.getValue().getTargetFile();
            this.state.isLogicFile$.next(targetFile.isLogicFile());
            this.targetFile$.next(targetFile);
          }
        },
        error: (err) => {
          if (err == 'Unsupported file type') err = '该文件类型不支持打开';
          this.notify('文件打开失败', 'error', err);
        },
      });
    } else {
      this.notify('文件打开失败', 'error', '文件不存在');
    }
  }

  run(): void {
    this.showConsole$.next();
    if (this.runMode$.getValue() == SpaceRunMode.Browser) {
      this.sandboxOfLastRun?.destroy();
      const sandbox = new Sandbox();
      sandbox.output$.subscribe({
        next: this.output$.next.bind(this.output$),
        error: this.output$.error.bind(this.output$),
      });
      this.debugOutput$.next(this.targetFile$.getValue().path + ' 开始运行');
      sandbox.run(this.targetFile$.getValue().code);
      this.sandboxOfLastRun = sandbox;
    } else if (this.runMode$.getValue() == SpaceRunMode.Device) {
      if (this.debugService.connected) {
        this.debugService.runFile(
          this.targetFile$.getValue().name,
          this.targetCode,
        );
      } else {
        this.notify(
          '设备未连接',
          'error',
          '使用设备运行模式运行，请先连接设备。',
        );
      }
    }
  }
  stop(): void {}

  freshXmlList(): void {
    const index = this.xmlList.indexOf(this.targetXml$.getValue());
    this.xmlList = CodeUtils.getXmlCodeList(this.targetCode);
    if (index >= 0) {
      if (index < this.xmlList.length) {
        this.targetXml$.next(this.xmlList[index]);
      } else if (this.xmlList.length > 0) {
        this.targetXml$.next(this.xmlList[0]);
      } else {
        this.targetXml$.next(XmlResult.createEmpty());
      }
    } else {
      if (this.xmlList.length > 0) {
        this.targetXml$.next(this.xmlList[0]);
      } else {
        this.targetXml$.next(XmlResult.createEmpty());
      }
    }
  }

  private notify(
    title: string,
    type: 'info' | 'success' | 'warning' | 'error' | 'remove' = 'info',
    content: string = '',
  ): void {
    if (type == 'remove') {
      this.notification.remove();
    } else {
      this.notification.create(type, title, content);
    }
  }

  async connectDevice(url: string): Promise<void> {
    this.debugService.connect(url);
    await new Promise((r) => setTimeout(r, 100));
    if (!this.debugService.closed && !this.debugService.connected) {
      this.notify('正在连接...', 'info');
    }
  }

  private subscribeDebugEvents(): void {
    this.debugEvents.subscribe((event) => {
      const device = this.debugService.device; // TODO: avoid accessing the internal service
      if (event.type == 'connect') {
        this.notify('', 'remove');
        this.notify('设备连接成功', 'success', `设备：${device}`);
      }
      if (event.type == 'close') {
        this.notify('设备断开连接', 'warning', `设备：${device}`);
      }
      if (event.type == 'error') {
        const eventTarget = event.payload.target as
          | (EventTarget & { url: string })
          | undefined;
        this.notify('连接错误', 'error', `地址：${eventTarget?.url}`);
      }
      if (event.type == 'message') {
        let text = event.message;
        let spaceNum = 0;
        for (const t in text.split('')) {
          if (text[parseInt(t)] == ' ') spaceNum++;
          if (spaceNum == 4) {
            text = text.substring(parseInt(t) + 1);
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

export interface ProjectEvent {
  last: string;
  file?: ProjectFile;
}
