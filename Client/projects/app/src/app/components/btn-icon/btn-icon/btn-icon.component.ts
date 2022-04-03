import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-btn-icon',
  templateUrl: './btn-icon.component.html',
  styleUrls: ['./btn-icon.component.less'],
})
export class BtnIconComponent implements OnInit {
  @Input() icon!: string;
  @Input() color = '#6E6E6E';
  @Input() size = 16;
  @Input() fill = false;

  constructor() {}

  ngOnInit(): void {}
}
