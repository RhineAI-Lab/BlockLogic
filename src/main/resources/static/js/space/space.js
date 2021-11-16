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
var editorMode = 0;

const iconsMap = {
    "normal":"integral",
    "frame":"viewgallery",
    "horizontal":"column-horizontal",
    "vertical":"column-vertical",
    "SurfaceView":"video",
    "input":"editor",
    "img":"pic",
    "text":"text",
    "form":"form",
    "grid":"form",
    "list":"nav-list",
    "checkbox":"confirm",
    "switch":"switch",
    "progressbar":"progress",
    "seekbar":"progress",
    "map":"map",
};

var Vue = null;

var targetPoint = null;
var target = null;
var targetIndex = 0;

const leftTip = document.getElementById("left-tip");
const rightTip = document.getElementById("right-tip");

var tappedNode = null;
const tempView = document.getElementById("temp");


require.config({
    baseUrl:'',
    waitSeconds: 1000,
    paths : {
        "ace" : "modules/ace/ace",
        "vue" : "js/plugins/vue.min",
        "esprima" : "js/plugins/esprima.min",
        "ztree" : "js/plugins/jquery.ztree.all.min"
    }
});

window.onload=function(){
    //初始化代码编辑器
    require(["ace"],function () {
        AceUtils.createEditor("editor");
    });

    //初始化解析器
    require(["esprima"],function (esprima) {
        CodeUtils.init(esprima)
    });

    //初始化列表
    require(["ztree"],function () {
        FilesTree.init("directory-tree");
    });

    //初始化抽屉管理
    const doAfter = function(){
        if(DrawSpace.workspace!=null)DrawSpace.freshSize()
    };
    const allowOpenUi = function(){
        if(editorMode===1){
            return true
        }else {
            alert("请先切换至设计模式");
            return false
        }
    };
    const allowOpenLogic = function(){
        if(editorMode===0){
            return true
        }else {
            alert("请先切换至逻辑模式");
            return false
        }
    };
    ViewUtils.bindBorder("editor-space","main-split-line","right",doAfter);
    DC.init("dc",doAfter);
    DC.addDrawer("属性","nav-list",DC.DRAWER_MODE_RIGHT,"attr-space",allowOpenUi,300,240);
    DC.addDrawer("控制台","leftalignment",DC.DRAWER_MODE_RIGHT,"console-space",null,400,200);
    DC.addDrawer("项目","integral",DC.DRAWER_MODE_LEFT,"directory-space",allowOpenLogic,200,150);
    DC.addDrawer("新增","add",DC.DRAWER_MODE_LEFT,"new-space",allowOpenUi,300,200);
    DC.addDrawer("控件树","viewlist",DC.DRAWER_MODE_LEFT,"tree-space",allowOpenUi,300,200);
    DC.addDrawer("结构图","viewgallery",DC.DRAWER_MODE_LEFT,"structure-space",allowOpenUi,300,200);
    DC.closeDrawer("属性");
    DC.closeDrawer("新增");
    DC.closeDrawer("项目");
    DC.closeDrawer("控件树");
    DC.closeDrawer("结构图");


    //初始化工具栏
    require(["vue"],function (VueIn) {
        Vue = VueIn;

        //注册xml选择框下拉菜单组件
        Vue.component("custom-select",{
            data:function(){
                return {
                    selectShow:false,
                    val:"",
                    choosed:null,
                }
            },
            props:["mainBtn","list"],
            template:`
            <div class="select-box">
                <div class="select-input">
                    <input type="text" spellcheck="false" id="select-target" class="tool-input" :value="val" @click="freshList();selectShow=!selectShow" placeholder="选择UI编辑目标"/>
                    <button class="tool-btn btn-2 btn--2" @click="freshList()" title="切换编辑目标。">刷新</button>
                    <span></span>
                </div>
                <custom-list class="select-show" v-show="selectShow" :list="list" v-on:value1="selectValueHandle"></custom-list>
            </div>
        `,
            methods:{
                selectValueHandle: function(item){
                    this.selectShow = false;
                    this.chooseItem(item);
                },
                freshList: function () {
                    freshXmlList();
                },
                chooseItem: function (item) {
                    changeTarget(item);
                    this.choosed = item;
                    this.val = item.tip+" [line:"+item.line[0]+"~"+item.line[1]+"]";
                }
            }
        });
        Vue.component("custom-list",{
            props:["list"],
            template:`
                <ul class="select-list">
                    <li class="select-item" v-for="item in list" @click="searchValueHandle(item)">{{item.tip+" [line:"+item.line[0]+"~"+item.line[1]+"]"}}</li>
                </ul>
            `,
            methods:{
                searchValueHandle(item){
                    this.$emit("value1",item)
                }
            }
        });

        //注册属性下拉菜单组件
        Vue.component('dropdown', {
            template: '#dropdown',
            props: ["options","value","type"],
            data: function () {
                return {
                    selected: {},
                    optionsShown: false,
                    maxItem: 200, //the max number of option that shown on the list
                    input_value: '',
                }
            },
            created: function () {
                this.input_value = this.value;
                if(this.options.length===0){
                    this.optionsArray = [];
                }else {
                    this.optionsArray = this.options.split("|");
                }
            },
            computed: {
                filteredOptions:function() {
                    const filtered = [];
                    if(this.optionsArray.length===1&&this.optionsArray[0]==="null"){
                        return filtered;
                    }
                    let searchStr = this.input_value.replace('\*','\\*').replace('\\','\\\\');
                    const regOption = new RegExp(searchStr, 'ig');
                    for(var ii = 0; ii < this.optionsArray.length; ii++){
                        if (this.input_value.length < 1 || this.optionsArray[ii].match(regOption)) {
                            if (filtered.length < this.maxItem)
                                filtered.push(this.optionsArray[ii]);
                        }
                    }
                    if(filtered.length===0){
                        this.optionsShown=false;
                    }else if(this.onFocus){
                        this.optionsShown=true;
                    }
                    return filtered;
                },
            },
            methods: {
                inputRule:function(type){
                    var value;
                    switch(type){
                        case 'all':
                            value = this.input_value;
                            break;
                        case 'text':
                            value = this.input_value.replace(/[^a-zA-Z0-9]/g,'');
                            break;
                        case 'number':
                            value = this.input_value.replace(/^(?![+-]?\d+(\.\d+)?$)/g,'');
                            break;
                        case 'percentage':
                            value = this.input_value.replace(/[^\d]/g,'');
                            value = value > 100 ? '100' : value;
                            value = value < 0 ? '0' : value;
                            break;
                        default:
                            console.log("no limitation");
                    }
                    return value;
                },
                selectOption: function (option) {
                    this.selected = option;
                    this.optionsShown = false;
                    this.input_value = this.selected;
                },
                showOptions: function () {
                    this.optionsShown = true;
                    this.onFocus = true;
                },
                exit: function () {
                    this.optionsShown = false;
                    this.onFocus = false;
                },
                // Selecting when pressing Enter
                keyMonitor: function (event) {
                    if (event.key === "Enter") {
                        if (this.filteredOptions[0])
                            this.selectOption(this.filteredOptions[0]);
                        else
                            this.selectOption(this.input_value);
                    }
                },
            },
            watch: {
                value:function() {
                    this.input_value = this.value;
                },
                input_value:function() {
                    if (this.filteredOptions.length === 0)
                        this.selected = this.input_value;
                    else
                        this.selected = this.filteredOptions[0];
                    this.$emit('on_change_input_value', this.input_value);
                },
                optionsShown:function () {
                    if(this.optionsShown&&this.filteredOptions.length===0){
                        this.optionsShown = false;
                    }
                }
            }
        });

        //初始化侧栏
        DrawSpace.initSidebar("side-bar");
        DrawSpace.init("draw","toolbox");

        //初始化工具栏
        toolbar = new Vue({
            el: '#toolbar',
            data: {
                ip: '',
                path: '',
                list:[],
                val:'',
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
            }
        });
        ViewUtils.changeShowBtnState("use-auto-code",true);

        //监听自动同步代码
        DrawSpace.addChangeListener(function (event) {
            if(autoCode){
                toCode();
            }
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
    });

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

    //初始化区
    FollowUtils.init(document);
    initAdd();

    //监听全局按键
    window.addEventListener('keydown', function(e){
        if(navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey){//ctrl
            if (e.keyCode === 83){//s
                e.preventDefault();

            }else if(e.keyCode === 90 && e.shiftKey){//shift z
                e.preventDefault();
                AceUtils.redo();
            }else if(e.keyCode === 90 && !e.shiftKey){//z
                e.preventDefault();
                AceUtils.undo();
            }
        }
    });
    window.onmouseup = function (event) {
        if(tappedNode){
            FollowUtils.show(false);
            tappedNode.downX = null;
            tappedNode.downY = null;
            tappedNode = null;
        }
    };
    window.onmousemove = function (event) {
        if(tappedNode){
            if(getNodeEventDis(tappedNode,event)>9) {
                FollowUtils.setNode(tappedNode);
                FollowUtils.show(true);
                FollowUtils.setPosition(event.clientX+10,event.clientY+10);
            }
        }
    };

    //初次解析
    require(["esprima","ace","vue","ztree"],function () {
        inited = true;
        leftTip.innerText = "编辑器初始化完成";

        //打开资源
        var source=getURLParameter("source");
        if(source!=null&&source.length>0){
            openSource(source);
        }else {
            newFile();
        }
        //解析UI
        freshXmlList();

        rightTip.innerText = "项目打开完成"
    });

};

function onShowModeChange(i) {
    let mainSplitLine = document.getElementById("main-split-line");
    let editorSpace = document.getElementById("editor-space");
    let drawSpace = document.getElementById("draw-space");
    if(i===0){
        mainSplitLine.style.display = "inline-block";
        editorSpace.style.display = "inline-block";
        drawSpace.style.display = "inline-block";
        editorSpace.style.flexGrow = "0";
        DrawSpace.freshSizePlus();
    }else if(i===1){
        mainSplitLine.style.display = "none";
        drawSpace.style.display = "inline-block";
        editorSpace.style.display = "none";
        editorSpace.style.flexGrow = "0";
        DrawSpace.freshSizePlus();
    }else if(i===2){
        mainSplitLine.style.display = "none";
        editorSpace.style.display = "inline-block";
        drawSpace.style.display = "none";
        editorSpace.style.flexGrow = "1";
    }
    if(DrawSpace.workspace!=null)DrawSpace.freshSize()
}

function onEditorModeChange(i) {
    if(i===1){
        freshXmlList();
        if(toolbar.list.length==0){
            document.getElementById("editor-mode-selector").selectedIndex = 0;
            alert("程序中有布局时才可切换至布局设计模式");
            return;
        }
    }
    editorMode = i;
    if(i===0){
        document.getElementById("logic-btns-box").style.display = "inline-block";
        document.getElementById("ui-target-selector").style.display = "none";
        DC.closeDrawer("属性");
        DC.closeDrawer("新增");
        DC.closeDrawer("控件树");
        DC.closeDrawer("结构图");
    }else {
        document.getElementById("logic-btns-box").style.display = "none";
        document.getElementById("ui-target-selector").style.display = "inline-block";
        DC.closeDrawer("项目");
    }
}

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
    DC.openDrawer("控制台");
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

