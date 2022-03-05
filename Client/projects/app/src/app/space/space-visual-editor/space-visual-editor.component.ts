import './blocks';

import { Component, OnInit } from '@angular/core';
import { NgxBlocklyConfig } from 'ngx-blockly';

@Component({
  selector: 'app-space-visual-editor',
  templateUrl: './space-visual-editor.component.html',
  styleUrls: ['./space-visual-editor.component.less'],
})
export class SpaceVisualEditorComponent implements OnInit {
  config: NgxBlocklyConfig = {
    grid: {
      spacing: 20,
      length: 6,
      colour: '#ddd',
      snap: true,
    },
    zoom: {
      controls: true,
      wheel: true,
      startScale: 1.0,
      maxScale: 2,
      minScale: 0.5,
      scaleSpeed: 1.2,
    },
  };

  constructor() {}

  ngOnInit(): void {}
}
