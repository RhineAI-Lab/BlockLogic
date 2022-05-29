import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlUtils } from '../../common/utils/url.utils';
import { Subject } from 'rxjs';

@Injectable()
export class SpaceRunnerService {
  readonly events$ = new Subject<RunnerEvents>();

  constructor(private httpClient: HttpClient) {}

  async run(user: string, code: string, file: string): Promise<void> {
    const pushParams = {
      code: encodeURIComponent(code),
      user: user,
      file: file,
    };
    try {
      const pushResult: any = await this.httpClient
        .get(UrlUtils.makeRunnerPushUrl(), {
          params: pushParams,
          responseType: 'json',
        })
        .toPromise();
      console.log(pushResult);
      const params = {
        task: pushResult.value.id,
        start: 0,
      };
      let startTime = -1;
      let continue_flag = true;
      while (continue_flag) {
        const result: any = await this.httpClient
          .get(UrlUtils.makeRunnerGetUrl(), {
            params: params,
            responseType: 'json',
          })
          .toPromise();
        console.log(result);
        if (result.result == 200) {
          for (const output of result.value) {
            if (output.type == 'output') {
              this.events$.next({
                type: 'output',
                msg: output.msg,
                time: output.time,
              });
            } else if (output.type == 'start') {
              this.events$.next({
                type: 'start',
                msg: output.msg,
                time: output.time,
              });
              startTime = output.time;
            } else if (output.type == 'error') {
              this.events$.next({
                type: 'error',
                msg: output.msg,
                time: output.time,
              });
              params.start = output.id + 1;
            } else if (output.type == 'end') {
              this.events$.next({
                type: 'end',
                msg: output.msg,
                time: output.time - startTime,
              });
              continue_flag = false;
              break;
            }
            params.start = output.id + 1;
          }
        } else if (result.result == 202) {
          continue;
        } else if (result.result == 601) {
          this.events$.next({ type: 'error', msg: '任务不存在', time: -1 });
          break;
        } else {
          this.events$.next({ type: 'error', msg: '网络连接错误', time: -1 });
          break;
        }
      }
    } catch (e) {
      this.events$.next({ type: 'error', msg: '任务上传失败', time: -1 });
    }
  }
}

interface RunnerEvents {
  type: 'push' | 'output' | 'input' | 'start' | 'end' | 'error';
  time: number;
  msg: string;
}
