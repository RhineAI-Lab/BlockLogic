import { environment } from '../../../environments/environment';

export class UrlUtils {
  static makeUrl(_interface: String): string {
    if (environment.production) {
      return `/api/${_interface}`;
    } else {
      return `/api/${_interface}`;
    }
  }

  static makeRunnerPushUrl(): string {
    return this.makeUrl('runner/add');
  }
  static makeRunnerGetUrl(): string {
    return this.makeUrl('runner/result/get');
  }
}
