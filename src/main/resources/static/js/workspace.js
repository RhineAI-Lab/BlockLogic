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

//配置vue与blockly兼容
Vue.config.ignoredElements.push('xml');
Vue.config.ignoredElements.push('block');
Vue.config.ignoredElements.push('field');
Vue.config.ignoredElements.push('category');
Vue.config.ignoredElements.push('sep');
Vue.config.ignoredElements.push('value');
Vue.config.ignoredElements.push('statement');
Vue.config.ignoredElements.push('mutation');

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

//列表结构数据定义
const blockMenu = [
    {name:"基础-JavaScript",children:["常用","循环","变量","函数","逻辑","数学","文本","列表","自定义块"]},
    {name:"界面控制",children:["通用","事件","文本控件","按钮控件","输入框控件","复选框控件","相机控件","图片控件","单选框控件","进度条控件","拖动条控件","下拉菜单控件","滑动布局","卡片","列表布局","抽拖布局"]},
    {name:"一般功能",children:["常用功能","应用","设置","设备","电源管理"]},
    {name:"运行交互",children:["控制台","对话框","调试工具"]},
    {name:"通用功能",children:["文件系统","文件对象读写","多媒体","传感器","悬浮窗","本地储存","压缩解压"]},
    {name:"信息处理",children:["加密解密","Base64","MD5"]},
    {name:"图色处理",children:["颜色","找图找色","图像编辑","画板绘制"]},
    {name:"人工智能",children:["Pytorch移动迁移","OCR图像文字识别"]},
    {name:"项目",children:["插件","模块","脚本引擎"]},
    {name:"运行结构",children:["多线程","定时器"]},
    {name:"网络/通信",children:["HTTP","蓝牙","红外"]},
    {name:"脚本操作",children:["无障碍服务","基于坐标操作","触摸模拟对象","基于控件操作","快捷控件操作","Shell语句","意图","应用"]},
];
const allBlockList = ["常用","循环","变量","函数","逻辑","数学","文本","列表","颜色","基于坐标操作","基于控件操作",
    "无障碍服务","触摸模拟对象","快捷控件操作","自定义块","设备","控制台","HTTP","对话框","常用功能","本地储存",
    "文件系统","多媒体","应用","调试工具","意图","插件","设置","电源管理"];
const allBlockColor = ["#AAAAAA","#5AA45A","#A45A7F","#985AA4","#5A7FA4","#5A66A4","#5AA48B","#735AA4","#A4735A",
    "#5A66A4","#2195F1","#e5af00","#e6645c","#90b01f","#888888","#3264e1","#0eaf9e","#339999","#9abc86","#7476c6","#cb863a",
    "#b9993d","#d4285c","#d56331","#cc9999","#8e30be","#c68a16","#52a242"];

//选项常量
const MODE_SINGLE_FILE = 0;
const MODE_NORMAL_PRODUCT = 1;
const MODE_HARMONY_PRODUCT = 2;

const FILE_TYPE_AUTO = 0;
const FILE_TYPE_UI = 0;
const FILE_TYPE_PRODUCT = 0;
const FILE_TYPE_HARMONY = 0;

//配置常量
const normalColor = "#394C5A";
const choosedColor = "#42B983";

const normalLogTag = "WebLog";

//全局参数
var projectMode = MODE_SINGLE_FILE;
var fileType = FILE_TYPE_AUTO;
var fileNode = null;
var savedCode = "\n\n\n\n//------ 图形块结构记录 请勿随意修改 ------\n/*<xml xmlns=\"https://BLogic.AutoJs.org/xml\"></xml>*/";

var workspace = null;
var toolbox = null;
var sidebar = null;
var inited = false;

var editor = null;
var webConsole = null;
var projectNode = null;
var tree = null;
var flyoutId = 0;
var flyoutLast = null;

var autoClose = true;
var autoCode = true;
var unfoldXml = false;

window.onload=function(){

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
                changeShowBtnState(v,unfoldXml)
            },
            toCode:function () {
                toCode();
            },
            saveCode:function () {
                save();
            },
            runCode:function () {
                showConsole();
                eval(getCode());
            },
            toBlock:function(){
                if (!toBlock()){
                    alert("反向生成功能开发中...敬请期待。")
                }
            },
            connect:function(){
                var ip = document.getElementById("input-ip").value;
                if(checkIP(ip)){
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
                var name = fileNode.name;
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
                    Blockly.svgResize(workspace)
                }else if(id==="show-editor"){
                    changeShowMode("editor-space",target);
                    Blockly.svgResize(workspace)
                }else if(id==="show-directory"){
                    changeShowMode("directory-space",target);
                    Blockly.svgResize(workspace)
                }else if(id==="show-draw"){
                    changeShowMode("draw-space",target);
                    changeShowMode("side-bar",target);
                }
            }
        }
    });
    changeShowBtnState(document.getElementById("use-auto-code"),true);
    changeShowBtnState(document.getElementById("show-directory"),false);
    changeShowBtnState(document.getElementById("show-draw"),true);
    changeShowBtnState(document.getElementById("show-editor"),true);
    changeShowBtnState(document.getElementById("show-console"),false);
    document.getElementById("directory-space").style.display = "none";
    document.getElementById("side-bar").style.display = "block";
    document.getElementById("editor-space").style.display = "block";
    document.getElementById("draw-space").style.display = "block";
    document.getElementById("console-space").style.display = "none";
    var loadCallback = function(code){
        savedCode = code;
        editor.setValue(code);
        toBlock();
    };
    document.getElementById("upload").addEventListener("change",function (e) {
        var files = e.target.files;
        if(files.length>0){
            askForSave();

            var file = files[0];
            fileNode.name = file.name;
            tree.updateNode(fileNode);

            let reader = new FileReader();
            reader.readAsText(file, 'UTF-8');
            reader.onload = function (e) {
                let fileContent = e.target.result;
                if (loadCallback && (typeof loadCallback === 'function')) {
                    loadCallback(fileContent)
                }
            }
        }
        event.target.value="";
    });

    //初始化侧栏
    sidebar = new Vue({
        el:'#side-bar',
        data:{
            list:[]
        },
        methods:{
            showChildren:function(v){
                if(v.isShow){
                    changeTitleStatus(v,false);
                }else {
                    this.list.forEach(function(item){
                        changeTitleStatus(item,false);
                    });
                    changeTitleStatus(v,true);
                }
            },
            showBlocks:function (v) {
                if(!inited){
                    return
                }
                i = allBlockList.indexOf(v.name);
                if(i>=0){
                    if(flyoutId===i){
                        workspace.getFlyout().hide();
                        flyoutId = -1;
                        flyoutLast = null;
                        v.color = "#324a5b";
                        v.bg = "#ffffff";
                    }else {
                        toolbox.selectItemByPosition(i);
                        toolbox.selectItemByPosition(i);
                        if(flyoutLast!=null){
                            flyoutLast.color = "#324a5b";
                            flyoutLast.bg = "#ffffff";
                        }
                        v.color = "#000000";
                        v.bg = colourBlend(v.icon,"#ffffff",0.6);
                        flyoutId = i;
                        flyoutLast = v;
                    }
                }
            }
        }
    });
    var sidebarList = [];
    for(var j in blockMenu){
        var item = blockMenu[j];
        var childList = [];
        for(var i in item.children){
            var name = item.children[i];
            var color = "#AAAAAA";
            var xi = allBlockList.indexOf(name);
            if(xi>=0){
                color = allBlockColor[xi];
            }else {
                name += " [开发中]"
            }
            childList.push({name:name,icon:color,bg:"#ffffff"})
        }
        sidebarList.push({name:item.name,isShow:false,color:normalColor,right:"0px",sub:childList})
    }
    changeTitleStatus(sidebarList[0],true);
    sidebar.list = sidebarList;

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
    workspace = Blockly.inject('draw',{
        toolbox: document.getElementById('toolbox'),
        grid: {
            spacing: 20,
            length: 6,
            colour: '#ddd',
            snap: true
        },
        zoom:{
            controls: true,
            wheel: true,
            startScale: 1.0,
            maxScale: 2,
            minScale: 0.5,
            scaleSpeed: 1.2
        }
    },);
    workspace.addChangeListener(function(event) {
        if(autoCode){
            toCode();
        }
        if(event.type == Blockly.Events.VAR_CREATE || event.type == Blockly.Events.VAR_DELETE || event.type == Blockly.Events.VAR_RENAME){
            if(flyoutId==2){
                workspace.getFlyout().hide();
                toolbox.selectItemByPosition(2);
                toolbox.selectItemByPosition(2);
            }
        }else if(event.type == Blockly.Events.BLOCK_CREATE){
            if(autoClose){
                workspace.getFlyout().hide();
                flyoutId = -1;
                if(flyoutLast!=null){
                    flyoutLast.color = "#324a5b";
                    flyoutLast.bg = "#ffffff";
                }
                flyoutLast = null;
            }
        }
    });
    toolbox = workspace.getToolbox();

    document.getElementsByClassName("blocklyToolboxDiv blocklyNonSelectable")[0].style.width = 0;
    toolbox.selectItemByPosition(0);
    inited = true;

    //加载树状目录
    var treeSetting={
        check: {
            enable: false,
            chkStyle: "checkbox"
        },
        edit: {
            enable: true,
            editNameSelectAll:true,
            removeTitle:'删除',
            renameTitle:'重命名'
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        callback:{
            beforeRemove:function(e,treeId,treeNode){
                alert("单文件项目不可删除");
                return false;
            },
            beforeRename:function(treeId,treeNode,newName,isCancel){
                return true;
            },
            beforeEditName: function(treeId,treeNode){
                if(treeNode===projectNode){
                    alert("根目录名称不可修改");
                    return false;
                }
                return true;
            },
            beforeDrag:function beforeDrag(treeId,treeNodes){
                return false;
            },
            onClick:function clickNode(e,treeId,treeNode){
            },
            onDblClick:function(event, treeId, treeNode) {
            },
            onRemove:function(e,treeId,treeNode){
            },
            onRename:function(e,treeId,treeNode,isCancel){
            },
            onDrag:function(event, treeId, treeNodes, targetNode, moveType) {
            }
        }
    };
    var initNodes=[
        {"name":"单文件项目","open":true,children:[]}
    ];
    tree = $.fn.zTree.init($("#directory-tree"), treeSetting, initNodes);
    projectNode = tree.getNodes()[0];
    fileNode = tree.addNodes(projectNode,{name:"Untitled.js"})[0];
    console.log(fileNode);

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
        time = time || new Date().Format("MM-dd hh:mm:ss.S");
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
    }
};

function askOnLeave(e){
    var e = window.event||e;
    e.returnValue=("请确保您的代码已经保存。是否确定离开？");
}

function showConsole() {
    document.getElementById("console-space").style.display = "block";
    changeShowBtnState(document.getElementById("show-console"),true);
    Blockly.svgResize(workspace);
}

function toCode() {
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    var xml = Blockly.Xml.workspaceToDom(workspace,true);
    if(unfoldXml){
        xml = "\n"+Blockly.Xml.domToPrettyText(xml)+"\n";
    }else {
        xml = Blockly.Xml.domToText(xml)
    }
    editor.setValue(code+"\n\n\n\n//------ 图形块结构记录 请勿随意修改 ------\n/*"+xml+"*/");
}

function toBlock() {
    workspace.clear();
    var xml = getXml(getCode());
    if(xml==null){
        return false;
    }else {
        try{
            var xmlDom = Blockly.Xml.textToDom(xml);
            Blockly.Xml.domToWorkspace(xmlDom, workspace);
            return true;
        }catch (e) {
            alert("抱歉，图形块解析失败。");
            return true;
        }
    }
}

function getXml(code) {
    var startStr = "//------ 图形块结构记录 请勿随意修改 ------\n/*";
    var i = code.indexOf(startStr);
    if(i==-1){
        return null
    }else {
        i += startStr.length;
        var length = code.substring(i).indexOf("*/");
        return code.substring(i,i+length)
    }
}

function getCode() {
    return editor.getSession().getValue()
}

function save() {
    savedCode = getCode()+"";
    exportRaw(fileNode.name,savedCode)
}

function askForSave(){
    if(getCode()!=savedCode){
        if(confirm("代码还未保存，是否保存？")){
            save();
            return true;
        }
    }
    return false;
}

function changeShowMode(id,btn) {
    var v = document.getElementById(id);
    //console.log(v.style.display);
    if(v.style.display==="none"){
        v.style.display = "block";
        changeShowBtnState(btn,true)
    }else {
        v.style.display = "none";
        changeShowBtnState(btn,false)
    }
}

function changeShowBtnState(btn,flag) {
    if(flag){
        btn.style.background = "#444";
        btn.style.color = "#fff";
    }else {
        btn.style.background = "transparent";
        btn.style.color = "#222";
    }
}

function changeTitleStatus(item,choose) {
    if(choose){
        item.isShow=true;
        item.color=choosedColor;
        item.right="4px solid "+choosedColor;
    }else {
        item.isShow=false;
        item.color=normalColor;
        item.right="0px";
    }
}

function checkIP(value){
    var exp=/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    var reg = value.match(exp);
    return reg!=null
}

function colourBlend(c1, c2, ratio) {
    ratio = Math.max(Math.min(Number(ratio), 1), 0);
    var r1 = parseInt(c1.substring(1, 3), 16);
    var g1 = parseInt(c1.substring(3, 5), 16);
    var b1 = parseInt(c1.substring(5, 7), 16);
    var r2 = parseInt(c2.substring(1, 3), 16);
    var g2 = parseInt(c2.substring(3, 5), 16);
    var b2 = parseInt(c2.substring(5, 7), 16);
    var r = Math.round(r1 * (1 - ratio) + r2 * ratio);
    var g = Math.round(g1 * (1 - ratio) + g2 * ratio);
    var b = Math.round(b1 * (1 - ratio) + b2 * ratio);
    r = ('0' + (r || 0).toString(16)).slice(-2);
    g = ('0' + (g || 0).toString(16)).slice(-2);
    b = ('0' + (b || 0).toString(16)).slice(-2);
    return '#' + r + g + b;
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
