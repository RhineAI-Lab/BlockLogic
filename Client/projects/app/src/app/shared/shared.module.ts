import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

@NgModule({
  exports: [CommonModule, FormsModule, FlexLayoutModule],
})
export class SharedModule {}
