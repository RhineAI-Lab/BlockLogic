import { Component, OnInit, AfterViewInit } from '@angular/core';
import {SpaceStyleService} from "../services/space-style.service";

@Component({
  selector: 'app-space-tools-bar',
  templateUrl: './space-tools-bar.component.html',
  styleUrls: ['./space-tools-bar.component.less'],
})
export class SpaceToolsBarComponent implements OnInit,AfterViewInit {
  readonly RUN_MODE_OFFLINE: number = 0;
  readonly RUN_MODE_DEVICE: number = 1;
  readonly STRS_RUN_MODE: string[] = ['在线运行','设备运行'];

  readonly SAVE_MODE_OFFLINE: number = 0;
  readonly SAVE_MODE_DEVICE: number = 1;
  readonly SAVE_MODE_ONLINE: number = 2;
  readonly STRS_SAVE_MODE: string[] = ['本地','设备','在线'];

  readonly OPEN_MODE_OFFLINE: number = 0;
  readonly OPEN_MODE_DEVICE: number = 1;
  readonly OPEN_MODE_ONLINE: number = 2;
  readonly STRS_OPEN_MODE: string[] = ['本地','设备','在线'];

  holdBox: boolean = false;
  syncCode: boolean = true;
  unfoldXml: boolean = false;
  brightTheme: boolean = true;

  runMode: number = this.RUN_MODE_OFFLINE;
  runModeText: string = '在线模式';
  saveMode: number = this.SAVE_MODE_OFFLINE;
  saveModeText: string = '本地';
  openMode: number = this.SAVE_MODE_OFFLINE;
  openModeText: string = '本地';

  deviceAddress: string = '';
  connectWay: string = 'ws://'

  showHideHeaderBtn: boolean = false

  spaceStyleService: SpaceStyleService;
  constructor(spaceStyleService: SpaceStyleService) {
    this.spaceStyleService = spaceStyleService
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.spaceStyleService.toolsBarController = {
      changeShowHideHeaderBtn: (show: boolean): void=>{
        this.showHideHeaderBtn = show
      }
    }
  }

  save(){
  }

  onRunModeChange(mode: number){
    this.runMode = mode
  }
  onSaveModeChange(mode: number){
    this.saveMode = mode
  }
  onOpenModeChange(mode: number){
    this.openMode = mode
  }
  onShowHeader(){
    this.spaceStyleService.onChangeHeaderDisplay(true)
  }
}

export interface SpaceToolsBarController {
  changeShowHideHeaderBtn: Function
}