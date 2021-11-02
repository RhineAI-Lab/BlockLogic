
const DC = {};

DC.DRAWER_MODE_LEFT = 0;
DC.DRAWER_MODE_RIGHT = 1;

DC.rootView = null;
DC.doAfter = function(){
};

DC.drawersLeftView = null;
DC.drawersRightView = null;
DC.listLeftView = null;
DC.listRightView = null;
DC.mainView = null;

DC.drawersMap = new Map();

DC.init = function (rootViewId,doAfter) {
    DC.rootView = document.getElementById(rootViewId);

    DC.drawersLeftView = document.getElementById("dc-drawers-left");
    DC.drawersRightView = document.getElementById("dc-drawers-right");
    DC.listLeftView = document.getElementById("dc-list-left");
    DC.listRightView = document.getElementById("dc-list-right");
    DC.mainView = document.getElementById("dc-main");

    if(doAfter){
        DC.doAfter = doAfter;
    }
};

//首次添加进行布局复制，后期仅进行隐藏
DC.addDrawer = function(name,icon,mode,viewId,normalWidth){
    normalWidth = normalWidth || 400;
    if(DC.drawersMap[name]==null){
        DC.drawersMap[name] = DC.createDrawerView(name,icon,mode,viewId,normalWidth);
    }
    let drawer = DC.drawersMap[name];
    return drawer
};

DC.createDrawerView = function(name,icon,mode,viewId,normalWidth){
    //构造根布局 获取内部布局
    let drawerView = document.getElementById(viewId);
    if(drawerView==null){
        return null;
    }
    let drawerRootView = ViewUtils.createView("div","drawer-root",viewId+"-root");
    drawerRootView.style.width = normalWidth+"px";
    drawerView.parentNode.removeChild(drawerView);
    drawerRootView.appendChild(drawerView);

    //创建布局
    let drawerMain = ViewUtils.createView("div","drawer-main",viewId+"-body");
    let drawerHead = ViewUtils.createView("div","drawer-head",viewId+"-head");
    let drawerBody = ViewUtils.createView("div","drawer-body",viewId+"-head");
    let drawerTitle = ViewUtils.createView("a","drawer-title",viewId+"-title");
    let drawerHideBtn = ViewUtils.createView("i","drawer-hide-btn iconfont icon-sami-select",viewId+"-hide-btn");
    let drawerIcon = ViewUtils.createView("i","drawer-icon iconfont icon-"+icon,viewId+"-icon");
    let splitLine = DC.createSplitLine(viewId+"-line");
    let parentView = null;

    drawerTitle.innerText = name;

    //作用区分控制
    if(mode===DC.DRAWER_MODE_LEFT){
        parentView = DC.drawersLeftView;
        drawerRootView.appendChild(drawerMain);
        drawerRootView.appendChild(splitLine);
        ViewUtils.bindBorder(drawerRootView,splitLine,"left",DC.doAfter);
        splitLine.style.right = "-2px";
        drawerMain.style.right = "1px";
    }else {
        parentView = DC.drawersRightView;
        drawerRootView.appendChild(splitLine);
        drawerRootView.appendChild(drawerMain);
        ViewUtils.bindBorder(drawerRootView,splitLine,"right",DC.doAfter);
        splitLine.style.left = "-2px";
        drawerMain.style.left = "1px";
    }

    //布局拼装
    parentView.appendChild(drawerRootView);
    drawerMain.appendChild(drawerHead);
    drawerMain.appendChild(drawerBody);
    drawerHead.appendChild(drawerIcon);
    drawerHead.appendChild(drawerTitle);
    drawerHead.appendChild(drawerHideBtn);
    drawerBody.appendChild(drawerView);

    return drawerRootView;
};

DC.addDrawerBtn = function (name,icon,mode) {
    let parentView = null;
    let drawerBtn = ViewUtils.createView("div","drawer-main",viewId+"-body");
    let drawerBtnIcon = ViewUtils.createView("i","drawer-body",viewId+"-head");
    let drawerBtnText = ViewUtils.createView("a","drawer-head",viewId+"-head");
};

DC.createSplitLine = function (id) {
    let splitLine = ViewUtils.createView("div","vertical-split-line",id);
    splitLine.appendChild(ViewUtils.createView("div","",""));
    splitLine.style.position = "absolute";
    return splitLine
};










