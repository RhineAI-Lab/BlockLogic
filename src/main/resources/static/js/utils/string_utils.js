
const StringUtils = {};

//获取当前时间字符串
StringUtils.getDateString = function(){
    return new Date().Format("MM-dd hh:mm:ss.S");
};

//检查ip
StringUtils.checkIP = function(value){
    var exp=/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    var reg = value.match(exp);
    return reg!=null
};

//获取文件名(含后缀)
StringUtils.getFileName = function(path){
    var pos1 = path.lastIndexOf('/');
    var pos2 = path.lastIndexOf('\\');
    var pos  = Math.max(pos1, pos2);
    if( pos<0 )
        return path;
    else
        return path.substring(pos+1);
};

//检查是否为空白字符
StringUtils.isSpaceChar = function(char){
    return char===' '||char==='\n'||char==='\t'||char==='\r'
};

//获取字符所在所在行号(0开始)
StringUtils.getLineNum = function(str,index){
    var lineNum = 0;
    for (let i = 0; i < index; i++) {
        if(str.charAt(i)=='\n'){
            lineNum++
        }
    }
    return lineNum
};

//获取字符坐标所在行
StringUtils.getLineContain = function(str,index){
    var lineNum = 0;
    var start = 0;
    var end = str.length;
    var flag = false;
    for (let i = 0; i < str.length; i++) {
        if(i==index){
            flag = true;
        }
        if(str.charAt(i)=='\n'){
            if(!flag){
                start = i;
            }else {
                end = i;
                break;
            }
            lineNum++
        }
    }
    return str.substring(start+1,end)
};

//查找上一个非空字符坐标
StringUtils.getLastNotSpaceIndex = function(str,index){
    for(let i=index;i>=0;i--){
        if(!StringUtils.isSpaceChar(str.charAt(i))){
            return i
        }
    }
    return -1;
};

//日期解析
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o){
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};





