export class UrlUtils {
  static testMode = true;

  static url = 'logic.autojs.org';
  static prefix = 'http://';

  static makeUrl(_interface: String): string {
    if(this.testMode){
      return `http://127.0.0.1:8000/api/${_interface}`;
    }else{
      return `${this.prefix}${this.url}/api/${_interface}`;
    }
  }

  static makeRunnerPushUrl(): string {
    return this.makeUrl('runner/add');
  }
  static makeRunnerGetUrl(): string {
    return this.makeUrl('runner/result/get');
  }
}