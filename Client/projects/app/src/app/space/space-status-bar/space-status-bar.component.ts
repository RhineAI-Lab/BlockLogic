import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SpaceDevelopService } from '../shared/space-develop.service';

@Component({
  selector: 'app-space-status-bar',
  templateUrl: './space-status-bar.component.html',
  styleUrls: ['./space-status-bar.component.less'],
})
export class SpaceStatusBarComponent implements OnInit {
  leftTipText = '';
  rightTipText = '';

  constructor(
    private developService: SpaceDevelopService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    // TODO: 校验错误提示
    this.developService.editorState$.subscribe((state) => {
      this.leftTipText = state;
    });
    this.developService.projectState$.subscribe((state) => {
      this.rightTipText = state;
    });
  }

  ngOnAfterViewInit() {}
}
