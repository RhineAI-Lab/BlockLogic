import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UrlUtils } from '../../common/utils/url.utils';
import { Subject } from 'rxjs';

@Injectable()
export class SpaceRunnerService {
  readonly events$ = new Subject<RunnerEvents>();

  constructor(private httpClient: HttpClient) {}

  async run(user: string, code: string, file: string): Promise<void> {
    const params = new HttpParams();
    params.set('user', user);
    params.set('code', code);
    params.set('file', file);
    const pushResult = await this.httpClient
      .get(UrlUtils.makeRunnerPushUrl(), {
        params: params,
        responseType: 'json',
      })
      .toPromise();
    console.log(pushResult);
  }
}

interface RunnerEvents {
  type: 'push' | 'output' | 'input' | 'start' | 'end' | 'error';
  time: number;
  msg: string;
}
