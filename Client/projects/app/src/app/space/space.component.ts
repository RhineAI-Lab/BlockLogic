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
    private developService: SpaceDevelopService,
  ) {
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.developService.init();
  }
}
