import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-space-tools-bar',
  templateUrl: './space-tools-bar.component.html',
  styleUrls: ['./space-tools-bar.component.less'],
})
export class SpaceToolsBarComponent implements OnInit {
  readonly RUN_MODE_OFFLINE: number = 0;
  readonly RUN_MODE_DEVICE: number = 1;
  readonly STRS_RUN_MODE: string[] = ['在线运行','设备运行'];

  readonly SAVE_MODE_OFFLINE: number = 0;
  readonly SAVE_MODE_DEVICE: number = 1;
  readonly SAVE_MODE_ONLINE: number = 2;
  readonly STRS_SAVE_MODE: string[] = ['本地','设备','在线'];

  holdBox: boolean = false;
  syncCode: boolean = true;
  unfoldXml: boolean = false;
  brightTheme: boolean = true;

  runMode: number = this.RUN_MODE_OFFLINE;
  runModeText: string = '在线模式';
  saveMode: number = this.SAVE_MODE_OFFLINE;
  saveModeText: string = '本地';

  deviceAddress: string = '';
  connectWay: string = 'ws://'


  constructor() {}

  ngOnInit(): void {}

  save(){

  }

  onRunModeChange(mode: number){
    this.runMode = mode
  }

  onSaveModeChange(mode: number){
    this.saveMode = mode
  }
}
