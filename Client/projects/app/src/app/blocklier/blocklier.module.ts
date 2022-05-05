import './definitions';
import './definitions/base/blocks'; // deprecated
import './definitions/base/generators'; // deprecated
import './definitions/autojs/blocks'; // deprecated
import './definitions/autojs/generators'; // deprecated
import './definitions/dl/blocks'; // deprecated
import './definitions/dl/generators'; // deprecated
import './definitions/array_calculation/blocks'; // deprecated
import './definitions/array_calculation/generators'; // deprecated

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import * as Blockly from 'blockly';
import * as ZH from 'blockly/msg/zh-hans';

import { BlocklierComponent } from './blocklier/blocklier.component';

// @ts-ignore
ZH.PROCEDURES_DEFNORETURN_PROCEDURE = 'doSomething';
// @ts-ignore
ZH.PROCEDURES_DEFRETURN_PROCEDURE = 'doSomething';
// @ts-ignore
ZH.LISTS_CREATE_WITH_INPUT_WITH = '创建列表';
// @ts-ignore
ZH.TEXT_JOIN_TITLE_CREATEWITH = '创建多行文本';
// @ts-ignore
ZH.PROCEDURES_DEFNORETURN_COMMENT = '暂无注释';
Blockly.setLocale(ZH);

@NgModule({
  declarations: [BlocklierComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [BlocklierComponent],
})
export class BlocklierModule {}
