
const ViewUtils = {};

//监听边缘调控大小
ViewUtils.makeDrawer = function (element,direction,doAfter) {
    if(typeof(element) === "string"){
        element = document.getElementById(element)
    }
    doAfter = doAfter || function () {
        return 0
    };

    var splitLine = document.createElement("div");
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
        var startX = e.clientX;
        var startW = element.offsetWidth;
        if(direction==="bottom"){
            splitLine.top = splitLine.offsetTop;
        }else if(direction==="right"){
        }else if(direction==="top"){
            splitLine.top = splitLine.offsetTop;
        }else {
            splitLine.left = splitLine.offsetLeft;
        }
        document.onmousemove = function(e){
            var endX = e.clientX;
            var moveLen = 0;
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


ViewUtils.changeShowMode = function(id,btn) {
    var v = document.getElementById(id);
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



