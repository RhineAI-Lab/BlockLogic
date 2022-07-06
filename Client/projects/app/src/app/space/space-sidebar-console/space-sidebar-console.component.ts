import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Output, SpaceDevelopService } from '../services/space-develop.service';

@Component({
  selector: 'app-space-sidebar-console',
  templateUrl: './space-sidebar-console.component.html',
  styleUrls: ['./space-sidebar-console.component.less'],
})
export class SpaceSidebarConsoleComponent implements OnInit {
  lines: Output[] = [
    {
      type: 'text',
      time: new Date(),
      content: 'lalala1',
      from: "",
    },
    {
      type: 'text',
      time: new Date(),
      content: 'lalala2',
      from: "",
    },
  ];

  private subscription?: Subscription;

  constructor(private developService: SpaceDevelopService) {}

  ngOnInit(): void {
    this.subscription = this.developService.output$.subscribe({
      next: (output) => {
        if(output.type=="json"&&output.data==null){
          output.data = JSON.parse(output.content)
          console.log(output)
        }
        this.lines.push(output);
      },
    });
    this.developService.output$.next({
      type: 'json',
      time: new Date(),
      content: '{"key1":"value1","num":10,"arr":[10,12,13],"arr2":[{"k1":null},{"k2":777,"bo":true}]}',
      from: "",
    })
  }
}
