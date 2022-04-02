import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { SpaceStyleService } from '../services/space-style.service';
import {BFile} from "../services/bfile.class";

@Component({
  selector: 'app-space-tools-bar',
  templateUrl: './space-tools-bar.component.html',
  styleUrls: ['./space-tools-bar.component.less'],
})
export class SpaceToolsBarComponent implements OnInit, AfterViewInit {
  spaceStyleService: SpaceStyleService;
  notification: NzNotificationService;
  constructor(
    spaceStyleService: SpaceStyleService,
    notification: NzNotificationService,
  ) {
    this.spaceStyleService = spaceStyleService;
    this.notification = notification;
  }

  @ViewChild('folderChooser') folderChooser!: ElementRef;
  @ViewChild('fileChooser') fileChooser!: ElementRef;

  readonly RUN_MODE_OFFLINE: number = 0;
  readonly RUN_MODE_DEVICE: number = 1;
  readonly STRS_RUN_MODE: string[] = ['在线运行', '设备运行'];

  readonly SAVE_MODE_OFFLINE: number = 0;
  readonly SAVE_MODE_DEVICE: number = 1;
  readonly SAVE_MODE_ONLINE: number = 2;
  readonly STRS_SAVE_MODE: string[] = ['本地', '设备', '在线'];

  readonly OPEN_MODE_OFFLINE_FILE: number = 0;
  readonly OPEN_MODE_OFFLINE_FOLDER: number = 1;
  readonly OPEN_MODE_DEVICE: number = 2;
  readonly OPEN_MODE_ONLINE: number = 3;
  readonly STRS_OPEN_MODE: string[] = ['本地单文件', '本地文件夹', '设备', '在线'];

  holdBox = false;
  syncCode = true;
  unfoldXml = false;
  brightTheme = true;

  runMode: number = this.RUN_MODE_OFFLINE;
  saveMode: number = this.SAVE_MODE_OFFLINE;
  openMode: number = this.SAVE_MODE_OFFLINE;

  deviceAddress = '';
  connectWay = 'ws://';

  showHideHeaderBtn = false;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.spaceStyleService.toolsBarController = {
      changeShowHideHeaderBtn: (show: boolean): void => {
        this.showHideHeaderBtn = show;
      },
    };
  }

  onSaveProject(): void {
    if (this.saveMode == this.SAVE_MODE_OFFLINE) {
    } else if (this.saveMode == this.SAVE_MODE_ONLINE) {
      this.notification.create(
        'error',
        '暂不支持保存至在线项目',
        '功能等待开发中...',
      );
    } else if (this.saveMode == this.SAVE_MODE_DEVICE) {
      this.notification.create(
        'error',
        '暂不支持保存至设备',
        '功能等待开发中...',
      );
    }
  }
  onOpenProject(): void {
    if (this.openMode == this.OPEN_MODE_OFFLINE_FILE) {
      this.fileChooser.nativeElement.click()
    } else if (this.openMode == this.OPEN_MODE_OFFLINE_FOLDER) {
      this.folderChooser.nativeElement.click()
    } else if (this.saveMode == this.OPEN_MODE_ONLINE) {
      this.notification.create(
        'error',
        '暂不支持打开在线项目',
        '功能等待开发中...',
      );
    } else if (this.saveMode == this.OPEN_MODE_DEVICE) {
      this.notification.create(
        'error',
        '暂不支持打开设备中 项目',
        '功能等待开发中...',
      );
    }
  }

  onSelectProject(){
    let files: File[] = []
    if(this.openMode==this.OPEN_MODE_OFFLINE_FILE){
      files = this.fileChooser.nativeElement.files
    }else if(this.openMode==this.OPEN_MODE_OFFLINE_FOLDER){
      files = this.folderChooser.nativeElement.files
    }
    if(files.length>0){
      let bfiles: BFile[] = []
      for (const file of files) {
        bfiles.push(new BFile(file))
      }
      this.spaceStyleService.openProject(bfiles)
    }
  }

  onRunModeChange(mode: number): void {
    this.runMode = mode;
  }
  onSaveModeChange(mode: number): void {
    this.saveMode = mode;
  }
  onOpenModeChange(mode: number): void {
    this.openMode = mode;
  }
  onShowHeader(): void {
    this.spaceStyleService.changeHeaderDisplay(true);
  }
}

export interface SpaceToolsBarController {
  changeShowHideHeaderBtn: (show: boolean) => void;
}
