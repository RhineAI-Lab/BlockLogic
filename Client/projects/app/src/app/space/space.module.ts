import { NgModule } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

import { LayoutModule } from '../components/layout/layout.module';
import { SharedModule } from '../shared/shared.module';
import { SpaceComponent } from './space.component';
import { SpaceRoutingModule } from './space-routing.module';

@NgModule({
  declarations: [SpaceComponent],
  imports: [SharedModule, SpaceRoutingModule, LayoutModule, NzLayoutModule],
})
export class SpaceModule {}
