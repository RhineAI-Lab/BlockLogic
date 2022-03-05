import { NgModule } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NgxBlocklyModule } from 'ngx-blockly';

import { SheetModule } from '../components/sheet/sheet.module';
import { SharedModule } from '../shared/shared.module';
import { SpaceComponent } from './space.component';
import { SpaceHeaderComponent } from './space-header/space-header.component';
import { SpaceRoutingModule } from './space-routing.module';
import { SpaceVisualEditorComponent } from './space-visual-editor/space-visual-editor.component';

@NgModule({
  declarations: [
    SpaceComponent,
    SpaceHeaderComponent,
    SpaceVisualEditorComponent,
  ],
  imports: [
    SharedModule,
    SpaceRoutingModule,
    SheetModule,
    NzLayoutModule,
    NzMenuModule,
    NgxBlocklyModule,
  ],
})
export class SpaceModule {}
