
const FilesTree = {};

FilesTree.viewId = null;
FilesTree.tree = null;

//选项常量
FilesTree.MODE_SINGLE_FILE = 0;
FilesTree.MODE_NORMAL_PRODUCT = 1;
FilesTree.MODE_HARMONY_PRODUCT = 2;

FilesTree.FILE_TYPE_AUTO = 0;
FilesTree.FILE_TYPE_UI = 1;
FilesTree.FILE_TYPE_HARMONY = 2;

FilesTree.projectMode = FilesTree.MODE_SINGLE_FILE;
FilesTree.projectNode = null;

FilesTree.fileType = FilesTree.FILE_TYPE_AUTO;
FilesTree.fileNode = null;

FilesTree.init = function (id) {
    FilesTree.viewId = id;
    var initNodes=[
        {"name":"项目","open":true,children:[]}
    ];
    FilesTree.tree = $.fn.zTree.init($("#"+FilesTree.viewId), treeSetting, initNodes);
    if(FilesTree.projectMode == FilesTree.MODE_SINGLE_FILE){
        FilesTree.projectNode = FilesTree.tree.getNodes()[0];
        FilesTree.fileNode = FilesTree.tree.addNodes(FilesTree.projectNode,{name:"Untiled.js"})[0];
    }
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
                if(FilesTree.projectMode == FilesTree.MODE_SINGLE_FILE) {
                    alert("单文件项目不可删除");
                    return false;
                }else {
                    return true;
                }
            },
            beforeRename:function(treeId,treeNode,newName,isCancel){
                return true;
            },
            beforeEditName: function(treeId,treeNode){
                if(treeNode===FilesTree.projectNode){
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
};

FilesTree.newProject = function(type,value){
};

FilesTree.newFile = function(name){

};

FilesTree.updateFileName = function (name) {
    if(FilesTree.projectMode == FilesTree.MODE_SINGLE_FILE){
        FilesTree.fileNode.name = name;
        FilesTree.tree.updateNode(FilesTree.fileNode);
    }
};

