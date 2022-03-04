import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { SpaceComponent } from './space.component';
import { SpaceRoutingModule } from './space-routing.module';

@NgModule({
  declarations: [SpaceComponent],
  imports: [SharedModule, SpaceRoutingModule],
})
export class SpaceModule {}
