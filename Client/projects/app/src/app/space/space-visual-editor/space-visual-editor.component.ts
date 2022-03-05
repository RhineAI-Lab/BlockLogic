import './blocks';

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as ZH from 'blockly/msg/zh-hans';
import { NgxBlocklyConfig } from 'ngx-blockly';
import { Blockly } from 'ngx-blockly';

Blockly.setLocale(ZH);

@Component({
  selector: 'app-space-visual-editor',
  templateUrl: './space-visual-editor.component.html',
  styleUrls: ['./space-visual-editor.component.less'],
})
export class SpaceVisualEditorComponent implements OnInit {
  config?: NgxBlocklyConfig;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient
      .get('assets/space/data/toolbox.xml', { responseType: 'text' })
      .subscribe(
        (xmlText) =>
          (this.config = {
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
            toolbox: xmlText,
          }),
      );
  }
}
