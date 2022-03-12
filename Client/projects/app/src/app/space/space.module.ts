import { NgModule } from '@angular/core';
import { IconDefinition } from '@ant-design/icons-angular';
import { BorderOutline } from '@ant-design/icons-angular/icons';
import { AngularSplitModule } from 'angular-split';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { MonacoEditorModule } from 'ngx-monaco-editor';

import { BlocklierModule } from '../components/blocklier/blocklier.module';
import { SheetModule } from '../components/sheet/sheet.module';
import { SharedModule } from '../shared/shared.module';
import { SpaceComponent } from './space.component';
import { SpaceHeaderComponent } from './space-header/space-header.component';
import { SpaceRoutingModule } from './space-routing.module';
import { SpaceVisualEditorComponent } from './space-visual-editor/space-visual-editor.component';

const icons: IconDefinition[] = [BorderOutline];

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
    BlocklierModule,
    NzLayoutModule,
    NzMenuModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule.forChild(icons),
    MonacoEditorModule,
    AngularSplitModule,
  ],
})
export class SpaceModule {}
