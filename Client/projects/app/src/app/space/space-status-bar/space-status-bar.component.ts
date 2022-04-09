import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SpaceState} from "../shared/space-state.service";

@Component({
  selector: 'app-space-status-bar',
  templateUrl: './space-status-bar.component.html',
  styleUrls: ['./space-status-bar.component.less'],
})
export class SpaceStatusBarComponent implements OnInit, AfterViewInit {
  leftTipText = '';
  rightTipText = '';

  constructor(
    private state: SpaceState,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.state.editorState$.subscribe((state) => {
      this.leftTipText = state;
    });
    this.state.projectState$.subscribe((state) => {
      this.rightTipText = state;
    });
  }

  ngOnAfterViewInit() {}
}
