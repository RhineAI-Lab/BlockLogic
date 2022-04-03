import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FlexScrollableDirective } from './flex-scrollable.directive';

@NgModule({
  declarations: [FlexScrollableDirective],
  imports: [CommonModule],
  exports: [FlexScrollableDirective],
})
export class FlexLayoutExtensionModule {}
