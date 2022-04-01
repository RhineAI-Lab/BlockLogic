import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-space-header',
  templateUrl: './space-header.component.html',
  styleUrls: ['./space-header.component.less'],
})
export class SpaceHeaderComponent implements OnInit {
  // TODO: links
  links: HeaderLink[] = [
    { text: '主页', url: '/' },
    { text: '简介', url: '/#about' },
    { text: '教程', url: '/docs' },
    { text: '学习', url: '/#learn' },
    { text: '示例', url: '/examples' },
    { text: '社区', url: '' },
    { text: '我的', url: '' },
    { text: '联系我们', url: '/#contact' },
  ];

  showHeader: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  onHideHeader(): void{
    this.showHeader = false
  }
}

interface HeaderLink {
  text: string;
  url: string;
}
