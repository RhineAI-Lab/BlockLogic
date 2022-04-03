import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { BtnIconComponent } from './btn-icon/btn-icon.component';

@NgModule({
  declarations: [BtnIconComponent],
  imports: [CommonModule, NzIconModule],
  exports: [BtnIconComponent],
})
export class BtnIconModule {}
