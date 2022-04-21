import {
  AfterViewInit,
  Component,
  ComponentRef,
  Injector,
  OnInit,
} from '@angular/core';
import {
  Page,
  SpaceCenterComponent,
} from '../space-center/space-center.component';
import {
  CdkPortalOutletAttachedRef,
  ComponentPortal,
} from '@angular/cdk/portal';
import { CodeType, ProjectFile } from '../../common/project-file.class';
import { SpaceDevelopService } from '../services/space-develop.service';
import { SpaceFileService } from '../services/space-file.service';
import { SpaceState } from '../services/space-state.service';
import { SpaceEditorMode, SpaceLayoutMode } from '../common/space-modes.enums';
import { CodeUtils } from '../../common/utils/code.utils';
import { wait } from '../../common/promisify.utils';
import { SpaceToolBarButtonType } from '../space-tool-bar/space-tool-bar.component';

@Component({
  selector: 'app-space-page-manager',
  templateUrl: './space-page-manager.component.html',
  styleUrls: ['./space-page-manager.component.less'],
})
export class SpacePageManagerComponent implements OnInit, AfterViewInit {
  pages: PageEntry[] = [];
  targetPage: PageEntry | null = null;

  constructor(
    private injector: Injector,
    private state: SpaceState,
    private developService: SpaceDevelopService,
    private fileService: SpaceFileService,
  ) {}

  ngOnInit(): void {
    this.state.layoutMode$.subscribe((mode) => {
      this.targetPage?.state?.layoutMode$.next(mode);
    });
    this.state.editorMode$.subscribe((mode) => {
      this.targetPage?.state?.editorMode$.next(mode);
    });
    this.state.needResize$.subscribe(async (v: boolean) => {
      if (v) await wait();
      this.targetPage?.component?.resize();
    });

    this.state.toolbarButtonEvent$.subscribe((v) => {
      if (
        [SpaceLayoutMode.Classic, SpaceLayoutMode.Unspecified].includes(
          this.state.layoutMode$.getValue(),
        )
      ) {
        if (v == SpaceToolBarButtonType.Undo) {
          this.targetPage?.component?.undo();
        } else if (v == SpaceToolBarButtonType.Redo) {
          this.targetPage?.component?.redo();
        }
      }
    });
  }

  ngAfterViewInit() {
    this.developService.project$.subscribe((project) => {
      this.clearPage();
    });
    this.developService.targetFile$.subscribe((file) => {
      this.openPage(file);
    });
    this.developService.closeEvent$.subscribe((file) => {
      this.closePage(file);
    });
    this.fileService.init();
    this.developService.init();
  }

  clearPage() {
    this.pages = [];
    this.targetPage = null;
  }
  openPage(file: ProjectFile) {
    const index = this.getPageIndexByFile(file);
    let page;
    if (index == -1) {
      page = this.use({ file: file });
      this.targetPage = page;
      this.pages.push(page);
    } else {
      page = this.pages[index];
      this.targetPage = page;
    }
    this.state.layoutMode$.next(page.state!.layoutMode$.getValue());
    this.state.editorMode$.next(page.state!.editorMode$.getValue());
  }
  closePage(file: ProjectFile) {
    const index = this.getPageIndexByFile(file);
    if (index != -1) {
      if (this.pages[index] == this.targetPage) {
        this.targetPage = null;
      }
      this.pages.splice(index, 1);
    }
  }

  private getPageIndexByFile(file: ProjectFile): number {
    return this.pages.findIndex((page) => page.file === file);
  }

  private use(definition: PageEntry): PageEntry {
    const injector = Injector.create({
      parent: this.injector,
      providers: [{ provide: PageEntry, useValue: definition }],
    });
    definition.portal = new ComponentPortal(
      SpaceCenterComponent,
      undefined,
      injector,
    );

    return definition;
  }

  onComponentRendering(
    ref: CdkPortalOutletAttachedRef,
    pageEntry: PageEntry,
  ): void {
    const file = pageEntry.file;
    pageEntry.state = Page.makePageByFile(file);
    if (file.opened) {
      if (
        file.codeType == CodeType.PY_BLOCK_DL ||
        file.codeType == CodeType.JS_BLOCK_AUTO
      ) {
        this.state.layoutMode$.next(SpaceLayoutMode.Split);
      } else {
        this.state.layoutMode$.next(SpaceLayoutMode.Unspecified);
      }
      if (file.type == 'js') {
        const xmlList = CodeUtils.getXmlCodeList(file.code);
        if (xmlList.length > 0) {
          this.state.editorMode$.next(SpaceEditorMode.Design);
        }
      }
    }
    ref = ref as ComponentRef<SpaceCenterComponent>;
    pageEntry.component = ref.instance;
    ref.instance['page'] = pageEntry.state;
    ref.instance['file'] = file;
  }
}

export abstract class PageEntry {
  abstract file: ProjectFile;
  abstract portal?: ComponentPortal<SpaceCenterComponent>;
  abstract component?: SpaceCenterComponent;
  abstract state?: Page;
}
