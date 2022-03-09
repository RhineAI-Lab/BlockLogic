// TODO: convert all definitions to the class-based syntax
import './definitions';
import './definitions/blocks'; // deprecated
import './definitions/generators'; // deprecated

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { IconDefinition } from '@ant-design/icons-angular';
import { BorderOutline } from '@ant-design/icons-angular/icons';
import * as Blockly from 'blockly';
import * as ZH from 'blockly/msg/zh-hans';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

import { BlocklierComponent } from './blocklier/blocklier.component';

Blockly.setLocale(ZH);

const icons: IconDefinition[] = [BorderOutline];

@NgModule({
  declarations: [BlocklierComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule.forChild(icons),
  ],
  exports: [BlocklierComponent],
})
export class BlocklierModule {}
