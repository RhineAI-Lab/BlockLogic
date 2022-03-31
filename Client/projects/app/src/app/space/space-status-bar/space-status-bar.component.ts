import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-space-status-bar',
  templateUrl: './space-status-bar.component.html',
  styleUrls: ['./space-status-bar.component.less']
})
export class SpaceStatusBarComponent implements OnInit {

  leftTipText: string = '编辑器初始化完成'
  rightTipText: string = '项目打开成功'

  constructor() { }

  ngOnInit(): void {
  }

}
