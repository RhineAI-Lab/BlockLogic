
export class ParaUtils {
  static getUrlParameter(name: string): string {
    let matchResult = new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)
    if(matchResult){
      return decodeURIComponent(matchResult[1].replace(/\+/g, '%20'));
    }else{
      return ''
    }
  }
}
