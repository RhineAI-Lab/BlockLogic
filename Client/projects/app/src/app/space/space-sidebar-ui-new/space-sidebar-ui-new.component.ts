import {AfterViewInit, Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-space-sidebar-ui-new',
  templateUrl: './space-sidebar-ui-new.component.html',
  styleUrls: ['./space-sidebar-ui-new.component.less'],
})
export class SpaceSidebarUiNewComponent implements OnInit, AfterViewInit {
  constructor(private httpClient: HttpClient) {}

  groups: Group[] = [];

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.httpClient
      .get('assets/ui/widgets.json',{responseType: 'json'})
      .subscribe({
        next: (data: any) => {
          this.groups = data.widgetGroups;
        },
    });
  }
}

interface Group {
  name: string;
  open: boolean;
  widgets: Widget[];
}

interface Widget {
  name: string;
  code: string;
  summary: string;
  type: string;
}
