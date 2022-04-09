import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { SpaceDebugService } from './shared/space-debug.service';
import { SpaceDevelopService } from './shared/space-develop.service';
import { SpaceState } from './shared/space-state.service';
import {SpaceFileService} from "./shared/space-file.service";

@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.less'],
  providers: [SpaceDevelopService, SpaceDebugService, SpaceState, SpaceFileService],
})
export class SpaceComponent implements OnInit, AfterViewInit {
  constructor(
    private debugService: SpaceDebugService,
    private developService: SpaceDevelopService,
    private notifier: NzNotificationService,
  ) {
    this.subscribeNotifier();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.developService.init();
  }

  private subscribeNotifier(): void {
    this.developService.notification$.subscribe({
      next: (notification) => {
        if (notification.type == 'remove') {
          this.notifier.remove();
        } else {
          this.notifier.create(
            notification.type,
            notification.title ? notification.title : '',
            notification.content ? notification.content : '',
          );
        }
      },
    });
  }
}
