import {
  Component,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.less'],
})
export class DividerComponent implements OnInit, OnChanges {
  @HostBinding('class') @Input() type: DividerType = 'horizontal';

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {}
}

type DividerType = 'vertical' | 'horizontal';
