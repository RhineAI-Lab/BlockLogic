import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { filter, race, take } from 'rxjs';

import { Project } from '../../common/project.class';
import { ProjectFile } from '../../common/project-file.class';
import { StringUtils } from '../../common/utils/string.utils';
import {
  SpaceOpenMode,
  SpaceRunMode,
  SpaceSaveMode,
} from '../common/space-modes.enums';
import { SpaceDevelopService } from '../shared/space-develop.service';
import { SpaceState } from '../shared/space-state.service';

@Component({
  selector: 'app-space-tool-bar',
  templateUrl: './space-tool-bar.component.html',
  styleUrls: ['./space-tool-bar.component.less'],
})
export class SpaceToolBarComponent implements OnInit {
  RunMode = SpaceRunMode;
  SaveMode = SpaceSaveMode;
  OpenMode = SpaceOpenMode;

  @ViewChild('folderChooser') folderChooser!: ElementRef;
  @ViewChild('fileChooser') fileChooser!: ElementRef;
  @ViewChild('zipChooser') zipChooser!: ElementRef;

  @ViewChild('openProjectBtn') openProjectBtn!: ElementRef;
  @ViewChild('saveProjectBtn') saveProjectBtn!: ElementRef;

  brightTheme = true;
  holdBox: boolean = this.developService.holdBox;
  syncCode: boolean = this.developService.syncCode;
  unfoldXml: boolean = this.developService.unfoldXml;

  runMode = SpaceRunMode.Browser;
  saveMode = SpaceSaveMode.Local;
  openMode = SpaceOpenMode.LocalFile;

  deviceAddress = '';
  connectionProtocol = 'ws://';

  constructor(
    public state: SpaceState,
    private developService: SpaceDevelopService,
    private notifier: NzNotificationService,
  ) {}

  ngOnInit(): void {}

  run(): void {
    this.developService.runFile();
  }

  onSaveProject(): void {
    if (this.saveMode == SpaceSaveMode.Local) {
      this.developService.saveProject(this.saveMode);
    } else if (this.saveMode == SpaceSaveMode.Cloud) {
      this.notifier.error('暂不支持保存至云端', '功能开发中...');
    } else if (this.saveMode == SpaceSaveMode.Device) {
      this.notifier.error('暂不支持保存至设备', '功能开发中...');
    } else if (this.saveMode == SpaceSaveMode.Browser) {
      this.notifier.error('暂不支持保存至浏览器', '功能开发中...');
    }
  }
  onOpenProject(): void {
    if (this.openMode == SpaceOpenMode.LocalFile) {
      this.fileChooser.nativeElement.click();
    } else if (this.openMode == SpaceOpenMode.LocalFolder) {
      this.folderChooser.nativeElement.click();
    } else if (this.openMode == SpaceOpenMode.LocalZip) {
      this.zipChooser.nativeElement.click();
    } else if (this.openMode == SpaceOpenMode.Cloud) {
      this.notifier.error('暂不支持打开云端项目', '功能开发中...');
    } else if (this.openMode == SpaceOpenMode.Device) {
      this.notifier.error('暂不支持打开设备中项目', '功能开发中...');
    } else if (this.openMode == SpaceOpenMode.Browser) {
      this.notifier.error('暂不支持打开浏览器中项目', '功能开发中...');
    }
  }

  onSelectProject(): void {
    if (this.openMode == SpaceOpenMode.LocalZip) {
      this.developService.openZipFile(this.fileChooser.nativeElement.files[0]);
    } else {
      let files: File[] = [];
      if (this.openMode == SpaceOpenMode.LocalFile) {
        files = this.fileChooser.nativeElement.files;
      } else if (this.openMode == SpaceOpenMode.LocalFolder) {
        files = this.folderChooser.nativeElement.files;
      }
      if (files.length > 0) {
        const projectFiles: ProjectFile[] = [];
        for (const file of files) {
          projectFiles.push(
            ProjectFile.makeProjectFileByFile(file, file.webkitRelativePath),
          );
        }
        this.developService.openProject(new Project(projectFiles));
      }
    }
  }

  onConnectDevice(): void {
    if (this.deviceAddress.length == 0) {
      this.notifier.error('请输入IP地址', '');
    } else if (!StringUtils.checkIP(this.deviceAddress)) {
      this.notifier.error('IP地址格式错误', '');
    } else {
      const url = this.connectionProtocol + this.deviceAddress + ':9315';
      this.developService.connectDevice(url);
      race([
        this.developService.debugEvents.pipe(
          filter((event) => event.type == 'connect'),
          take(1),
        ),
      ]).subscribe();
    }
  }

  onChangeSyncCode(): void {
    this.developService.syncCode = this.syncCode;
  }
  onChangeHoldBox(): void {
    this.developService.holdBox = this.holdBox;
  }
  onChangeUnfoldXml(): void {
    this.developService.unfoldXml = this.unfoldXml;
  }

  onRunModeChange(mode: SpaceRunMode): void {
    this.runMode = mode;
  }
  onSaveModeChange(mode: SpaceSaveMode): void {
    this.saveMode = mode;
    this.onSaveProject();
  }
  onOpenModeChange(mode: SpaceOpenMode): void {
    this.openMode = mode;
    this.onOpenProject();
  }
}
