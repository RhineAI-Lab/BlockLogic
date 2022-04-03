import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { BFile } from '../../common/bfile.class';
import { SpaceStyleService } from '../shared/space-style.service';
import {StringUtils} from "../../common/utils/string.utils";

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
  @ViewChild('zipChooser') zipChooser!: ElementRef;

  readonly RUN_MODE_OFFLINE: number = 0;
  readonly RUN_MODE_DEVICE: number = 1;
  readonly STRS_RUN_MODE: string[] = ['在线运行', '设备运行'];

  readonly SAVE_MODE_PC: number = 0;
  readonly SAVE_MODE_BROWSER: number = 1;
  readonly SAVE_MODE_DEVICE: number = 2;
  readonly SAVE_MODE_ONLINE: number = 3;
  readonly STRS_SAVE_MODE: string[] = ['本机', '浏览器', '设备', '在线'];

  readonly OPEN_MODE_PC_FILE: number = 0;
  readonly OPEN_MODE_PC_FOLDER: number = 1;
  readonly OPEN_MODE_PC_ZIP: number = 2;
  readonly OPEN_MODE_BROWSER: number = 3;
  readonly OPEN_MODE_DEVICE: number = 4;
  readonly OPEN_MODE_ONLINE: number = 5;
  readonly STRS_OPEN_MODE: string[] = [
    '单文件',
    '文件夹',
    '压缩包',
    '浏览器',
    '设备',
    '在线',
  ];

  holdBox = false;
  syncCode = true;
  unfoldXml = false;
  brightTheme = true;

  runMode: number = this.RUN_MODE_OFFLINE;
  saveMode: number = this.SAVE_MODE_PC;
  openMode: number = this.OPEN_MODE_PC_FILE;

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
    if (this.saveMode == this.SAVE_MODE_PC) {
    } else if (this.saveMode == this.SAVE_MODE_ONLINE) {
      this.notification.error('暂不支持保存至在线项目', '功能开发中...');
    } else if (this.saveMode == this.SAVE_MODE_DEVICE) {
      this.notification.error('暂不支持保存至设备','功能开发中...');
    } else if (this.saveMode == this.SAVE_MODE_BROWSER) {
      this.notification.error('暂不支持保存至浏览器', '功能开发中...');
    }
  }
  onOpenProject(): void {
    if (this.openMode == this.OPEN_MODE_PC_FILE) {
      this.fileChooser.nativeElement.click();
    } else if (this.openMode == this.OPEN_MODE_PC_FOLDER) {
      this.folderChooser.nativeElement.click();
    } else if (this.openMode == this.OPEN_MODE_PC_ZIP) {
      this.notification.error('暂不支持打开压缩包项目', '功能开发中...');
    } else if (this.openMode == this.OPEN_MODE_ONLINE) {
      this.notification.error('暂不支持打开在线项目', '功能开发中...');
    } else if (this.openMode == this.OPEN_MODE_DEVICE) {
      this.notification.error('暂不支持打开设备中项目', '功能开发中...');
    } else if (this.openMode == this.OPEN_MODE_BROWSER) {
      this.notification.error('暂不支持打开浏览器中项目', '功能开发中...');
    }
  }

  onSelectProject(): void {
    let files: File[] = [];
    if (this.openMode == this.OPEN_MODE_PC_FILE) {
      files = this.fileChooser.nativeElement.files;
    } else if (this.openMode == this.OPEN_MODE_PC_FOLDER) {
      files = this.folderChooser.nativeElement.files;
    }
    if (files.length > 0) {
      const bfiles: BFile[] = [];
      for (const file of files) {
        bfiles.push(new BFile(file));
      }
      this.spaceStyleService.openProject(bfiles);
    }
  }

  onConnectDevice(){
    if(this.deviceAddress.length==0){
      this.notification.error('请输入IP地址', '')
    }else if(!StringUtils.checkIP(this.deviceAddress)){
      this.notification.error('IP地址格式错误', '')
    }else{
      let url = this.connectWay+this.deviceAddress;
      this.spaceStyleService.connectDevice(url);
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
