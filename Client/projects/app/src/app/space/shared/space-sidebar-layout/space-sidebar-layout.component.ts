import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-space-sidebar-layout',
  templateUrl: './space-sidebar-layout.component.html',
  styleUrls: ['./space-sidebar-layout.component.less']
})
export class SpaceSidebarLayoutComponent implements OnInit {
  @Input() icon!: string ;
  @Input() title!: string ;

  constructor() { }

  ngOnInit(): void {
  }

}
