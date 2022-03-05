import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { SheetComponent } from './sheet.component';

@NgModule({
  declarations: [SheetComponent],
  imports: [SharedModule],
  exports: [SheetComponent],
})
export class SheetModule {}
