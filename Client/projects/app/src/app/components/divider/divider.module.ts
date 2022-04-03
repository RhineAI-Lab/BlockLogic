import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DividerComponent } from './divider/divider.component';
import { ToolbarDividerComponent } from './toolbar-divider/toolbar-divider.component';

@NgModule({
  declarations: [DividerComponent, ToolbarDividerComponent],
  imports: [CommonModule],
  exports: [DividerComponent, ToolbarDividerComponent],
})
export class DividerModule {}
