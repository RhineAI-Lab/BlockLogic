import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SpaceStyleService} from "../../services/space-style.service";

@Component({
  selector: 'app-space-sidebar-layout',
  templateUrl: './space-sidebar-layout.component.html',
  styleUrls: ['./space-sidebar-layout.component.less']
})
export class SpaceSidebarLayoutComponent implements OnInit {
  @Input() icon!: string ;
  @Input() title!: string ;
  @Input() name!: string;

  styleService: SpaceStyleService

  constructor(styleService: SpaceStyleService) {
    this.styleService = styleService;
  }

  ngOnInit(): void {

  }

  onHideBtn(): void {
    console.log(this.name)
    this.styleService.hideSidebar(this.name)
  }

}
