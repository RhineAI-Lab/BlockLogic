import { Component, OnInit, AfterViewInit } from '@angular/core';
import {SpaceStyleService} from "../services/space-style.service";

@Component({
  selector: 'app-space-header',
  templateUrl: './space-header.component.html',
  styleUrls: ['./space-header.component.less'],
})
export class SpaceHeaderComponent implements OnInit,AfterViewInit {
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

  spaceStyleService: SpaceStyleService;
  constructor(spaceStyleService: SpaceStyleService) {
    this.spaceStyleService = spaceStyleService
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.spaceStyleService.headerController = {
      changeShowHeader: (show: boolean): void => {
        this.showHeader = show
      }
    }
  }

  onHideHeader(): void{
    //this.showHeader = false
    this.spaceStyleService.changeHeaderDisplay(false)
  }
}

export interface SpaceHeaderController {
  changeShowHeader: Function
}

interface HeaderLink {
  text: string;
  url: string;
}
