import {AfterViewInit, Component, ComponentRef, Injector, OnInit} from '@angular/core';
import {Page, SpaceCenterComponent} from '../space-center/space-center.component';
import {CdkPortalOutletAttachedRef, ComponentPortal} from '@angular/cdk/portal';
import { ProjectFile } from '../../common/project-file.class';
import { SpaceDevelopService } from '../services/space-develop.service';
import { SpaceFileService } from '../services/space-file.service';

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
    private developService: SpaceDevelopService,
    private fileService: SpaceFileService,
  ) {}

  ngOnInit(): void {}

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
      this.pages.push(page);
    } else {
      page = this.pages[index];
    }
    this.targetPage = page;
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

  onComponentRendering(ref: CdkPortalOutletAttachedRef, pageEntry: PageEntry): void {
    ref = ref as ComponentRef<SpaceCenterComponent>;
    pageEntry.state = Page.makePageByFile(pageEntry.file);
    pageEntry.component = ref.instance;
    ref.instance['page'] = pageEntry.state;
    ref.instance['file'] = pageEntry.file;
  }

}

export abstract class PageEntry {
  abstract file: ProjectFile;
  abstract portal?: ComponentPortal<SpaceCenterComponent>;
  abstract component?: SpaceCenterComponent;
  abstract state?: Page;
}


