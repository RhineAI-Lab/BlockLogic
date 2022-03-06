import 'blockly/blocks'; // default blocks
import './definitions/blocks';
import './definitions/generators';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import * as ZH from 'blockly/msg/zh-hans';
import { Blockly, NgxBlocklyModule } from 'ngx-blockly';

import { BlocklierComponent } from './blocklier/blocklier.component';

Blockly.setLocale(ZH);

@NgModule({
  declarations: [BlocklierComponent],
  imports: [CommonModule, HttpClientModule, NgxBlocklyModule],
  exports: [BlocklierComponent],
})
export class BlocklierModule {}
