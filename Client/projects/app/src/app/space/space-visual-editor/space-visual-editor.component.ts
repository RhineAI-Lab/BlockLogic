import { Component, OnInit } from '@angular/core';
import { NgxBlocklyConfig } from 'ngx-blockly';

@Component({
  selector: 'app-space-visual-editor',
  templateUrl: './space-visual-editor.component.html',
  styleUrls: ['./space-visual-editor.component.less'],
})
export class SpaceVisualEditorComponent implements OnInit {
  config: NgxBlocklyConfig = {};

  constructor() {}

  ngOnInit(): void {}
}
