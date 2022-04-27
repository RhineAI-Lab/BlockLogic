import { AfterViewInit, Component, OnInit } from '@angular/core';

import { SpaceDebugService } from './services/space-debug.service';
import { SpaceDevelopService } from './services/space-develop.service';
import { SpaceState } from './services/space-state.service';
import { SpaceFileService } from './services/space-file.service';
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.less'],
  providers: [
    SpaceDevelopService,
    SpaceDebugService,
    SpaceState,
    SpaceFileService,
    Location,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
  ],
})
export class SpaceComponent implements OnInit, AfterViewInit {
  constructor(
    private developService: SpaceDevelopService,
    public location: Location,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    if (environment.production) {
      this.location.replaceState(
        // @ts-ignore
        `../space${this.route.snapshot._routerState.url.substr(1)}`,
      );
    }
  }

  ngAfterViewInit(): void {
    document.addEventListener('keydown', (event) => {
      if (event.ctrlKey && !event.shiftKey && !event.altKey) {
        if (event.key == '6') {
          this.developService.run();
        } else if (event.key == '7') {
          this.developService.stop();
        }
      }
      return false;
    });
  }
}
