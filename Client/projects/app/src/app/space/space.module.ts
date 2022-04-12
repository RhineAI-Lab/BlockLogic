import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  ApiFill,
  BorderOutline,
  ClearOutline,
  CloseOutline,
  CodeOutline,
  ControlOutline,
  FileOutline,
  FileTextOutline,
  FolderOpenOutline,
  FolderOutline,
  FullscreenExitOutline,
  FullscreenOutline,
  LeftOutline,
  MinusOutline,
  QuestionOutline,
  RightOutline,
  SaveOutline,
  UpOutline,
  VerticalAlignBottomOutline,
  SearchOutline,
} from '@ant-design/icons-angular/icons';
import {
  ANGULAR_SPLIT_DEFAULT_OPTIONS,
  AngularSplitModule,
  IDefaultOptions as AngularSplitOptions,
} from 'angular-split';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import {MonacoEditorModule, NgxMonacoEditorConfig} from 'ngx-monaco-editor';

import { BlocklierModule } from '../blocklier/blocklier.module';
import { DividerModule } from '../components/divider/divider.module';
import { IconButtonModule } from '../components/icon-button/icon-button.module';
import { SharedModule } from '../shared/shared.module';
import { SpaceSidebarLayoutComponent } from './shared/space-sidebar-layout/space-sidebar-layout.component';
import { SpaceComponent } from './space.component';
import { SpaceBlockEditorComponent } from './space-block-editor/space-block-editor.component';
import { SpaceCenterComponent } from './space-center/space-center.component';
import { SpaceCodeEditorComponent } from './space-code-editor/space-code-editor.component';
import { SpaceHeaderComponent } from './space-header/space-header.component';
import { SpaceRoutingModule } from './space-routing.module';
import { SpaceSidebarConsoleComponent } from './space-sidebar-console/space-sidebar-console.component';
import { SpaceSidebarManagerComponent } from './space-sidebar-manager/space-sidebar-manager.component';
import { SpaceSidebarProjectsComponent } from './space-sidebar-projects/space-sidebar-projects.component';
import { SpaceSidebarTerminalComponent } from './space-sidebar-terminal/space-sidebar-terminal.component';
import { SpaceStatusBarComponent } from './space-status-bar/space-status-bar.component';
import { SpaceTabBarComponent } from './space-tab-bar/space-tab-bar.component';
import { SpaceToolBarComponent } from './space-tool-bar/space-tool-bar.component';
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzEmptyModule} from "ng-zorro-antd/empty";
import {CodeEditorTheme} from "./space-code-editor/space-code-editor-theme";

const icons: IconDefinition[] = [
  ApiFill,
  BorderOutline,
  ClearOutline,
  CloseOutline,
  CodeOutline,
  ControlOutline,
  FileOutline,
  FileTextOutline,
  FolderOpenOutline,
  FolderOutline,
  FullscreenExitOutline,
  FullscreenOutline,
  LeftOutline,
  MinusOutline,
  QuestionOutline,
  RightOutline,
  SaveOutline,
  UpOutline,
  VerticalAlignBottomOutline,
  SearchOutline,
];

const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: 'assets',
  defaultOptions: { scrollBeyondLastLine: false },
  onMonacoLoad: () => {
    const monaco = (<any>window).monaco;
    monaco.editor.defineTheme('one-dark', CodeEditorTheme.MyOneDark);
    monaco.editor.setTheme('one-dark');
  },
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
    SpaceToolBarComponent,
    SpaceTabBarComponent,
    SpaceSidebarConsoleComponent,
    SpaceSidebarLayoutComponent,
    SpaceSidebarTerminalComponent,
    SpaceCenterComponent,
  ],
  imports: [
    SharedModule,
    SpaceRoutingModule,
    BlocklierModule,
    PortalModule,
    [
      NzLayoutModule,
      NzMenuModule,
      NzLayoutModule,
      NzSelectModule,
      NzTreeModule,
      NzToolTipModule,
      NzTabsModule,
      NzIconModule.forChild(icons),
      NzRadioModule,
      NzButtonModule,
      NzDropDownModule,
      NzInputModule,
      NzCheckboxModule,
    ],
    AngularSplitModule,
    IconButtonModule,
    DividerModule,
    NzPopconfirmModule,
    NzModalModule,
    NzEmptyModule,
    MonacoEditorModule.forRoot(monacoConfig)
  ],
  providers: [
    {
      provide: ANGULAR_SPLIT_DEFAULT_OPTIONS,
      useValue: { gutterSize: 8 } as AngularSplitOptions,
    },
    {
      provide: NzNotificationService,
      useClass: NzNotificationService,
    },
  ],
})
export class SpaceModule {
  constructor(iconService: NzIconService) {
    iconService.fetchFromIconfont({
      scriptUrl: 'http://at.alicdn.com/t/font_3294553_frhir9wah3s.js',
    });
  }
}
