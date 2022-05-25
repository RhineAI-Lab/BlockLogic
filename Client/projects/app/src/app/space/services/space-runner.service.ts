import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlUtils } from '../../common/utils/url.utils';
import { Subject } from 'rxjs';

@Injectable()
export class SpaceRunnerService {
  readonly events$ = new Subject<RunnerEvents>();

  constructor(private httpClient: HttpClient) {}

  async run(user: string, code: string, file: string): Promise<void> {
    const httpParams = {
      code: code,
      user: user,
      file: file,
    }
    try {
      const pushResult = await this.httpClient
        .get(UrlUtils.makeRunnerPushUrl(), {
          params: httpParams,
          responseType: 'json',
        })
        .toPromise();
      console.log(pushResult);
    }catch (e) {
      this.events$.next({type: 'error', msg: '任务上传失败', time: -1});
    }
  }
}

interface RunnerEvents {
  type: 'push' | 'output' | 'input' | 'start' | 'end' | 'error';
  time: number;
  msg: string;
}
