import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { SpaceStyleService } from '../services/space-style.service';

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

  readonly RUN_MODE_OFFLINE: number = 0;
  readonly RUN_MODE_DEVICE: number = 1;
  readonly STRS_RUN_MODE: string[] = ['在线运行', '设备运行'];

  readonly SAVE_MODE_OFFLINE: number = 0;
  readonly SAVE_MODE_DEVICE: number = 1;
  readonly SAVE_MODE_ONLINE: number = 2;
  readonly STRS_SAVE_MODE: string[] = ['本地', '设备', '在线'];

  readonly OPEN_MODE_OFFLINE: number = 0;
  readonly OPEN_MODE_DEVICE: number = 1;
  readonly OPEN_MODE_ONLINE: number = 2;
  readonly STRS_OPEN_MODE: string[] = ['本地', '设备', '在线'];

  holdBox = false;
  syncCode = true;
  unfoldXml = false;
  brightTheme = true;

  runMode: number = this.RUN_MODE_OFFLINE;
  runModeText = '在线模式';
  saveMode: number = this.SAVE_MODE_OFFLINE;
  saveModeText = '本地';
  openMode: number = this.SAVE_MODE_OFFLINE;
  openModeText = '本地';

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

  onSave(): void {
    if (this.saveMode == this.SAVE_MODE_OFFLINE) {
    } else if (this.saveMode == this.SAVE_MODE_ONLINE) {
      this.notification.create(
        'error',
        'Notification Title',
        'This is the content of the notification',
      );
    } else if (this.saveMode == this.SAVE_MODE_DEVICE) {
    }
  }
  onOpen(): void {
    if (this.saveMode == this.SAVE_MODE_OFFLINE) {
    } else if (this.saveMode == this.SAVE_MODE_ONLINE) {
    } else if (this.saveMode == this.SAVE_MODE_DEVICE) {
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
