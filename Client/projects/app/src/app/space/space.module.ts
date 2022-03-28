import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';
import { IconDefinition } from '@ant-design/icons-angular';
import { BorderOutline, FileOutline } from '@ant-design/icons-angular/icons';
import {
  ANGULAR_SPLIT_DEFAULT_OPTIONS,
  AngularSplitModule,
  IDefaultOptions as AngularSplitOptions,
} from 'angular-split';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { MonacoEditorModule } from 'ngx-monaco-editor';

import { BlocklierModule } from '../blocklier/blocklier.module';
import { SheetModule } from '../components/sheet/sheet.module';
import { SharedModule } from '../shared/shared.module';
import { SpaceSidebarLayoutComponent } from './shared/space-sidebar-layout/space-sidebar-layout.component';
import { SpaceComponent } from './space.component';
import { SpaceBlockEditorComponent } from './space-block-editor/space-block-editor.component';
import { SpaceCodeEditorComponent } from './space-code-editor/space-code-editor.component';
import { SpaceHeaderComponent } from './space-header/space-header.component';
import { SpaceRoutingModule } from './space-routing.module';
import { SpaceSidebarComponent } from './space-sidebar/space-sidebar.component';
import { SpaceSidebarFilesComponent } from './space-sidebar-files/space-sidebar-files.component';
import { SidebarHolderComponent } from './sidebar-manager/sidebar-holder/sidebar-holder.component';
import { SidebarItemComponent } from './sidebar-manager/sidebar-item/sidebar-item.component';

const icons: IconDefinition[] = [BorderOutline, FileOutline];

@NgModule({
  declarations: [
    SpaceComponent,
    SpaceHeaderComponent,
    SpaceBlockEditorComponent,
    SpaceCodeEditorComponent,
    SpaceSidebarComponent,
    SpaceSidebarLayoutComponent,
    SpaceSidebarFilesComponent,
    SidebarHolderComponent,
    SidebarItemComponent,
  ],
  imports: [
    SharedModule,
    SpaceRoutingModule,
    SheetModule,
    BlocklierModule,
    PortalModule,
    NzLayoutModule,
    NzMenuModule,
    NzLayoutModule,
    NzSelectModule,
    NzTreeModule,
    NzToolTipModule,
    NzTabsModule,
    NzIconModule.forChild(icons),
    MonacoEditorModule,
    AngularSplitModule,
  ],
  providers: [
    {
      provide: ANGULAR_SPLIT_DEFAULT_OPTIONS,
      useValue: { gutterSize: 8 } as AngularSplitOptions,
    },
  ],
})
export class SpaceModule {}
