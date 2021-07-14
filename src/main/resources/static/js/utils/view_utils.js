
const ViewUtils = {};

ViewUtils.makeDrawer = function (element,direction) {
    if(typeof(element) === "string"){
        element = document.getElementById(element)
    }

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


