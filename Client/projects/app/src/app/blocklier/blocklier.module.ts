// TODO: convert all definitions to the class-based syntax
import './definitions/base/blocks'; // deprecated
import './definitions/base/generators'; // deprecated
import './definitions/autojs/blocks'; // deprecated
import './definitions/autojs/generators'; // deprecated
import './definitions/dl/blocks'; // deprecated
import './definitions/dl/generators'; // deprecated

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import * as Blockly from 'blockly';
import * as ZH from 'blockly/msg/zh-hans';

import { BlocklierComponent } from './blocklier/blocklier.component';

Blockly.setLocale(ZH);

@NgModule({
  declarations: [BlocklierComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [BlocklierComponent],
})
export class BlocklierModule {}
