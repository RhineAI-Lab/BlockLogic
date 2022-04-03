import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { FlexLayoutExtensionModule } from './flex-layout-extension/flex-layout-extension.module';

@NgModule({
  exports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    FlexLayoutExtensionModule,
  ],
})
export class SharedModule {}
