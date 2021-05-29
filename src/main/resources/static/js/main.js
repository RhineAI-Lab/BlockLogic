Vue.config.ignoredElements.push('xml');
Vue.config.ignoredElements.push('block');
Vue.config.ignoredElements.push('field');
Vue.config.ignoredElements.push('category');
Vue.config.ignoredElements.push('sep');
Vue.config.ignoredElements.push('value');
Vue.config.ignoredElements.push('statement');
Vue.config.ignoredElements.push('mutation');

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
}

//列表结构数据定义
var blockMenu = [
    {name:"基础-JavaScript",children:["常用","循环","变量","函数","逻辑","数学","文本","列表","颜色","自定义块"]},
    {name:"界面控制",children:["通用","事件","文本控件","按钮控件","输入框控件","复选框控件","相机控件","图片控件","单选框控件","进度条控件","拖动条控件","下拉菜单控件","滑动布局","卡片","列表布局","抽拖布局"]},
    {name:"一般功能",children:["常用功能","应用","设置","设备"]},
    {name:"运行交互",children:["控制台","对话框","调试工具"]},
    {name:"通用功能",children:["文件系统","文件对象读写","多媒体","传感器","悬浮窗","本地储存","压缩解压"]},
    {name:"信息处理",children:["加密解密","Base64","MD5"]},
    {name:"图色处理",children:["找图找色","图像编辑","画板绘制"]},
    {name:"人工智能",children:["Pytorch对接","OCR图像文字识别"]},
    {name:"项目",children:["插件","模块","脚本引擎"]},
    {name:"运行结构",children:["多线程","定时器"]},
    {name:"网络/通信",children:["HTTP","蓝牙","红外"]},
    {name:"脚本操作",children:["无障碍服务","基于坐标操作","触摸模拟对象","基于控件操作","快捷控件操作","Shell语句","意图","应用"]},
];
var allBlockList = ["常用","循环","变量","函数","逻辑","数学","文本","列表","颜色","基于坐标操作","基于控件操作",
    "无障碍服务","触摸模拟对象","快捷控件操作","自定义块","设备","控制台","HTTP","对话框","常用功能","本地储存",
    "文件系统","多媒体"];
var allBlockColor = ["#AAAAAA","#5AA45A","#A45A7F","#985AA4","#5A7FA4","#5A66A4","#5AA48B","#735AA4","#A4735A",
    "#5A66A4","#2195F1","#e5af00","#e6645c","#90b01f","#888888","#3264e1","#0eaf9e","#339999","#9abc86","#7476c6","#cb863a",
    "#b9993d","#d4285c"];

//全局参数
var normalColor = "#394C5A";
var choosedColor = "#42B983";

var workspace = null;
var toolbox = null;

var editor = null;
var webConsole;
var flyoutNow = 0;
var flyoutLast = null;

window.onload=function(){
    //初始化代码编辑器
    editor = ace.edit("editor");//设置编辑器样式，对应theme-*.js文件
    editor.setTheme("ace/theme/solarized_light");
    editor.session.setMode("ace/mode/javascript");//设置代码语言，对应mode-*.js文件
    editor.setShowPrintMargin(false);//设置打印线是否显示
    editor.setReadOnly(false);//设置是否只读
    ace.require("ace/ext/language_tools");
    editor.setOptions({
        fontSize: "16px"
    });

    //初始化工具栏
    var toolbar = new Vue({
        el: '#toolbar',
        data: {
            ip: '',
            path: '',
        },
        methods:{
            toCode:function () {
                editor.setValue(Blockly.JavaScript.workspaceToCode(workspace));
            },
            runCode:function () {
                console.verbose("开始运行[Code on web page]");
                eval(editor.getSession().getValue());
                console.verbose("运行结束[Code on web page]");
            },
            connect:function(){
            },
            show:function (v) {
                var id = v.target.id;
                if(id==="show-console"){
                    changeShowMode("console-space",v.target);
                    Blockly.svgResize(workspace)
                }else if(id==="show-editor"){
                    changeShowMode("editor-space",v.target);
                    Blockly.svgResize(workspace)
                }else if(id==="show-draw"){
                    changeShowMode("draw-space",v.target);
                    changeShowMode("side-bar",v.target);
                }
            }
        }
    });
    changeShowBtnState(document.getElementById("show-draw"),true);
    changeShowBtnState(document.getElementById("show-editor"),true);
    changeShowBtnState(document.getElementById("show-console"),false);
    document.getElementById("side-bar").style.display = "block";
    document.getElementById("editor-space").style.display = "block";
    document.getElementById("draw-space").style.display = "block";
    document.getElementById("console-space").style.display = "none";

    //初始化侧栏
    var sidebar = new Vue({
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
                i = allBlockList.indexOf(v.name);
                if(i>=0){
                    if(flyoutNow===i){
                        workspace.getFlyout().hide();
                        flyoutNow = -1;
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
                        v.bg = v.icon;
                        flyoutNow = i;
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
        var code = Blockly.JavaScript.workspaceToCode(workspace);
        editor.setValue(code);

        if(event.type == Blockly.Events.VAR_CREATE || event.type == Blockly.Events.VAR_DELETE || event.type == Blockly.Events.VAR_RENAME){
            if(flyoutNow==2){
                workspace.getFlyout().hide();
                toolbox.selectItemByPosition(2);
                toolbox.selectItemByPosition(2);
            }
        }
    });
    toolbox = workspace.getToolbox();

    document.getElementsByClassName("blocklyToolboxDiv blocklyNonSelectable")[0].style.width = 0;
    toolbox.selectItemByPosition(0);

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
    console.verbose("控制台初始化完成");
};

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


