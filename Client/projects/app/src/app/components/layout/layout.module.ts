import { NgModule } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

import { SharedModule } from '../../shared/shared.module';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [SharedModule, NzLayoutModule, NzMenuModule],
  exports: [HeaderComponent],
})
export class LayoutModule {}
