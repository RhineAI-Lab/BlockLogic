
var normalCode = "\"ui\";\n\nui.layout(\n    <frame>\n    </frame>\n);\n";

normalCode = '"ui";\n' +
    '\n' +
    'ui.layout(\n' +
    '    <drawer id="drawer">\n' +
    '        <vertical>\n' +
    '            <appbar>\n' +
    '                <toolbar id="toolbar" title="示例"/>\n' +
    '                <tabs id="tabs"/>\n' +
    '            </appbar>\n' +
    '            <viewpager id="viewpager">\n' +
    '                <frame>\n' +
    '                    <text text="第一页内容" textColor="black" textSize="16sp"/>\n' +
    '                </frame>\n' +
    '                <frame>\n' +
    '                    <text text="第二页内容" textColor="red" textSize="16sp"/>\n' +
    '                </frame>\n' +
    '            </viewpager>\n' +
    '        </vertical>\n' +
    '    </drawer>\n' +
    ');\n' +
    '\n' +
    '\n' +
    'var color = <text text="第三页"/>;\n' +
    '\n' +
    '//创建选项菜单(右上角)\n' +
    'ui.emitter.on("create_options_menu", menu => {\n' +
    '    menu.add("设置");\n' +
    '    menu.add("关于");\n' +
    '});\n' +
    '//监听选项菜单点击\n' +
    'ui.emitter.on("options_item_selected", (e, item) => {\n' +
    '    switch (item.getTitle()) {\n' +
    '        case "设置":\n' +
    '            toast("还没有设置");\n' +
    '            break;\n' +
    '        case "关于":\n' +
    '            alert("关于", "Auto.js界面模板 v1.0.0");\n' +
    '            break;\n' +
    '    }\n' +
    '    e.consumed = true;\n' +
    '});\n' +
    'activity.setSupportActionBar(ui.toolbar);';

require.config({
    paths : {
        "ace" : "ace/ace",
        "vue" : "js/plugins/vue.min",
        "esprima" : "js/plugins/esprima.min",
        "blockly" : "blockly/blockly_compressed"
    }
});

var targetPoint = null;
var target = null;

window.onload=function(){
    //初始化代码编辑器
    require(["ace"],function () {
        AceUtils.createEditor("editor");
        AceUtils.setCode(normalCode);
    });

    //初始化解析器
    require(["esprima"],function (esprima) {
        CodeUtils.init(esprima)
    });

    //边缘拖拽绑定
    ViewUtils.makeDrawer("new-space","left");
    ViewUtils.makeDrawer("tree-space","left");
    ViewUtils.makeDrawer("code-space","right");
    ViewUtils.makeDrawer("attr-space","right");
    ViewUtils.makeDrawer("preview-space","right");

    require(["vue"],function (Vue) {
        Vue.component("custom-select",{
            data:function(){
                return {
                    selectShow:false,
                    val:"",
                    choosed:null
                }
            },
            props:["btn","list"],
            template:`
            <div class="select-box">
                <div class="select-input">
                    <input type="text" id="select-target" class="tool-input" :value="val" @click="freshList();selectShow=!selectShow" placeholder="选择编辑目标"/>
                    <button class="tool-btn btn-2" @click="freshList()" title="切换编辑目标。">刷新</button>
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
        //初始化工具栏
        toolbar = new Vue({
            el: '#toolbar',
            data: {
                ip: '',
                path: '',
                list:[],
                val:'',
            },
            methods: {
                show: function (target) {
                    var id = target.id;
                    if (id === "show-new") {
                        ViewUtils.changeShowMode("new-space", target);
                    } else if (id === "show-code") {
                        ViewUtils.changeShowMode("code-space", target);
                    } else if (id === "show-tree") {
                        ViewUtils.changeShowMode("tree-space", target);
                    } else if (id === "show-preview") {
                        ViewUtils.changeShowMode("preview-space", target);
                    } else if (id === "show-attr") {
                        ViewUtils.changeShowMode("attr-space", target);
                    } else if (id === "show-structure") {
                        if (document.getElementById("structure-space").style.display === "none") {
                            document.getElementById("code-space").style.removeProperty("flex-grow")
                        } else {
                            document.getElementById("code-space").style.setProperty("flex-grow", "1")
                        }
                        ViewUtils.changeShowMode("structure-space", target);
                    }
                    if (document.getElementById("structure-space").style.display === "inline-block") {
                        DrawSpace.freshSize();
                    }
                },
                ast: function () {
                    if(CodeUtils.Esprima!=null){
                        console.log(JSON.stringify(CodeUtils.Esprima.parse(AceUtils.getCode(true),{jsx: true }),null,4));
                    }
                },
                astPosition: function () {
                    if(CodeUtils.Esprima!=null){
                        console.log(JSON.stringify(CodeUtils.Esprima.parse(AceUtils.getCode(true),{jsx: true ,loc: true, range: true}),null,4));
                    }
                },
                freshXmlList: function () {
                    console.log(JSON.stringify(CodeUtils.getXmlCodeList(AceUtils.getCode(true)),null,4));
                },
                getXmlCode: function () {
                    console.log(CodeUtils.getXmlCode(target,targetPoint.indent));
                }
            }
        });

        //初次解析
        require(["esprima","ace","vue"],function () {
            freshXmlList();
            if(toolbar.list.length>0){
                toolbar.$refs.selectTarget.chooseItem(toolbar.list[0])
            }
        });
    });

    //初始化分栏显示状态
    ViewUtils.changeShowBtnState("show-new",true);
    ViewUtils.changeShowBtnState("show-code",true);
    ViewUtils.changeShowBtnState("show-attr",true);
    ViewUtils.changeShowBtnState("show-preview",false);
    ViewUtils.changeShowBtnState("show-structure",true);
    ViewUtils.changeShowBtnState("show-tree",false);
    ViewUtils.changeViewState("tree-space",false);
    ViewUtils.changeViewState("preview-space",false);

};

function freshStructure() {
    if(target!=null){
        let boxes = [];
        function freshShow() {
            if(boxes.length>0){
                var show = null;
                var maxLevel = -1;
                for (let i = 0; i < boxes.length; i++) {
                    let box = boxes[i];
                    if(box.choosed&&box.level>maxLevel){
                        show = box;
                        maxLevel = box.level;
                    }
                    if(box.level%2==0){
                        box.style.background = "#f1f1f1"
                    }else {
                        box.style.background = "#fefefe"
                    }
                }
                if(show){
                    show.style.background = "#66ff6660"
                }
            }
        }
        function addStructureView(node,parentView,level,inline) {
            let children = node.children;
            let nextInline = false;

            let box = document.createElement("div");
            let title = document.createElement("div");
            let msg = document.createElement("div");
            box.className = "structure-box";
            title.className = "structure-title";
            msg.className = "structure-msg";
            if(level%2==0){
                box.style.background = "#f1f1f1"
            }else {
                box.style.background = "#fefefe"
            }
            if(inline){
                box.style.flexGrow=1;
            }
            parentView.appendChild(box);
            box.appendChild(title);
            box.appendChild(msg);
            title.innerText = node.tagName;
            title.nowrap = true;
            msg.nowrap = true;
            let attrs = node.attributes;
            let msgStr = "";
            for (let i = 0; i < attrs.length; i++) {
                let item = attrs.item(i);
                msgStr += item.name+" = "+item.value+"\n"
            }
            msgStr = msgStr.substring(0,msgStr.length-1);
            msg.innerText = msgStr;

            box.level = level;
            box.onmouseover = function(){
                box.choosed = true;
                freshShow();
            };
            box.onmouseout = function(){
                box.choosed = false;
                freshShow();
            };
            boxes.push(box);

            if(children.length>0){
                let split = document.createElement("div");
                let holder = document.createElement("div");
                split.className = "structure-split";
                holder.className = "structure-holder";
                if(node.tagName=="horizontal"){
                    nextInline = true;
                    holder.style.display="flex"
                }
                box.appendChild(split);
                box.appendChild(holder);

                for (let i = 0; i < children.length; i++) {
                    let midlle = document.createElement("div");
                    midlle.style.height = "0.1px";
                    holder.appendChild(midlle);
                    addStructureView(children[i],holder,level+1,nextInline);
                }
            }
        }
        var structurView = document.getElementById("structure-show");
        structurView.innerHTML = "";
        addStructureView(target.firstChild,structurView,0,false);
    }
}

function freshXmlList() {
    toolbar.list = CodeUtils.getXmlCodeList(AceUtils.getCode(true));
}

function changeTarget(t) {
    targetPoint = t;
    target = CodeUtils.updateXmlCode(AceUtils.getCode().substring(targetPoint.range[0],targetPoint.range[1]));
    freshStructure();
}

