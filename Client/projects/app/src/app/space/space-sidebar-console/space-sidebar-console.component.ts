import { Component, OnDestroy, OnInit } from '@angular/core';
import * as dayjs from 'dayjs';
import { Subscription } from 'rxjs';

import { SandboxOutput} from '../../common/sandbox.class';
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
    this.subscription = this.developService.output$.subscribe((output) => {
      if(output.type && output.data) {
        this.resolveOutput(output);
      }else if(typeof output === 'string') {
        this.resolveValue(output);
      }
    });
    this.developService.debugOutput$.subscribe((output) => {
      this.resolveStringWithTime(output);
    });
    this.resolveStringWithTime('控制台初始化完成');
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  resolveOutput(output: SandboxOutput): void {
    const content = output.data.map((data) => this.stringify(data)).join(' ');
    this.lines.push(
      `${this.getTime()} [OnLine]/${output.type[0].toUpperCase()}:  ${content}`,
    );
  }
  resolveValue(output: string): void {
    this.lines.push(
      `${this.getTime()} [OnLine]/Python:  ${output}`,
    );
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
