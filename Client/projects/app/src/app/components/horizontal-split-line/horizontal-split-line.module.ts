import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HorizontalSplitLineComponent } from './horizontal-split-line/horizontal-split-line.component';

@NgModule({
  declarations: [HorizontalSplitLineComponent],
  imports: [CommonModule],
  exports: [HorizontalSplitLineComponent],
})
export class HorizontalSplitLineModule {}
