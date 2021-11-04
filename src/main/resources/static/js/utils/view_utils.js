
const ViewUtils = {};

//监听边缘调控大小
ViewUtils.makeDrawer = function (element,direction,doAfter) {
    if(typeof(element) === "string"){
        element = document.getElementById(element);
    }
    doAfter = doAfter || function () {
        return 0;
    };

    let splitLine = document.createElement("div");
    splitLine.p = -1;
    splitLine.setAttribute("id",element.id+"-sl");
    if(direction==="bottom"){
        splitLine.setAttribute("class","horizontal-split-line split-line");
    }else if(direction==="right"){
        splitLine.setAttribute("class","vertical-split-line split-line stack-left right-more");
    }else if(direction==="top"){
        splitLine.setAttribute("class","horizontal-split-line split-line");
    }else {
        splitLine.setAttribute("class","vertical-split-line split-line stack-right left-more");
    }
    splitLine.onmousedown = function(e){
        let startX = e.clientX;
        let startW = element.offsetWidth;
        if(direction==="bottom"){
            splitLine.top = splitLine.offsetTop;
        }else if(direction==="right"){
        }else if(direction==="top"){
            splitLine.top = splitLine.offsetTop;
        }else {
            splitLine.left = splitLine.offsetLeft;
        }
        document.onmousemove = function(e){
            let endX = e.clientX;
            let moveLen = 0;
            if(direction==="bottom"){
                splitLine.top = splitLine.offsetTop;
            }else if(direction==="right"){
                moveLen = startW - endX + startX;
            }else if(direction==="top"){
                splitLine.top = splitLine.offsetTop;
            }else {
                moveLen = splitLine.left + endX - startX;
            }
            if(moveLen<150) moveLen = 150;

            splitLine.style.left = moveLen;
            element.style.width = moveLen + "px";
            doAfter()
        };
        document.onmouseup = function(evt){
            evt.stopPropagation();
            document.onmousemove = null;
            document.onmouseup = null;
            splitLine.releaseCapture && splitLine.releaseCapture();
        };
        splitLine.setCapture && splitLine.setCapture();
        return false;
    };
    element.appendChild(splitLine);
};

ViewUtils.bindBorder = function(view,line,direction,doAfter,minWidth){
    minWidth = minWidth || 150;
    if(typeof(view) === "string"){
        view = document.getElementById(view)
    }
    if(typeof(line) === "string"){
        line = document.getElementById(line)
    }
    if(view==null||line==null){
        return false
    }
    line.onmousedown = function(e){
        let startX = e.clientX;
        let startW = view.offsetWidth;
        if(direction==="bottom"){
            line.top = line.offsetTop;
        }else if(direction==="right"){
        }else if(direction==="top"){
            line.top = line.offsetTop;
        }else {
            line.left = line.offsetLeft;
        }
        document.onmousemove = function(e){
            let endX = e.clientX;
            let moveLen = 0;
            if(direction==="bottom"){
                line.top = line.offsetTop;
            }else if(direction==="right"){
                moveLen = startW - endX + startX;
            }else if(direction==="top"){
                line.top = line.offsetTop;
            }else {
                moveLen = line.left + endX - startX;
            }
            if(moveLen<minWidth) moveLen = minWidth;

            line.style.left = moveLen;
            view.style.width = moveLen + "px";
            doAfter()
        };
        document.onmouseup = function(evt){
            evt.stopPropagation();
            document.onmousemove = null;
            document.onmouseup = null;
            line.releaseCapture && line.releaseCapture();
        };
        line.setCapture && line.setCapture();
        return false;
    };
    return true;
};

ViewUtils.createView = function(tag,className,id){
    let view = document.createElement(tag);
    view.className = className;
    view.id = id;
    return view;
};

ViewUtils.changeShowMode = function(id,btn) {
    let v = document.getElementById(id);
    if(v.style.display==="none"){
        v.style.display = "inline-block";
        ViewUtils.changeShowBtnState(btn,true)
    }else {
        v.style.display = "none";
        ViewUtils.changeShowBtnState(btn,false)
    }
};

ViewUtils.changeShowBtnState = function(btn,flag) {
    if(typeof btn === "string"){
        btn = document.getElementById(btn);
    }
    if(flag){
        btn.style.background = "#444";
        btn.style.color = "#fff";
    }else {
        btn.style.background = "transparent";
        btn.style.color = "#222";
    }
};

ViewUtils.changeViewState = function(id,flag) {
    if(flag){
        document.getElementById(id).style.display = "inline-block";
    }else {
        document.getElementById(id).style.display = "none";
    }
};



