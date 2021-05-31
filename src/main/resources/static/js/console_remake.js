//重构console以拦截
console.oldLog = console.log;
console.oldInfo = console.info;
console.oldWarn = console.warn;
console.oldError = console.error;
console.logCallback = function(msg, level){
    return true
};
console.verbose = function (msg) {
    console.oldLog(msg);
    console.logCallback(msg,'v');
};
console.log = function (msg) {
    console.oldLog(msg);
    console.logCallback(msg,'d');
};
console.info = function (msg) {
    console.oldInfo(msg);
    console.logCallback(msg,'i');
};
console.warn = function (msg) {
    console.oldWarn(msg);
    console.logCallback(msg,'w');
};
console.error = function (msg) {
    console.oldError(msg);
    console.logCallback(msg,'e');
};
