
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
DC.addDrawer = function(name,icon,mode,viewId,normalWidth,minWidth){
    normalWidth = normalWidth || 400;
    minWidth = minWidth || 150;
    let drawer = {};
    if(DC.drawersMap[name]==null){
        drawer.name = name;
        drawer.id = viewId;
        drawer.rootView = DC.createDrawerView(name,icon,mode,viewId,normalWidth);
        drawer.mainBtn = DC.addDrawerBtn(name,icon,mode,viewId);
        drawer.showView = true;
        drawer.showBtn = true;
        DC.bindDrawerBtns(drawer);
        DC.drawersMap[name]=drawer;
    }else {
        drawer = DC.drawersMap[name];
    }
    return drawer
};

DC.createDrawerView = function(name,icon,mode,viewId,normalWidth,minWidth){
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
    let drawerHideBtnHolder = ViewUtils.createView("div","drawer-hide-btn-holder",viewId+"-hide-btn-holder");
    let splitLine = DC.createSplitLine(viewId+"-line");
    let parentView = null;

    drawerTitle.innerText = name;

    //作用区分控制
    if(mode===DC.DRAWER_MODE_LEFT){
        parentView = DC.drawersLeftView;
        drawerRootView.appendChild(drawerMain);
        drawerRootView.appendChild(splitLine);
        ViewUtils.bindBorder(drawerRootView,splitLine,"left",DC.doAfter,minWidth);
        splitLine.style.right = "0px";
        drawerMain.style.right = "1px";
    }else {
        parentView = DC.drawersRightView;
        drawerRootView.appendChild(splitLine);
        drawerRootView.appendChild(drawerMain);
        ViewUtils.bindBorder(drawerRootView,splitLine,"right",DC.doAfter,minWidth);
        splitLine.style.left = "0px";
        drawerMain.style.left = "1px";
    }

    //布局拼装
    parentView.appendChild(drawerRootView);
    drawerMain.appendChild(drawerHead);
    drawerMain.appendChild(drawerBody);
    drawerHead.appendChild(drawerIcon);
    drawerHead.appendChild(drawerTitle);
    drawerHead.appendChild(drawerHideBtnHolder);
    drawerHideBtnHolder.appendChild(drawerHideBtn);
    drawerBody.appendChild(drawerView);

    return drawerRootView;
};
DC.addDrawerBtn = function (name,icon,mode,viewId) {
    //构建元素
    let parentView = null;
    let drawerBtn = ViewUtils.createView("div","dc-btn",viewId+"-btn");
    let drawerBtnIcon = ViewUtils.createView("i","dc-btn-icon iconfont icon-"+icon,viewId+"-btn-icon");
    let drawerBtnText = ViewUtils.createView("a","dc-btn-text",viewId+"-btn-text");

    //属性配置
    drawerBtnText.innerText = name;
    if(mode===DC.DRAWER_MODE_LEFT){
        parentView = DC.listLeftView;
        drawerBtnIcon.className = "dc-btn-icon dc-btn-icon-left iconfont icon-"+icon;
        drawerBtnText.className = "dc-btn-text dc-btn-text-left";
        parentView.appendChild(drawerBtn);
        drawerBtn.appendChild(drawerBtnText);
        drawerBtn.appendChild(drawerBtnIcon);
    }else {
        parentView = DC.listRightView;
        drawerBtnIcon.className = "dc-btn-icon dc-btn-icon-right iconfont icon-"+icon;
        drawerBtnText.className = "dc-btn-text dc-btn-text-right";
        parentView.appendChild(drawerBtn);
        drawerBtn.appendChild(drawerBtnIcon);
        drawerBtn.appendChild(drawerBtnText);
    }
    drawerBtn.style.height = drawerBtnText.offsetWidth+54+"px";
    drawerBtn.style.background = "#CCC";

    return drawerBtn
};
DC.createSplitLine = function (id) {
    let splitLine = ViewUtils.createView("div","vertical-split-line",id);
    splitLine.style.position = "absolute";
    return splitLine
};

DC.bindDrawerBtns = function (drawer) {
    let rootView = drawer.rootView;
    let mainBtn = drawer.mainBtn;
    let hideBtn = document.getElementById(drawer.id+"-hide-btn-holder");

    mainBtn.onmouseover = function (e) {
        if(!drawer.showView) {
            mainBtn.style.background = "#DFD";
        }
    };
    mainBtn.onmouseout = function (e) {
        if(drawer.showView){
            mainBtn.style.background = "#CCC";
        }else {
            mainBtn.style.background = "#FFF";
        }
    };
    mainBtn.onmousedown = function (e) {
        drawer.showView = !drawer.showView;
        if(drawer.showView){
            DC.openDrawer(drawer);
        }else {
            DC.closeDrawer(drawer);
        }
    };
    hideBtn.onmousedown = function (e) {
        if(drawer.showView){
            drawer.showView = false;
            DC.closeDrawer(drawer);
        }
    }
};

DC.openDrawer = function (drawer) {
    drawer = DC.getDrawerIfString(drawer);
    if(drawer==null)return false;

    if(!drawer.showBtn){
        DC.showBtn(drawer)
    }

    drawer.showView = true;
    drawer.mainBtn.style.background = "#CCC";
    drawer.rootView.style.display = "inline-block";

    DC.doAfter();
    return true;
};
DC.closeDrawer = function (drawer) {
    drawer = DC.getDrawerIfString(drawer);
    if(drawer==null)return false;

    drawer.showView = false;
    drawer.mainBtn.style.background = "#FFF";
    drawer.rootView.style.display = "none";

    DC.doAfter();
    return true;
};
DC.showBtn = function (drawer) {
    drawer = DC.getDrawerIfString(drawer);
    if(drawer==null)return false;

    if(drawer.showView){
        DC.closeDrawer(drawer);
    }

    drawer.showBtn = true;
    drawer.mainBtn.style.display = "inline-block";
    return true;
};
DC.hideBtn = function (drawer) {
    drawer = DC.getDrawerIfString(drawer);
    if(drawer==null)return false;

    drawer.showBtn = false;
    drawer.mainBtn.style.display = "none";
    return true;
};

DC.getDrawerIfString = function (drawer) {
    if(typeof(drawer) === "string"){
        drawer = DC.drawersMap[drawer]
    }
    return drawer
};










