import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [SharedModule],
  exports: [HeaderComponent],
})
export class LayoutModule {}
