import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NzContentComponent } from 'ng-zorro-antd/layout';

import { html } from './space-content-old';

@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.less'],
})
export class SpaceComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(NzContentComponent, { read: ElementRef })
  content!: ElementRef<HTMLElement>;

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    // TODO
  }

  ngAfterViewInit(): void {
    this.populate();
  }

  private async populate() {
    this.content.nativeElement.innerHTML = html;
    const $scripts = document.querySelectorAll('app-space script[src]');
    for (let i = 0; i < $scripts.length; i++) {
      const $scriptRaw = $scripts[i] as HTMLScriptElement;
      const $script = document.createElement('script');
      $script.src = $scriptRaw.src;
      document.head.append($script);
      await new Promise((resolve, reject) => {
        $script.onload = resolve;
        $script.onerror = reject;
      });
    }
  }
}
