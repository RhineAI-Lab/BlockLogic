import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

import { SheetModule } from '../components/sheet/sheet.module';
import { SharedModule } from '../shared/shared.module';
import { SpaceComponent } from './space.component';
import { SpaceHeaderComponent } from './space-header/space-header.component';
import { SpaceRoutingModule } from './space-routing.module';
import { SpaceToolbarComponent } from './space-toolbar/space-toolbar.component';

@NgModule({
  declarations: [SpaceComponent, SpaceHeaderComponent, SpaceToolbarComponent],
  imports: [
    SharedModule,
    SpaceRoutingModule,
    SheetModule,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzCardModule,
  ],
})
export class SpaceModule {}
