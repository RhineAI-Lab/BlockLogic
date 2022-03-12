// TODO: convert all definitions to the class-based syntax
import './definitions';
import './definitions/blocks'; // deprecated
import './definitions/generators'; // deprecated

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
