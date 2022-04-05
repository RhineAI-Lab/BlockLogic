import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.less'],
})
export class IconButtonComponent implements OnInit {
  icon?: string;
  @Input() color = '#6E6E6E';
  @Input() size = 16;
  @Input() fill = false;

  @ViewChild('iconWrapper')
  set iconWrapper(elementRef: ElementRef<HTMLDivElement>) {
    this.icon = elementRef.nativeElement.innerText.trim();
  }

  constructor() {}

  ngOnInit(): void {}
}
