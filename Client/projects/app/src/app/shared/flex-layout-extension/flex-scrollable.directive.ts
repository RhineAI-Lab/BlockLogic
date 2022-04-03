import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, HostBinding, Input, OnChanges } from '@angular/core';
import { BooleanInput } from 'ng-zorro-antd/core/types';

@Directive({
  selector: '[fxFlex]',
})
export class FlexScrollableDirective implements OnChanges {
  @Input() fxFlex?: string;
  @Input() set fxFlexScrollable(v: BooleanInput) {
    this.scrollable = coerceBooleanProperty(v);
  }

  @HostBinding('style.height') height?: string;
  scrollable = false;

  constructor() {}

  ngOnChanges(): void {
    if (this.fxFlex == 'grow' && this.scrollable) this.height = '0';
    else this.height = undefined;
  }
}
