var editor = ace.edit("editor");//设置编辑器样式，对应theme-*.js文件
editor.setTheme("ace/theme/solarized_light");
editor.session.setMode("ace/mode/javascript");//设置代码语言，对应mode-*.js文件
editor.setShowPrintMargin(false);//设置打印线是否显示
editor.setReadOnly(false);//设置是否只读
ace.require("ace/ext/language_tools");
editor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true
});

//拖动控制
var currentX = 0;
var currentY = 0;
var currentMatrix = 0;
var selectedElement = 0;
function selectElement(evt) {
    selectedElement = evt.target.parentNode;
    currentX = evt.clientX;
    currentY = evt.clientY;
    currentMatrix = selectedElement.getAttributeNS(null, "transform").slice(10,-1).split(',');
    currentMatrix[0] = parseFloat(currentMatrix[0]);
    currentMatrix[1] = parseFloat(currentMatrix[1]);
    for(var i=0; i<currentMatrix.length; i++) {
        currentMatrix[i] = parseFloat(currentMatrix[i]);
    }
    selectedElement.setAttributeNS(null, "onmouseup", "deselectElement(evt)");
}

document.onmousemove=function(evt) {
    if(selectedElement===0){
        return
    }
    var dx = evt.clientX - currentX;
    var dy = evt.clientY - currentY;
    currentMatrix[0] += dx;
    currentMatrix[1] += dy;

    selectedElement.setAttributeNS(null, "transform", "translate(" + currentMatrix.join(',') + ")");
    currentX = evt.clientX;
    currentY = evt.clientY;
};

function deselectElement(evt) {
    if(selectedElement != 0){
        selectedElement.removeAttributeNS(null, "onmouseout");
        selectedElement.removeAttributeNS(null, "onmouseup");
        selectedElement = 0;
    }
}

var BLOCK_TYPE_EVENT = 0; //无上文型
var BLOCK_TYPE_STRUCTURE = 1; //结构型
var BLOCK_TYPE_SENTENCE = 2; //语句型
var BLOCK_TYPE_VALUE = 3; //值型
var Block = function (name,type,text,code,returns,color,depth,interfaces,inputs) {
    this.name = name;
    this.type = type;
    this.text = text;
    this.code = code;
    this.interfaces = interfaces;
    this.inputs = inputs;
    this.returns = returns;
    this.color = color;
    this.depth = depth;
    this.draw = function (parent,x,y) {
        var blockBox = document.createElementNS("http://www.w3.org/2000/svg", 'g');
        blockBox.setAttribute("class","block-box");
        blockBox.setAttributeNS(null,"transform","translate("+x+","+y+")");
        if(this.type===BLOCK_TYPE_SENTENCE){
            drawBody(blockBox,BLOCK_TYPE_SENTENCE,this.color,140,32);
            var blockTitle = createText(this.text,10,(h-14)/2);
            blockBox.appendChild(blockTitle);
        }
        parent.appendChild(blockBox);
    }
};

function createText(str,x,y) {
    var text = document.createElementNS("http://www.w3.org/2000/svg",'text');
    text.setAttribute("class","block-text");
    text.setAttribute("y",12.5);
    text.setAttribute("fill","white");
    text.setAttribute("transform","translate("+x+","+y+")");
    text.appendChild(document.createTextNode(str));
    return text;
}
function drawBody(parent, type, color, w, h) {
    if(type===BLOCK_TYPE_SENTENCE){
        var blockBody = createPath("M0 0 L14 0 L16 4 L25 4 L27 0 L"+w+" 0 L"+w+" "+h+" L27 "+h+" L25 "+(h+4)+" L16 "+(h+4)+" L14 "+h+" L0 "+h+" Z",color,0,0);
        parent.appendChild(blockBody);
    }
}
function createPath(d,color,x,y) {
    var path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    path.setAttribute("d",d);
    path.setAttribute("fill",color);
    path.setAttribute("filter","url(#f1)");
    path.setAttribute("class","block-body");
    path.setAttributeNS(null, "onmousedown", "selectElement(evt)");
    return path
}

function createShape() {

}

var INTERFACE_TYPE_NORMAL = 0; //常规型
var INTERFACE_TYPE_AFTER = 1; //后方型
var Interface = function(name,type,text,block){
    this.name = name;
    this.type = type;
    this.text = text;
    this.block = block;
};
var InterfaceAfter = function(){
    return new Interface("后方语句",INTERFACE_TYPE_AFTER,"",null)
};

var INPUT_TYPE_INNER = 0; //内部块类型
var INPUT_TYPE_AFTER = 1; //后方块类型
var INPUT_TYPE_TEXT = 2; //文本输入框
var INPUT_TYPE_NUM = 3; //数字输入框
var INPUT_TYPE_SPINNER = 4; //下拉菜单框
var Input = function(name,type,textFront,textAfter,classes,block){
    this.name = name;
    this.type = type;
    this.textFront = textFront;
    this.textAfter = textAfter;
    this.classes = classes;
    this.block = block;
};

var blocks = [];
blocks.push({parent:"常用",block:new Block("创建变量",BLOCK_TYPE_SENTENCE,"创建变量","var <@0> = <@1>;",[],"#4CAF50",0,
        [InterfaceAfter()],[new Input("变量名",INPUT_TYPE_INNER,"","","TEXT",null),new Input("AFTER",INPUT_TYPE_AFTER,"初始值为","","UNDEFINED",null)])});


var blockMenu = [
    {name:"逻辑控制",children:["常用","控制","变量"]},
    {name:"界面布局",children:["事件","通用","文本","按钮"]},
];
var normalColor = "#394C5A";
var choosedColor = "#42B983";

var blockShowList = document.getElementById("blocks-svg")
window.onload=function(){
    var sidebar = new Vue({
        el:'#side-bar',
        data:{
            list:[]
        },
        methods:{
            showChildren:function(v){
                this.list.forEach(function(item){
                    changeTitleStatus(item,false);
                });
                changeTitleStatus(v,true);
            },
            showBlocks:function (v) {
                showListBlocks(v.name)
            }
        }
    });
    var list = [];
    for(j in blockMenu){
        var item = blockMenu[j];
        var childList = [];
        for(i in item.children){
            childList.push({name:item.children[i]})
        }
        list.push({name:item.name,isShow:false,color:normalColor,right:"0px",sub:childList})
    }
    changeTitleStatus(list[0],true);
    sidebar.list = list;
    showListBlocks(blockMenu[0].children[0]);
};

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

function showListBlocks(name) {
    blocks.forEach(function (value) {
        console.log(value.parent)
        if(value.parent===name){
            value.block.draw(blockShowList,40,40);
        }
    })
}

