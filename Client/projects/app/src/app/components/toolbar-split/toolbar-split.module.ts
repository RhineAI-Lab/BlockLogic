import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ToolbarSplitComponent } from './toolbar-split/toolbar-split.component';

@NgModule({
  declarations: [ToolbarSplitComponent],
  imports: [CommonModule],
  exports: [ToolbarSplitComponent],
})
export class ToolbarSplitModule {}
