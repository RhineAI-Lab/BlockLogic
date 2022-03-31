import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-space-sidebar-files',
  templateUrl: './space-sidebar-projects.component.html',
  styleUrls: ['./space-sidebar-projects.component.less'],
})
export class SpaceSidebarProjectsComponent implements OnInit {
  constructor() {}

  data = [
    {
      title: 'Project',
      key: '100',
      expanded: true,
      children: [
        {
          title: 'src',
          key: '1001',
          expanded: true,
          children: [
            {
              title: 'main.js',
              key: '10020',
              isLeaf: true
            },
            {
              title: 'file.js',
              key: '10020',
              isLeaf: true
            },
          ],
        },
        {
          title: 'res',
          key: '1002',
          expanded: true,
          children: [
            {
              title: 'logo.jpg',
              key: '10020',
              isLeaf: true
            },
            {
              title: 'leaf.jpg',
              key: '10020',
              isLeaf: true
            },
          ],
        },
      ]
    }
  ]

  ngOnInit(): void {}
}
