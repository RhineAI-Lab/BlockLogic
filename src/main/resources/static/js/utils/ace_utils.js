const AceUtils = {};

AceUtils.createEditor = function (id) {
    var editor = ace.edit(id);//设置编辑器样式，对应theme-*.js文件
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
    return editor;
};


