
const FollowUtils = {};
const MoveTipUtils = {};

FollowUtils.init = function (document) {
    FollowUtils.box = document.getElementById("follow-box");
    FollowUtils.title = document.getElementById("follow-title");
    FollowUtils.msg = document.getElementById("follow-msg");
    MoveTipUtils.box = document.getElementById("move-tip");
};

FollowUtils.setNode = function (node) {
    FollowUtils.title.innerText = node.tagName;
    let attrs = node.attributes;
    let msgStr = "";
    for (let i = 0; i < attrs.length; i++) {
        let item = attrs.item(i);
        msgStr += item.name+" = "+item.value+"\n"
    }
    msgStr = msgStr.substring(0,msgStr.length-1);
    FollowUtils.msg.innerText = msgStr;
};

FollowUtils.setPosition = function(x,y){
    FollowUtils.box.style.top = y+"px";
    FollowUtils.box.style.left = x+"px";
};

FollowUtils.show = function (flag) {
    if (flag) {
        FollowUtils.box.style.visibility = "visible";
    }else{
        FollowUtils.box.style.visibility = "hidden";
    }
};

MoveTipUtils.show = function (flag) {
    if (flag) {
        MoveTipUtils.box.style.visibility = "visible";
    }else{
        MoveTipUtils.box.style.visibility = "hidden";
    }
};

MoveTipUtils.setPosition = function (level,top,left,bottom,right) {
    left += level*16-2;
    top += 13;
    MoveTipUtils.box.style.left = left+"px";
    MoveTipUtils.box.style.top = top+"px";
    MoveTipUtils.box.style.height = bottom-top+"px";
    MoveTipUtils.box.style.width = right-left-10+"px";
    MoveTipUtils.show(true);
};



