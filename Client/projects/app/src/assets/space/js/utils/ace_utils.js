const AceUtils = {};

AceUtils.editor = null;

AceUtils.createEditor = function (id) {
    var editor = ace.edit(id);//设置编辑器样式，对应theme-*.js文件
    editor.setTheme("ace/theme/solarized_light");
    editor.session.setMode("ace/mode/jsx");//设置代码语言，对应mode-*.js文件
    editor.setShowPrintMargin(false);//设置打印线是否显示
    editor.setReadOnly(false);//设置是否只读
    ace.require("ace/ext/language_tools");
    editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
        fontSize: "16px"
    });
    AceUtils.editor = editor;
};

AceUtils.getCode = function (withOutBlock) {
    if(editor){
        let code = AceUtils.editor.getSession().getValue();
        if(withOutBlock){
            const startStr = "//------ 图形块结构记录 请勿随意修改 ------\n/*";
            code = code.split(startStr)[0]
        }
        return code
    }else {
        return null
    }
};

AceUtils.setCode = function (code){
    if(AceUtils.editor!=null){
        AceUtils.editor.setValue(code);
    }
};

AceUtils.undo = function () {
    AceUtils.editor.undo();
};

AceUtils.redo = function () {
    AceUtils.editor.redo();
};


