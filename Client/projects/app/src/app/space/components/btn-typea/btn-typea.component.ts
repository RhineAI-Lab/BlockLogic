import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-btn-typea',
  templateUrl: './btn-typea.component.html',
  styleUrls: ['./btn-typea.component.less']
})
export class BtnTypeaComponent implements OnInit {
  @Input() icon!: string;
  @Input() color: string = "#6F6F6F";
  @Input() size: number = 16;

  constructor() {}

  ngOnInit(): void {
  }

}
