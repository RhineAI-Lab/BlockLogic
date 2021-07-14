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

//全局参数
var normalCode = "\n\n\n\n//------ 图形块结构记录 请勿随意修改 ------\n/*<xml xmlns=\"https://BLogic.AutoJs.org/xml\"></xml>*/\n";
var savedCode = "";

var inited = false;

var editor = null;
var webConsole = null;

var autoClose = true;
var autoCode = true;
var unfoldXml = false;

window.onload=function(){
    ViewUtils.makeDrawer("directory-space","left");
    ViewUtils.makeDrawer("console-space","right");
    ViewUtils.makeDrawer("editor-space","right");

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
                changeShowBtnState(v,!autoClose)
            },
            changeAutoCode:function(v){
                autoCode = !autoCode;
                changeShowBtnState(v,autoCode)
            },
            changeXmlFoldMode:function(v){
                unfoldXml = !unfoldXml;
                changeShowBtnState(v,unfoldXml);
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
                eval(getCode());
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
                DebugPlugin.runFile("BlockLogic-Online",getCode())
            },
            push:function(){
                if(!DebugPlugin.connected){
                    alert("请先连接设备。");
                    webConsole.log("请先连接设备。",DebugPlugin.SOURCE_TAG);
                    return
                }
                var name = FilesTree.fileNode.name;
                if(name!=null&&name.length>0){
                    DebugPlugin.saveFile("BlockLogic-Online\\"+name,getCode())
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
                    changeShowMode("console-space",target);
                    DrawSpace.freshSize();
                }else if(id==="show-editor"){
                    changeShowMode("editor-space",target);
                    DrawSpace.freshSize();
                }else if(id==="show-directory"){
                    changeShowMode("directory-space",target);
                    DrawSpace.freshSize();
                }else if(id==="show-draw"){
                    changeShowMode("draw-space",target);
                }
            }
        }
    });
    changeShowBtnState("use-auto-code",true);
    changeShowBtnState("show-directory",false);
    changeShowBtnState("show-draw",true);
    changeShowBtnState("show-editor",true);
    changeShowBtnState("show-console",false);
    changeViewState("directory-space",false);
    changeViewState("editor-space",true);
    changeViewState("draw-space",true);
    changeViewState("console-space",false);

    document.getElementById("upload").addEventListener("change",function (e) {
        var files = e.target.files;
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

    //初始化代码编辑器
    editor = ace.edit("editor");//设置编辑器样式，对应theme-*.js文件
    editor.setTheme("ace/theme/solarized_light");
    editor.session.setMode("ace/mode/javascript");//设置代码语言，对应mode-*.js文件
    editor.setShowPrintMargin(false);//设置打印线是否显示
    editor.setReadOnly(false);//设置是否只读
    ace.require("ace/ext/language_tools");
    editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
        fontSize: "16px"
    });

    //初始化绘制区
    DrawSpace.init("draw","toolbox","side-bar");
    DrawSpace.addChangeListener(function (event) {
        if(autoCode){
            toCode();
        }
    });

    //初始化列表
    FilesTree.init("directory-tree");

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

    //打开资源
    var source=getURLParameter("source");
    if(source!=null&&source.length>0){
        openSource(source);
    }else {
        newFile();
    }
    inited = true;
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
    editor.setValue(normalCode);
}

function openFile(type,name,code) {
    FilesTree.updateFileName(name);
    savedCode = code;
    editor.setValue(code);
    toBlock();
}

function askOnLeave(e){
    var e = window.event||e;
    e.returnValue=("请确保您的代码可能未保存。是否确定离开？");
}

function showConsole() {
    changeViewState("console-space",true);
    changeShowBtnState(document.getElementById("show-console"),true);
    DrawSpace.freshSize();
}

function toCode() {
    var code = DrawSpace.spaceToCode();
    var xml = DrawSpace.spaceToXml(unfoldXml);
    editor.setValue(code+"\n\n\n\n//------ 图形块结构记录 请勿随意修改 ------\n/*"+xml+"*/\n");
}

function toBlock() {
    var xml = CodeUtils.getXml(getCode());
    return DrawSpace.xmlToSpace(xml);
}

function getCode() {
    return editor.getSession().getValue()
}

function save() {
    savedCode = getCode()+"";
    exportRaw(FilesTree.fileNode.name,savedCode)
}

function askForSave(){
    if(inited&&getCode()!=savedCode){
        if(confirm("代码还未保存，是否保存？")){
            save();
            return true;
        }
        return false;
    }
    return false;
}

function changeShowMode(id,btn) {
    var v = document.getElementById(id);
    if(v.style.display==="none"){
        v.style.display = "inline-block";
        changeShowBtnState(btn,true)
    }else {
        v.style.display = "none";
        changeShowBtnState(btn,false)
    }
}

function changeShowBtnState(btn,flag) {
    if(typeof btn === "string"){
        btn = document.getElementById(btn);
    }
    if(flag){
        btn.style.background = "#444";
        btn.style.color = "#fff";
    }else {
        btn.style.background = "transparent";
        btn.style.color = "#222";
    }
}

function changeViewState(id,flag) {
    if(flag){
        document.getElementById(id).style.display = "inline-block";
    }else {
        document.getElementById(id).style.display = "none";
    }
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
