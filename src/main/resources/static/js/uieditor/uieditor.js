
const normalCode = "\"ui\";\n\nui.layout(\n    <frame>\n    </frame>\n);\n";

window.onload=function(){
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
    editor.setValue(normalCode);

    ViewUtils.makeDrawer("new-space","left");
    ViewUtils.makeDrawer("tree-space","left");
    ViewUtils.makeDrawer("code-space","right");
    ViewUtils.makeDrawer("attr-space","right");
    ViewUtils.makeDrawer("preview-space","right");

    //初始化工具栏
    toolbar = new Vue({
        el: '#toolbar',
        data: {
            ip: '',
            path: '',
        },
        methods:{
            show:function (target) {
                var id = target.id;
                if(id==="show-new"){
                    ViewUtils.changeShowMode("new-space",target);
                }else if(id==="show-code"){
                    ViewUtils.changeShowMode("code-space",target);
                }else if(id==="show-tree"){
                    ViewUtils.changeShowMode("tree-space",target);
                }else if(id==="show-preview"){
                    ViewUtils.changeShowMode("preview-space",target);
                }else if(id==="show-attr"){
                    ViewUtils.changeShowMode("attr-space",target);
                }else if(id==="show-structure"){
                    if(document.getElementById("structure-space").style.display==="none"){
                        document.getElementById("code-space").style.removeProperty("flex-grow")
                    }else {
                        document.getElementById("code-space").style.setProperty("flex-grow","1")
                    }
                    ViewUtils.changeShowMode("structure-space",target);
                }
                if(document.getElementById("structure-space").style.display==="inline-block"){
                    DrawSpace.freshSize();
                }
            }
        }
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




