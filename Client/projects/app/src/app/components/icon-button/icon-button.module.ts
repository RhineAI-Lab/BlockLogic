import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { IconButtonComponent } from './icon-button/icon-button.component';

@NgModule({
  declarations: [IconButtonComponent],
  imports: [CommonModule, NzIconModule],
  exports: [IconButtonComponent],
})
export class IconButtonModule {}
