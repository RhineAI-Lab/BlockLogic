
const DrawSpace = {};

//列表结构数据定义
const blockMenu = [
    {name:"基础-JavaScript",children:["常用语句","循环","变量","函数","逻辑","数学","文本","列表","自定义块"]},
    {name:"界面控制",children:["界面","界面事件","文本控件","按钮控件","输入框控件","复选框控件","相机控件","图片控件","单选框控件","进度条控件","拖动条控件","下拉菜单控件","滑动布局","卡片","列表布局","抽拖布局"]},
    {name:"一般功能",children:["常用功能","全局","应用","设备","电源管理","设置"]},
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
const allBlockList = ["常用语句","循环","变量","函数","逻辑","数学","文本","列表","颜色","基于坐标操作","基于控件操作",
    "无障碍服务","触摸模拟对象","快捷控件操作","自定义块","设备","控制台","HTTP","对话框","全局","本地储存",
    "文件系统","多媒体","应用","调试工具","意图","插件","设置","电源管理","界面","常用功能"];
const allBlockColor = ["#AAAAAA","#5AA45A","#A45A7F","#985AA4","#5A7FA4","#5A66A4","#5AA48B","#735AA4","#A4735A",
    "#5A66A4","#2195F1","#e5af00","#e6645c","#90b01f","#888888","#3264e1","#0eaf9e","#339999","#9abc86","#7476c6","#cb863a",
    "#b9993d","#d4285c","#d56331","#cc9999","#8e30be","#e5af00","#c68a16","#52a242","#3c2eaf","#AAAAAA"];

//常用
DrawSpace.workspace = null;
DrawSpace.toolbox = null;
DrawSpace.sidebar = null;

DrawSpace.flyoutId = 0;
DrawSpace.flyoutLast = null;

//配置常量
DrawSpace.normalColor = "#394C5A";
DrawSpace.choosedColor = "#42B983";

DrawSpace.init = function (blocklyId,toolboxId,sidebarId) {
    DrawSpace.workspace = Blockly.inject(blocklyId,{
        toolbox: document.getElementById(toolboxId),
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
    DrawSpace.toolbox = DrawSpace.workspace.getToolbox();
    document.getElementsByClassName("blocklyToolboxDiv blocklyNonSelectable")[0].style.width = 0;
    DrawSpace.toolbox.selectItemByPosition(0);

    //初始化侧栏
    DrawSpace.sidebar = new Vue({
        el:'#'+sidebarId,
        data:{
            list:[],
        },
        methods:{
            showChildren:function(v){
                if(v.isShow){
                    changeTitleStatus(v,false);
                } else {
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
                    if(DrawSpace.flyoutId===i){
                        DrawSpace.workspace.getFlyout().hide();
                        DrawSpace.flyoutId = -1;
                        DrawSpace.flyoutLast = null;
                        v.color = "#324a5b";
                        v.bg = "#ffffff";
                    }else {
                        DrawSpace.toolbox.selectItemByPosition(i);
                        DrawSpace.toolbox.selectItemByPosition(i);
                        if(DrawSpace.flyoutLast!=null){
                            DrawSpace.flyoutLast.color = "#324a5b";
                            DrawSpace.flyoutLast.bg = "#ffffff";
                        }
                        v.color = "#000000";
                        v.bg = colourBlend(v.icon,"#ffffff",0.6);
                        DrawSpace.flyoutId = i;
                        DrawSpace.flyoutLast = v;
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
        sidebarList.push({name:item.name,isShow:false,color:DrawSpace.normalColor,right:"0px",sub:childList})
    }
    changeTitleStatus(sidebarList[0],true);
    DrawSpace.sidebar.list = sidebarList;

    //事件监听
    DrawSpace.workspace.addChangeListener(function(event) {
        if(event.type == Blockly.Events.VAR_CREATE || event.type == Blockly.Events.VAR_DELETE || event.type == Blockly.Events.VAR_RENAME){
            if(DrawSpace.flyoutId==2){
                DrawSpace.workspace.getFlyout().hide();
                DrawSpace.toolbox.selectItemByPosition(2);
                DrawSpace.toolbox.selectItemByPosition(2);
            }
        }else if(event.type == Blockly.Events.BLOCK_CREATE){
            if(autoClose){
                DrawSpace.workspace.getFlyout().hide();
                DrawSpace.flyoutId = -1;
                if(DrawSpace.flyoutLast!=null){
                    DrawSpace.flyoutLast.color = "#324a5b";
                    DrawSpace.flyoutLast.bg = "#ffffff";
                }
                DrawSpace.flyoutLast = null;
            }
        }
    });
};

DrawSpace.addChangeListener = function(callback){
    DrawSpace.workspace.addChangeListener(callback);
};

DrawSpace.freshSize = function (){
    Blockly.svgResize(DrawSpace.workspace);
};

DrawSpace.spaceToCode = function () {
    return Blockly.JavaScript.workspaceToCode(DrawSpace.workspace);
};

DrawSpace.spaceToXml = function (unfold) {
    var xml = Blockly.Xml.workspaceToDom(DrawSpace.workspace,true);
    if(unfold){
        xml = "\n"+Blockly.Xml.domToPrettyText(xml)+"\n";
    }else {
        xml = Blockly.Xml.domToText(xml)
    }
    return xml;
};

DrawSpace.xmlToSpace = function (xml) {
    DrawSpace.workspace.clear();
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
};

function changeTitleStatus(item,choose) {
    if(choose){
        item.isShow=true;
        item.color=DrawSpace.choosedColor;
        item.right="4px solid "+DrawSpace.choosedColor;
    }else {
        item.isShow=false;
        item.color=DrawSpace.normalColor;
        item.right="0px";
    }
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

