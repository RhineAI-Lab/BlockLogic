import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VerticalSplitLineComponent } from './vertical-split-line/vertical-split-line.component';

@NgModule({
  declarations: [VerticalSplitLineComponent],
  imports: [CommonModule],
  exports: [VerticalSplitLineComponent],
})
export class VerticalSplitLineModule {}
