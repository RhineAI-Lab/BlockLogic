import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SpaceComponent } from './space.component';
import { SpaceRoutingModule } from './space-routing.module';

@NgModule({
  declarations: [SpaceComponent],
  imports: [CommonModule, SpaceRoutingModule],
})
export class SpaceModule {}
