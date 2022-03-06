import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxBlocklyConfig, NgxBlocklyGenerator } from 'ngx-blockly';

import {
  AppAutojsBlock,
  AppEditFileBlock,
  AppGetAppNameBlock,
  AppGetPackageNameBlock,
  AppLaunchAppBlock,
  AppLaunchBlock,
  AppOpenAppSettingBlock,
  AppOpenUrlBlock,
  AppSendEmailBlock,
  AppStartActivityBlock,
  AppUninstallBlock,
  AppVersionCodeBlock,
  AppVersionNameBlock,
  AppViewFileBlock,
} from '../definitions/app.blocks';
import { CustomBlockEnhanced } from '../definitions/common';
import { ListsGetBlock, ListsSetBlock } from '../definitions/lists.blocks';

@Component({
  selector: 'app-blocklier',
  templateUrl: './blocklier.component.html',
  styleUrls: ['./blocklier.component.less'],
})
export class BlocklierComponent implements OnInit {
  blocks = CustomBlockEnhanced.use([
    ListsGetBlock,
    ListsSetBlock,
    AppVersionCodeBlock,
    AppVersionNameBlock,
    AppAutojsBlock,
    AppLaunchBlock,
    AppLaunchAppBlock,
    AppGetPackageNameBlock,
    AppGetAppNameBlock,
    AppOpenAppSettingBlock,
    AppViewFileBlock,
    AppEditFileBlock,
    AppUninstallBlock,
    AppOpenUrlBlock,
    AppSendEmailBlock,
    AppStartActivityBlock,
  ]);
  config?: NgxBlocklyConfig;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient
      .get('assets/toolbox.xml', { responseType: 'text' })
      .subscribe(
        (xmlText) =>
          (this.config = {
            grid: {
              spacing: 20,
              length: 6,
              colour: '#ddd',
              snap: true,
            },
            zoom: {
              controls: true,
              wheel: true,
              startScale: 1.0,
              maxScale: 2,
              minScale: 0.5,
              scaleSpeed: 1.2,
            },
            toolbox: xmlText,

            generators: [NgxBlocklyGenerator.JAVASCRIPT],
          }),
      );
  }
}
