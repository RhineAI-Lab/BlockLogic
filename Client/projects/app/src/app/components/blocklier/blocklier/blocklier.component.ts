import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxBlocklyConfig, NgxBlocklyGenerator } from 'ngx-blockly';

@Component({
  selector: 'app-blocklier',
  templateUrl: './blocklier.component.html',
  styleUrls: ['./blocklier.component.less'],
})
export class BlocklierComponent implements OnInit {
  config?: NgxBlocklyConfig;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient
      .get('assets/toolbox.xml', { responseType: 'text' })
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
            generators: [NgxBlocklyGenerator.JAVASCRIPT],
          }),
      );
  }
}
