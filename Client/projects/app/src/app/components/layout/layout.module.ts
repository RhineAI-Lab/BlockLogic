import { NgModule } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

import { SharedModule } from '../../shared/shared.module';
import { LayoutHeaderComponent } from './layout-header/layout-header.component';

@NgModule({
  declarations: [LayoutHeaderComponent],
  imports: [SharedModule, NzLayoutModule, NzMenuModule],
  exports: [LayoutHeaderComponent],
})
export class LayoutModule {}
