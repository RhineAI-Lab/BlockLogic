import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-btn-icon',
  templateUrl: './btn-icon.component.html',
  styleUrls: ['./btn-icon.component.less']
})
export class BtnIconComponent implements OnInit {
  @Input() icon!: string;
  @Input() color: string = "#6F6F6F";
  @Input() size: number = 16;
  @Input() fill: boolean = false;

  constructor() {}

  ngOnInit(): void {
  }

}
