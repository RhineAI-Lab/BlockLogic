import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
})
export class HeaderComponent implements OnInit {
  links: HeaderLink[] = [
    { text: '主页', url: '' },
    { text: '简介', url: '' },
    { text: '教程', url: '' },
    { text: '学习', url: '' },
    { text: '示例', url: '' },
    { text: '社区', url: '' },
    { text: '我的', url: '' },
    { text: '联系我们', url: '' },
  ];

  constructor() {}

  ngOnInit(): void {}
}

interface HeaderLink {
  text: string;
  url: string;
}
