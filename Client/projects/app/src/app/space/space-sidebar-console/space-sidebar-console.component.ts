import { Component, OnDestroy, OnInit } from '@angular/core';
import * as dayjs from 'dayjs';
import { Subscription } from 'rxjs';

import { SandboxOutput } from '../../common/sandbox.class';
import { SpaceDevelopService } from '../services/space-develop.service';

@Component({
  selector: 'app-space-sidebar-console',
  templateUrl: './space-sidebar-console.component.html',
  styleUrls: ['./space-sidebar-console.component.less'],
})
export class SpaceSidebarConsoleComponent implements OnInit, OnDestroy {
  lines: string[] = [];

  private subscription?: Subscription;

  constructor(private developService: SpaceDevelopService) {}

  ngOnInit(): void {
    this.subscription = this.developService.output$.subscribe({
      next: (output) => {
        if (output.type && output.type!='error') {
          if (typeof output.data === 'string') {
            this.resolveString(output.data);
          }else{
            this.resolveOutput(output);
          }
        } else if (output.type && output.type=='error') {
          if (typeof output.data === 'string') {
            this.resolveValue(output.data);
          }else {
            this.resolveError(output.data);
          }
        } else if (typeof output === 'string') {
          this.resolveString(output);
        }
      },
      error: (error) => {
        this.resolveError(error);
      },
    });
    this.developService.stringOutput.subscribe((output) => {
      if(output.startsWith('NO-TIME ')){
        this.resolveString(output.substring(8));
      }else{
        this.resolveStringWithTime(output);
      }
    });
    this.resolveStringWithTime('控制台初始化完成');
  }

  encodeHtml(text: string): string {
    text = text.replace(/ /g, '&nbsp;');
    text = text.replace(/\n/g, '<br>');
    return text;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  resolveOutput(output: SandboxOutput, isOnline = true): void {
    const content = output.data.map((data) => this.stringify(data)).join(' ');
    const prefix = isOnline ? 'OnLine' : 'Origin';
    this.lines.push(
      `${this.getTime()} [${prefix}]/${output.type[0].toUpperCase()}:  ${content}`,
    );
  }
  resolveValue(output: string, isOnline = true): void {
    const prefix = isOnline ? 'OnLine' : 'Origin';
    this.lines.push(`${this.getTime()} [${prefix}]/Output:  ${output}`);
  }
  resolveError(output: string, isOnline = true): void {
    const prefix = isOnline ? 'OnLine' : 'Origin';
    this.lines.push(`${this.getTime()} [${prefix}]/Error:  ${output}`);
  }
  resolveErrorNextLine(output: string, isOnline = true): void {
    const prefix = isOnline ? 'OnLine' : 'Origin';
    this.lines.push(`${this.getTime()} [${prefix}]/Error:\n${output}`);
  }
  resolveStringWithTime(text: string): void {
    this.lines.push(this.getTime() + ' ' + text);
  }
  resolveString(text: string): void {
    this.lines.push(text);
  }

  getTime(): string {
    return dayjs().format('HH:mm:ss');
  }
  getSingleType(type: string): string {
    if (type == 'info') return 'I';
    if (type == 'warn') return 'W';
    if (type == 'error') return 'E';
    if (type == 'debug') return 'V';
    return 'D';
  }

  private stringify(data: unknown): string {
    try {
      return JSON.stringify(data);
    } catch (error) {
      return String(data);
    }
  }
}
