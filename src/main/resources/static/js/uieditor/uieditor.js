
const normalCode = "\"ui\";\n\nui.layout(\n    <frame>\n    </frame>\n);\n";

require.config({
    paths : {
        "ace" : "ace/ace",
        "vue" : "js/plugins/vue.min",
        "esprima" : "js/plugins/esprima.min"
    }
});

window.onload=function(){
    //初始化代码编辑器
    require(["ace"],function () {
        AceUtils.createEditor("editor");
        AceUtils.setCode(normalCode);
    });

    //初始化解析器
    require(["esprima"],function (parser) {
        CodeUtils.init(parser)
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
                    val:""
                }
            },
            props:["btn","list"],
            template:`
            <div class="select-box">
                <div class="select-input">
                    <input type="text" class="tool-input" :value="val" @click="selectShow=!selectShow" placeholder="选择编辑目标"/>
                    <button class="tool-btn btn-2" id="change-target" @click="changeTarget()" title="切换编辑目标。">切换</button>
                    <span></span>
                </div>
                <custom-list class="select-show" v-show="selectShow" :list="list" v-on:value1="selectValueHandle"></custom-list>
            </div>
        `,
            methods:{
                selectValueHandle(value){
                    this.val = value;
                    this.selectShow=false
                }
            }
        });
        Vue.component("custom-list",{
            props:["list"],
            template:`
            <ul class="select-list">
                <li class="select-item" v-for="item in list" @click="searchValueHandle(item)">{{item}}</li>
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
                list:["aaa","bbb","abc"]
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
                getXmlList: function () {
                    console.log(JSON.stringify(CodeUtils.getXmlCodeList(AceUtils.getCode(true)),null,4));
                }
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



