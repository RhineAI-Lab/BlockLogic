//重构console以拦截
console.oldLog = console.log;
console.oldInfo = console.info;
console.oldWarn = console.warn;
console.oldError = console.error;
console.logCallback = function(msg, level){return true};
console.verbose = function (msg) {console.oldLog(msg);console.logCallback(msg,'v');};
console.log = function (msg) {console.oldLog(msg);console.logCallback(msg,'d');};
console.info = function (msg) {console.oldInfo(msg);console.logCallback(msg,'i');};
console.warn = function (msg) {console.oldWarn(msg);console.logCallback(msg,'w');};
console.error = function (msg) {console.oldError(msg);console.logCallback(msg,'e');};

const normalLogTag = "WebLog";
loadFinal = 2;

//全局参数
var normalCode = "\n\n\n\n//------ 图形块结构记录 请勿随意修改 ------\n/*<xml xmlns=\"https://Logic.AutoJs.org/xml\"></xml>*/\n";
var savedCode = "";

var inited = false;
var webConsole = null;
var autoClose = true;
var autoCode = true;
var unfoldXml = false;

window.onload=function(){
    //初始化代码编辑器
    require("modules/ace/ace.js",function () {
        AceUtils.createEditor("editor");
    });

    //初始化列表
    require("js/plugins/jquery.ztree.all.min.js",function () {
        FilesTree.init("directory-tree");
    });

    //初始化侧栏
    DrawSpace.initSidebar("side-bar");

    //边框跟随检测
    var doAfter = function(){
        if(DrawSpace.workspace!=null){
            DrawSpace.freshSize()
        }
    };
    ViewUtils.makeDrawer("directory-space","left",doAfter);
    ViewUtils.makeDrawer("console-space","right",doAfter);
    ViewUtils.makeDrawer("editor-space","right",doAfter);

    //初始化工具栏
    toolbar = new Vue({
        el: '#toolbar',
        data: {
            ip: '',
            path: '',
        },
        methods:{
            changeAutoClose:function(v){
                autoClose = !autoClose;
                ViewUtils.changeShowBtnState(v,!autoClose)
            },
            changeAutoCode:function(v){
                autoCode = !autoCode;
                ViewUtils.changeShowBtnState(v,autoCode)
            },
            changeXmlFoldMode:function(v){
                unfoldXml = !unfoldXml;
                ViewUtils.changeShowBtnState(v,unfoldXml);
                toCode();
            },
            toCode:function () {
                toCode();
            },
            saveCode:function () {
                save();
            },
            runCode:function () {
                showConsole();
                console.verbose(FilesTree.fileNode.name+" 开始运行");
                startTime = new Date().getTime();
                eval(AceUtils.getCode());
                useTime = new Date().getTime()-startTime;
                console.verbose(FilesTree.fileNode.name+" 运行完成 用时:"+(useTime/1000).toFixed(5)+"s");
            },
            toBlock:function(){
                if (!toBlock()){
                    alert("反向生成功能开发中...敬请期待。")
                }
            },
            connect:function(){
                var ip = document.getElementById("input-ip").value;
                if(StringUtils.checkIP(ip)){
                    showConsole();
                    DebugPlugin.connect("ws://"+ip+":9315/")
                }else {
                    alert("请输入正确的IP地址")
                }
            },
            originRun:function(){
                if(!DebugPlugin.connected){
                    alert("请先连接设备。");
                    webConsole.log("请先连接设备。",DebugPlugin.SOURCE_TAG);
                    return
                }
                DebugPlugin.runFile("BlockLogic-Online",AceUtils.getCode())
            },
            push:function(){
                if(!DebugPlugin.connected){
                    alert("请先连接设备。");
                    webConsole.log("请先连接设备。",DebugPlugin.SOURCE_TAG);
                    return
                }
                var name = FilesTree.fileNode.name;
                if(name!=null&&name.length>0){
                    DebugPlugin.saveFile("BlockLogic-Online\\"+name,AceUtils.getCode())
                }else{
                    alert("请输入保存用的文件名");
                    webConsole.log("请输入保存用的文件名。",DebugPlugin.SOURCE_TAG)
                }
            },
            ask:function(){
                alert("文档正在编辑中，请稍后。")
            },
            show:function (target) {
                var id = target.id;
                if(id==="show-console"){
                    ViewUtils.changeShowMode("console-space",target);
                }else if(id==="show-editor"){
                    ViewUtils.changeShowMode("editor-space",target);
                }else if(id==="show-directory"){
                    ViewUtils.changeShowMode("directory-space",target);
                }else if(id==="show-draw"){
                    if(document.getElementById("draw-space").style.display==="none"){
                        document.getElementById("editor-space").style.removeProperty("flex-grow")
                    }else {
                        document.getElementById("editor-space").style.setProperty("flex-grow","1")
                    }
                    ViewUtils.changeShowMode("draw-space",target);
                }
                if(document.getElementById("draw-space").style.display==="inline-block"){
                    DrawSpace.freshSize();
                }
            }
        }
    });
    ViewUtils.changeShowBtnState("use-auto-code",true);
    ViewUtils.changeShowBtnState("show-directory",false);
    ViewUtils.changeShowBtnState("show-draw",true);
    ViewUtils.changeShowBtnState("show-editor",true);
    ViewUtils.changeShowBtnState("show-console",false);
    ViewUtils.changeViewState("directory-space",false);
    ViewUtils.changeViewState("editor-space",true);
    ViewUtils.changeViewState("draw-space",true);
    ViewUtils.changeViewState("console-space",false);
    DrawSpace.init("draw","toolbox");
    document.getElementById("upload").addEventListener("change",function (e) {
        let files = e.target.files;
        if(files.length>0){
            askForSave();
            let name = files[0].name;
            let reader = new FileReader();
            reader.readAsText(files[0], 'UTF-8');
            reader.onload = function (e) {
                let fileContent = e.target.result;
                openFile(FilesTree.MODE_SINGLE_FILE,name,fileContent)
            }
        }
        event.target.value="";
    });

    //初始化控制台
    console.logCallback = function(msg,level){
        webConsole.log(msg,"Web/"+level);
        return true
    };
    webConsole = new Vue({
        el:'#console-box',
        data:{
            list:[]
        }
    });
    webConsole.log = function (msg,source,time) {
        source = source+": " || 'Unknown/v: ';
        time = time || StringUtils.getDateString();
        time = time.length>0?time+' ':'';
        msg = time + source + msg;
        this.list.push(msg)
    };
    webConsole.directLog = function(msg){
        this.list.push(msg)
    };
    console.verbose("控制台初始化完成");

    //插件配置
    DebugPlugin.onConnect = function(){
        webConsole.log("连接成功 设备:"+DebugPlugin.device,DebugPlugin.SOURCE_TAG+"/i");
        DebugPlugin.requestToken();
    };
    DebugPlugin.onClose = function(){
        webConsole.log("连接断开",DebugPlugin.SOURCE_TAG+"/w");
    };
    DebugPlugin.onMsg = function(type,data){
        if(type===1){
            if(data.type==="log"){
                let msg = data.data.log;
                webConsole.directLog(msg)
            }
        }
    };
    DebugPlugin.onError = function (evt) {
        webConsole.log("连接错误: "+evt.target.url,DebugPlugin.SOURCE_TAG+"/e");
    };

    //等待全部资源加载及回调完毕后
    afterLoaded = function(){
        inited = true;

        //监听自动同步代码
        DrawSpace.addChangeListener(function (event) {
            if(autoCode){
                toCode();
            }
        });
        //打开资源
        var source=getURLParameter("source");
        if(source!=null&&source.length>0){
            openSource(source);
        }else {
            newFile();
        }
    };
};

function openSource(source) {
    let name = StringUtils.getFileName(source);
    let xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp=new XMLHttpRequest();//code for IE7+, Firefox, Chrome, Opera, Safari
    } else{
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");//code for IE6, IE5
    }
    xmlhttp.open("get",source,true);
    xmlhttp.send();
    xmlhttp.onreadystatechange=function(){
        if(xmlhttp.readyState===4) {
            if(xmlhttp.status===200){
                openFile(FilesTree.MODE_SINGLE_FILE,name,xmlhttp.responseText);
            } else{
                alert("导入失败，服务端文件可能未开放。");
                newFile();
            }
        }
    };
}

function newFile() {
    FilesTree.updateFileName("Untitled.js");
    savedCode = normalCode;
    AceUtils.setCode(normalCode);
}

function openFile(type,name,code) {
    FilesTree.updateFileName(name);
    savedCode = code;
    AceUtils.setCode(code);
    toBlock();
}

function askOnLeave(e){
    var e = window.event||e;
    e.returnValue=("请确保您的代码可能未保存。是否确定离开？");
}

function showConsole() {
    ViewUtils.changeViewState("console-space",true);
    ViewUtils.changeShowBtnState(document.getElementById("show-console"),true);
    DrawSpace.freshSize();
}

function toCode() {
    var code = DrawSpace.spaceToCode();
    var xml = DrawSpace.spaceToXml(unfoldXml);
    AceUtils.setCode(code+"\n\n\n\n//------ 图形块结构记录 请勿随意修改 ------\n/*"+xml+"*/\n");
}

function toBlock() {
    var xml = CodeUtils.getXml(AceUtils.getCode());
    return DrawSpace.xmlToSpace(xml);
}

function save() {
    savedCode = AceUtils.getCode()+"";
    exportRaw(FilesTree.fileNode.name,savedCode)
}

function askForSave(){
    if(inited&&AceUtils.getCode()!=savedCode){
        if(confirm("代码还未保存，是否保存？")){
            save();
            return true;
        }
        return false;
    }
    return false;
}


function fakeClick(obj) {
    var ev = document.createEvent("MouseEvents");
    ev.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    obj.dispatchEvent(ev);
}

function exportRaw(name, data) {
    var urlObject = window.URL || window.webkitURL || window;
    var export_blob = new Blob([data]);
    var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
    save_link.href = urlObject.createObjectURL(export_blob);
    save_link.download = name;
    fakeClick(save_link);
}

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}
