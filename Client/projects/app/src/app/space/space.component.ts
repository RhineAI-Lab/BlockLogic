import {AfterViewInit, Component, OnInit} from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { SpaceDebugService } from './shared/space-debug.service';
import { SpaceDevelopService } from './shared/space-develop.service';
import { SpaceState } from './shared/space-state.service';

@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.less'],
  providers: [
    SpaceDevelopService,
    SpaceDebugService,
    SpaceState,
  ],
})
export class SpaceComponent implements OnInit, AfterViewInit {

  constructor(
    private debugService: SpaceDebugService,
    private developService: SpaceDevelopService,
    private notifier: NzNotificationService,
  ) {
    this.subscribeDebugEvents();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.developService.init();
  }

  private subscribeDebugEvents(): void {
    this.developService.debugEvents.subscribe((event) => {
      this.notifier.remove();
      const device = this.debugService.device; // TODO: avoid accessing the internal service
      if (event.type == 'connect') {
        this.notifier.success('连接成功', `设备：${device}`);
      }
      if (event.type == 'close') {
        this.notifier.warning('连接断开', `设备：${device}`);
      }
      if (event.type == 'error') {
        const eventTarget = event.payload.target as
          | (EventTarget & { url: string })
          | undefined;
        this.notifier.error('连接错误', `地址: ${eventTarget?.url}`);
      }
    });
  }
}
