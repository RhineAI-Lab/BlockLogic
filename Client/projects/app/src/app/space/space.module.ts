import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';
import { IconDefinition } from '@ant-design/icons-angular';
import { BorderOutline, FileOutline, FileTextOutline, FolderOutline, CodeOutline,
  MinusOutline, CloseOutline, SaveOutline, ApiFill, QuestionOutline,
  LeftOutline, RightOutline, ControlOutline, FolderOpenOutline, FullscreenOutline,
  FullscreenExitOutline, VerticalAlignBottomOutline, UpOutline
} from '@ant-design/icons-angular/icons';
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
import { HorizontalSplitLineComponent } from './components/horizontal-split-line/horizontal-split-line.component';
import { VerticalSplitLineComponent } from './components/vertical-split-line/vertical-split-line.component';
import { SpaceComponent } from './space.component';
import { SpaceBlockEditorComponent } from './space-block-editor/space-block-editor.component';
import { SpaceCodeEditorComponent } from './space-code-editor/space-code-editor.component';
import { SpaceHeaderComponent } from './space-header/space-header.component';
import { SpaceRoutingModule } from './space-routing.module';
import { SpaceSidebarProjectsComponent } from './space-sidebar-projects/space-sidebar-projects.component';
import { SpaceSidebarManagerComponent } from './space-sidebar-manager/space-sidebar-manager.component';
import { SpaceStatusBarComponent } from './space-status-bar/space-status-bar.component';
import { SpaceToolsBarComponent } from './space-tools-bar/space-tools-bar.component';
import { SpaceTabssetBarComponent } from './space-tabsset-bar/space-tabsset-bar.component';
import { SpaceSidebarConsoleComponent } from './space-sidebar-console/space-sidebar-console.component';
import { SpaceSidebarLayoutComponent } from './shared/space-sidebar-layout/space-sidebar-layout.component';
import { BtnIconComponent } from './components/btn-icon/btn-icon.component';
import {NzRadioModule} from "ng-zorro-antd/radio";
import { ToolbarSplitComponent } from './components/toolbar-split/toolbar-split.component';
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import { SpaceSidebarTerminalComponent } from './space-sidebar-terminal/space-sidebar-terminal.component';
import {NZ_CONFIG, NzConfig} from "ng-zorro-antd/core/config";
import {NzNotificationService} from "ng-zorro-antd/notification";

const icons: IconDefinition[] = [
  BorderOutline, FileOutline, FileTextOutline, FolderOutline, CodeOutline,
  MinusOutline, CloseOutline, SaveOutline, ApiFill, QuestionOutline,
  LeftOutline, RightOutline, ControlOutline, FolderOpenOutline, FullscreenOutline,
  FullscreenExitOutline, VerticalAlignBottomOutline, UpOutline
];

const ngZorroConfig: NzConfig = {
  notification: { nzPlacement: "topLeft"},
};

@NgModule({
  declarations: [
    SpaceComponent,
    SpaceHeaderComponent,
    SpaceBlockEditorComponent,
    SpaceCodeEditorComponent,
    SpaceSidebarProjectsComponent,
    SpaceSidebarManagerComponent,
    SpaceStatusBarComponent,
    SpaceToolsBarComponent,
    HorizontalSplitLineComponent,
    VerticalSplitLineComponent,
    SpaceTabssetBarComponent,
    SpaceSidebarConsoleComponent,
    SpaceSidebarLayoutComponent,
    BtnIconComponent,
    ToolbarSplitComponent,
    SpaceSidebarTerminalComponent,
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
    NzRadioModule,
    NzButtonModule,
    NzDropDownModule,
    NzInputModule,
    NzCheckboxModule,
  ],
  providers: [
    {
      provide: ANGULAR_SPLIT_DEFAULT_OPTIONS,
      useValue: { gutterSize: 8 } as AngularSplitOptions,
    },{
      provide: NZ_CONFIG,
      useValue: ngZorroConfig,
    },{
      provide: NzNotificationService,
      useClass: NzNotificationService,
    }
  ],
})
export class SpaceModule {}
