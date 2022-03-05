import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.less'],
})
export class LayoutHeaderComponent implements OnInit {
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

  constructor() {}

  ngOnInit(): void {}
}

interface HeaderLink {
  text: string;
  url: string;
}
