

function sleep(delay) {
    for(var t = Date.now(); Date.now() - t <= d;);
}

function log(msg) {
    console.log(msg);
}

function toastLog(msg) {
    console.log("ToastLog: "+msg);
}

function toast(msg) {
    console.log("Toast: "+msg);
}

function random(minNum,maxNum){
    switch(arguments.length){
        case 1:
            return parseInt(Math.random()*minNum+1,10);
            break;
        case 2:
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
            break;
        default:
            return 0;
            break;
    }
}

var dialogs = {};
dialogs.alert = function (title, content) {
    return alert(title+"\n"+content);
};
dialogs.confirm = function (title, content) {
    return confirm(title+"\n"+content);
};
dialogs.rawInput = function (title, content) {
    return prompt(title,content);
};
dialogs.input = function (title, content) {
    return prompt(title,content);
};
