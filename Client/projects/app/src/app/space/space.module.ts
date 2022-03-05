import { NgModule } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

import { SharedModule } from '../shared/shared.module';
import { SpaceComponent } from './space.component';
import { SpaceHeaderComponent } from './space-header/space-header.component';
import { SpaceRoutingModule } from './space-routing.module';

@NgModule({
  declarations: [SpaceComponent, SpaceHeaderComponent],
  imports: [SharedModule, SpaceRoutingModule, NzLayoutModule, NzMenuModule],
})
export class SpaceModule {}
