import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { filter, race, take } from 'rxjs';

import { StringUtils } from '../../common/utils/string.utils';
import {
  SpaceEditorMode,
  SpaceLayoutMode,
  SpaceOpenMode,
  SpaceRunMode,
  SpaceSaveMode,
} from '../common/space-modes.enums';
import { SpaceDevelopService } from '../services/space-develop.service';
import { SpaceState, ThemeMode } from '../services/space-state.service';
import { SpaceFileService } from '../services/space-file.service';
import { XmlResult } from '../../common/utils/code.utils';

@Component({
  selector: 'app-space-tool-bar',
  templateUrl: './space-tool-bar.component.html',
  styleUrls: ['./space-tool-bar.component.less'],
})
export class SpaceToolBarComponent implements OnInit, AfterViewInit {
  RunMode = SpaceRunMode;
  SaveMode = SpaceSaveMode;
  OpenMode = SpaceOpenMode;
  EditorMode = SpaceEditorMode;

  @ViewChild('folderChooser') folderChooser!: ElementRef;
  @ViewChild('fileChooser') fileChooser!: ElementRef;
  @ViewChild('zipChooser') zipChooser!: ElementRef;

  @ViewChild('openProjectBtn') openProjectBtn!: ElementRef;
  @ViewChild('saveProjectBtn') saveProjectBtn!: ElementRef;

  brightTheme = true;
  changeTheme(isBrightTheme: boolean) {
    if (isBrightTheme == (this.state.theme$.getValue() == ThemeMode.Default)) {
      return;
    }
    this.state.theme$.next(isBrightTheme ? ThemeMode.Default : ThemeMode.Dark);
  }

  holdBox: boolean = this.state.holdBox$.getValue();
  syncCode: boolean = this.developService.syncCode;
  unfoldXml: boolean = this.developService.unfoldXml$.getValue();

  runMode = SpaceRunMode.Browser;
  saveMode = SpaceSaveMode.Local;
  openMode = SpaceOpenMode.LocalFile;

  get editorMode() {
    return this.state.editorMode$.getValue();
  }
  get layoutMode() {
    return this.state.layoutMode$.getValue();
  }
  get isBlockFile() {
    return this.layoutMode != SpaceLayoutMode.Unspecified;
  }
  get isEditorLogicMode() {
    return this.editorMode == SpaceEditorMode.Logic;
  }

  get targetXml() {
    return this.developService.targetXml$.getValue();
  }
  set targetXml(value: XmlResult) {
    this.developService.targetXml$.next(value);
  }
  get xmlList() {
    return this.developService.xmlList;
  }

  deviceAddress = '';
  connectionProtocol = 'ws://';

  modalVisible = false;

  constructor(
    public state: SpaceState,
    private developService: SpaceDevelopService,
    private fileService: SpaceFileService,
    private notification: NzNotificationService,
  ) {}

  ngAfterViewInit(): void {
    this.state.theme$.subscribe((v) => {
      this.brightTheme = v == ThemeMode.Default;
    });
  }
  ngOnInit(): void {}

  onRun(): void {
    this.developService.run();
  }
  onSaveProject(): void {
    if (this.saveMode == SpaceSaveMode.Local) {
      this.fileService.saveProject(this.saveMode);
    } else if (this.saveMode == SpaceSaveMode.Another) {
      this.fileService.saveProject(this.saveMode);
    } else if (this.saveMode == SpaceSaveMode.Cloud) {
      this.notification.error('暂不支持保存至云端', '功能开发中...');
    } else if (this.saveMode == SpaceSaveMode.Device) {
      this.notification.error('暂不支持保存至设备', '功能开发中...');
    } else if (this.saveMode == SpaceSaveMode.Browser) {
      this.fileService.saveProject(this.saveMode);
    }
  }
  onOpenProject(): void {
    this.modalVisible = false;
    if (this.openMode == SpaceOpenMode.LocalFile) {
      this.fileService.openProject(this.openMode);
    } else if (this.openMode == SpaceOpenMode.LocalFolder) {
      this.fileService.openProject(this.openMode);
    } else if (this.openMode == SpaceOpenMode.LocalZip) {
      this.zipChooser.nativeElement.click();
    } else if (this.openMode == SpaceOpenMode.Cloud) {
      this.notification.error('暂不支持打开云端项目', '功能开发中...');
    } else if (this.openMode == SpaceOpenMode.Device) {
      this.notification.error('暂不支持打开设备中项目', '功能开发中...');
    } else if (this.openMode == SpaceOpenMode.Browser) {
      this.fileService.openBrowserProject();
    }
  }

  onSelectProject(): void {
    if (this.openMode == SpaceOpenMode.LocalZip) {
      this.fileService.openZipFile(this.zipChooser.nativeElement.files[0]);
    } else {
      let files: File[] = [];
      if (this.openMode == SpaceOpenMode.LocalFile) {
        files = this.fileChooser.nativeElement.files;
      } else if (this.openMode == SpaceOpenMode.LocalFolder) {
        files = this.folderChooser.nativeElement.files;
      }
      this.fileService.openLocalFiles(files);
    }
    if (this.openMode == SpaceOpenMode.LocalFile) {
      this.fileChooser.nativeElement.value = '';
    } else if (this.openMode == SpaceOpenMode.LocalFolder) {
      this.folderChooser.nativeElement.value = '';
    } else if (this.openMode == SpaceOpenMode.LocalZip) {
      this.zipChooser.nativeElement.value = '';
    }
  }

  onConnectDevice(): void {
    if (this.deviceAddress.length == 0) {
      this.notification.error('请输入IP地址', '');
    } else if (!StringUtils.checkIP(this.deviceAddress)) {
      this.notification.error('IP地址格式错误', '');
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

  freshXmlList(): void {
    this.developService.freshXmlList();
  }

  onChangeSyncCode(): void {
    this.developService.syncCode = this.syncCode;
  }
  onChangeHoldBox(): void {
    this.state.holdBox$.next(this.holdBox);
  }
  onChangeUnfoldXml(): void {
    this.developService.unfoldXml$.next(this.unfoldXml);
  }

  onRunModeChange(): void {
    this.developService.runMode$.next(this.runMode);
  }
  onSaveModeChange(mode: SpaceSaveMode): void {
    this.saveMode = mode;
    this.onSaveProject();
  }
  onOpenModeChange(mode: SpaceOpenMode): void {
    this.openMode = mode;
    this.modalVisible = true;
  }

  onUndo(): void {
    this.state.toolbarButtonEvent$.next(SpaceToolBarButtonType.Undo);
  }
  onRedo(): void {
    this.state.toolbarButtonEvent$.next(SpaceToolBarButtonType.Redo);
  }
  onToBlock(): void {
    this.state.toolbarButtonEvent$.next(SpaceToolBarButtonType.ToBlock);
  }
  onToCode(): void {
    this.state.toolbarButtonEvent$.next(SpaceToolBarButtonType.ToCode);
  }

  onShare(): void {
    this.notification.info(
      '暂不支持分享项目',
      '您可以将网址分享给他人，并打开你的项目。',
    );
  }

  openConnectionHelp(): void {
    window.open('docs#/start/Connect');
  }
}

export enum SpaceToolBarButtonType {
  Undo,
  Redo,
  ToBlock,
  ToCode,
}
