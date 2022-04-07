import { Component, OnInit } from '@angular/core';
import {SpaceDevelopService} from "../shared/space-develop.service";

@Component({
  selector: 'app-space-status-bar',
  templateUrl: './space-status-bar.component.html',
  styleUrls: ['./space-status-bar.component.less'],
})
export class SpaceStatusBarComponent implements OnInit {
  leftTipText = '';
  rightTipText = '';

  constructor(developService: SpaceDevelopService) {
    developService.editorState$.subscribe(state => {
      this.leftTipText = state;
    });
    developService.projectState$.subscribe(state => {
      this.rightTipText = state;
    });
  }

  ngOnInit(): void {}
}
