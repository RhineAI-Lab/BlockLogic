
function setTapped(node,event) {
    node.downX = event.clientX;
    node.downY = event.clientY;
    tappedNode = node;
}

function freshCode() {
    let start = targetPoint.range[0];
    let end = targetPoint.range[1];
    let code = AceUtils.getCode();
    let xmlCode = CodeUtils.getXmlCode(target,targetPoint.indent).substring(targetPoint.indent);
    code = code.substring(0,start)+xmlCode+code.substring(end);

    //检测是否需要同步图形信息
    let changeTarget = null;
    let blockCode = CodeUtils.getBlockXml(code);
    if(blockCode!=null){
        blockCode = CodeUtils.cleanXmlSpace(blockCode);
        let xmlObj = CodeUtils.getXmlObject(blockCode);
        let valueList = xmlObj.getElementsByTagName("value");
        let trueIndex = -1;
        for (let i = 0; i < valueList.length; i++) {
            if(valueList[i].getAttribute("name")==="UI_XML"){
                trueIndex++;
                if(trueIndex===targetIndex){
                    changeTarget = valueList[i].lastChild.firstChild;
                    changeTarget.innerHTML = CodeUtils.htmlEncode(xmlCode);
                }
            }
        }
        blockCode = DrawSpace.domToXmlStr(xmlObj,unfoldXml);
        code = CodeUtils.changeBlockXml(code,blockCode);
    }

    AceUtils.setCode(code);
    targetPoint.range = [start,start+xmlCode.length];
    return changeTarget;
}

function initAdd() {
    let parent = document.getElementById("new-show");
    let groups = document.getElementsByTagName("WidgetGroup");
    for (let i = 0; i < groups.length; i++) {
        let box = document.createElement("div");
        let titleBox = document.createElement("div");
        let title = document.createElement("div");
        let swi = document.createElement("i");
        let holder = document.createElement("div");
        box.className = "new-box";
        title.className = "new-title";
        titleBox.className = "new-title-box";
        swi.className = "new-swi iconfont icon-arrow-down";
        holder.className = "new-items-holder";
        parent.appendChild(box);
        box.appendChild(titleBox);
        titleBox.appendChild(swi);
        titleBox.appendChild(title);
        box.appendChild(holder);
        title.innerText = groups[i].getAttribute("name");
        titleBox.onmousedown = function(e){
            if(holder.style.height!=="0px"){
                holder.style.height = "0px";
                swi.className = "new-swi iconfont icon-arrow-right";
            }else {
                holder.style.height = "auto";
                swi.className = "new-swi iconfont icon-arrow-down";
            }
        };
        let widgets = groups[i].getElementsByTagName("Widget");
        for (let j = 0; j < widgets.length; j++) {
            let nameStr = widgets[j].getAttribute("name");
            let itemBox = document.createElement("div");
            let icon = document.createElement("i");
            let itemTitle = document.createElement("div");
            let itemExp = document.createElement("div");
            let itemMsg = document.createElement("div");
            itemBox.className = "new-item-box";
            if(iconsMap[nameStr]){
                icon.className = "iconfont icon-"+iconsMap[nameStr]+" new-item-icon";
            }else {
                icon.className = "iconfont icon-"+iconsMap["normal"]+" new-item-icon";
            }
            itemTitle.className = "new-item-title";
            itemExp.className = "new-item-exp";
            itemMsg.className = "new-item-msg";
            itemTitle.innerText = nameStr;
            itemExp.innerText = widgets[j].getAttribute("example");
            itemMsg.innerText = widgets[j].getAttribute("summary");
            itemBox.onmousedown = function(event){
                let node = document.createElementNS("",nameStr);
                tempView.appendChild(node);
                setTapped(node,event);
                event.stopPropagation();
            };
            holder.appendChild(itemBox);
            itemBox.appendChild(icon);
            itemBox.appendChild(itemTitle);
            itemBox.appendChild(itemExp);
            itemBox.appendChild(itemMsg);
        }
    }
}

function freshAttr(node) {
    let attrs = getAllNormalAttrs();
    for (let i = 0; i < node.attributes.length; i++) {
        let item = node.attributes.item(i);
        attrs[0].push(newAttr(item.name,item.value));
    }
    attrs[1] = getSpecialAttrs(node.tagName);
    for (let i = 1; i < attrs.length; i++) {
        for (let j = 0; j < attrs[i].length; j++) {
            for (let k = 0; k < attrs[0].length; k++) {
                if(attrs[0][k].name===attrs[i][j].name){
                    attrs[i][j] = attrs[0][k];
                }
            }
        }
    }
    let parent = document.getElementById("attr-show");
    parent.innerText = "";
    let attrsTitles = ["当前属性","独有属性","常用属性","位置属性","全部属性"];
    let firstHolder = null;
    for (let i = 0; i < attrs.length; i++) {
        let box = document.createElement("div");
        let titleBox = document.createElement("div");
        let title = document.createElement("div");
        let swi = document.createElement("i");
        let holder = document.createElement("div");
        box.className = "new-box";
        title.className = "new-title";
        titleBox.className = "attr-title-box";
        swi.className = "new-swi iconfont icon-arrow-down";
        holder.className = "attr-items-holder";
        parent.appendChild(box);
        box.appendChild(titleBox);
        titleBox.appendChild(swi);
        titleBox.appendChild(title);
        box.appendChild(holder);
        if(i===0){
            firstHolder = holder;
        }
        title.innerText = attrsTitles[i];
        titleBox.onmousedown = function(e){
            if(holder.style.height!=="0px"){
                holder.style.height = "0px";
                holder.style.overflow = "hidden";
                swi.className = "new-swi iconfont icon-arrow-right";
            }else {
                holder.style.height = "auto";
                holder.style.overflow = "visible";
                swi.className = "new-swi iconfont icon-arrow-down";
            }
        };
        for (let j = 0; j < attrs[i].length; j++) {
            addAttrInput(holder,i,attrs[i][j],node,attrs,firstHolder)
        }
    }
}

function addAttrInput(parent,parentId,item,node,allAttrs,firstHolder) {
    let line = document.createElement("div");
    line.className = "attr-line";
    let id = "dp-"+parentId+"-"+parent.children.length;

    line.innerHTML = "<div class='attr-name' title='"+item.name+"'>"+item.name+"</div>\n<dropdown v-bind:value='value' options='"+findOpt(item.name)+"' id='"+id+"' type='all' @on_change_input_value='onTextChange' spellcheck='false'></dropdown>"
    parent.appendChild(line);

    let dp = new Vue({
        el:"#"+id,
        data:{
            value:item.value,
        },
        methods:{
            onTextChange:function (value) {
                if(item.value!==value){
                    if(value.length===0){
                        node.removeAttribute(item.name);
                    }else{
                        node.setAttribute(item.name,value);
                    }
                    item.value = value;
                    freshCode();
                    for (let k = 0; k < item.inputs.length; k++) {
                        item.inputs[k].value = value;
                    }
                    if(allAttrs[0].indexOf(item)===-1){
                        allAttrs[0].push(item);
                        addAttrInput(firstHolder,0,item,node,allAttrs,firstHolder)
                    }
                    if(node.structureAttr){
                        let attrs = node.attributes;
                        let msgStr = "";
                        for (let i = 0; i < attrs.length; i++) {
                            let item = attrs.item(i);
                            msgStr += item.name+" = "+item.value+"\n"
                        }
                        msgStr = msgStr.substring(0,msgStr.length-1);
                        node.structureAttr.innerText = msgStr;
                    }
                }
            }
        }
    });
    item.inputs.push(dp);
}

function freshStructure() {
    if(target!=null){
        let nodes = [];
        function addStructureView(node,parentView,level,inline) {
            let children = node.children;
            let nextInline = false;

            let box = document.createElement("div");
            let icon = document.createElement("i");
            let title = document.createElement("div");
            let msg = document.createElement("div");
            box.className = "structure-box";
            title.className = "structure-title";
            msg.className = "structure-msg";
            if(iconsMap[node.tagName]){
                icon.className = "iconfont icon-"+iconsMap[node.tagName]+" structure-icon";
            }else {
                icon.className = "iconfont icon-"+iconsMap["normal"]+" structure-icon";
            }
            if(inline){
                box.style.flexGrow=1;
            }
            parentView.appendChild(box);
            box.appendChild(icon);
            box.appendChild(title);
            box.appendChild(msg);
            title.innerText = node.tagName;
            title.nowrap = true;
            msg.nowrap = true;
            let attrs = node.attributes;
            let msgStr = "";
            for (let i = 0; i < attrs.length; i++) {
                let item = attrs.item(i);
                msgStr += item.name+" = "+item.value+"\n"
            }
            msgStr = msgStr.substring(0,msgStr.length-1);
            msg.innerText = msgStr;
            node.structureAttr = msg;

            box.level = level;
            box.onmouseover = function(event){
                event.stopPropagation();
                if(!node.choosed){
                    box.style.background = "#e2e2e2"
                }
            };
            box.onmouseout = function(event){
                event.stopPropagation();
                if(!node.choosed){
                    box.resetBackground();
                }
            };
            box.resetBackground = function(){
                if(level%2===0){
                    box.style.background = "#f1f1f1"
                }else {
                    box.style.background = "#fefefe"
                }
            };
            box.resetBackground();
            node.choosed = false;
            box.onmousedown = function(event){
                event.stopPropagation();
                setTapped(node,event);
                node.choosed = true;
                clearNodesChoosed(nodes);
                chooseNode(node);
            };
            box.onmouseup = function(event){
                event.stopPropagation();
                if(tappedNode!=null){
                    if(node==tappedNode){
                        if(getNodeEventDis(node,event)<9) {
                        }
                    }else{
                        moveNode(tappedNode,node,-1)
                    }
                }
                window.onmouseup(event);
            };
            node.structureBox = box;
            nodes.push(node);

            if(children.length>0){
                let split = document.createElement("div");
                let holder = document.createElement("div");
                split.className = "structure-split";
                holder.className = "structure-holder";
                if(node.tagName=="horizontal"){
                    nextInline = true;
                    holder.style.display="flex"
                }
                box.appendChild(split);
                box.appendChild(holder);

                for (let i = 0; i < children.length; i++) {
                    let midlle = document.createElement("div");
                    midlle.style.height = "0.1px";
                    holder.appendChild(midlle);
                    addStructureView(children[i],holder,level+1,nextInline);
                }
            }
        }
        var structurView = document.getElementById("structure-show");
        structurView.innerHTML = "";
        addStructureView(target.firstChild,structurView,0,false);
    }
}

function freshTree() {
    if(target!=null){
        let nodes = [];
        function addTreeView(node,parentView,level,index) {
            let children = node.children;

            let box = document.createElement("div");
            let titleBox = document.createElement("div");
            let swi = document.createElement("i");
            let icon = document.createElement("i");
            let title = document.createElement("div");
            box.className = "tree-box";
            titleBox.className = "tree-title-box";
            title.className = "tree-title";
            if(iconsMap[node.tagName]){
                icon.className = "iconfont icon-"+iconsMap[node.tagName]+" tree-icon";
            }else {
                icon.className = "iconfont icon-"+iconsMap["normal"]+" tree-icon";
            }
            if(children.length>0){
                swi.className = "iconfont icon-arrow-down tree-swi";
                swi.style.marginLeft = level*16+4+"px";
                node.fold = false;
                swi.onmousedown = function (event) {
                    event.stopPropagation();
                    node.fold = !node.fold;
                    if(node.fold){
                        box.style.height = "26px";
                        swi.className = "iconfont icon-arrow-right tree-swi";
                    }else {
                        box.style.height = "";
                        swi.className = "iconfont icon-arrow-down tree-swi";
                    }
                };
            }else{
                swi.className = "";
                swi.style.marginLeft = level*16+24+"px";
            }
            box.style.background = "#fff";
            title.innerText = node.tagName;
            title.nowrap = true;
            node.treeBox = box;
            nodes.push(node);

            parentView.appendChild(box);
            box.appendChild(titleBox);
            titleBox.appendChild(swi);
            titleBox.appendChild(icon);
            titleBox.appendChild(title);

            box.onmouseover = function(event){
                event.stopPropagation();
                if(!node.choosed){
                    box.style.background = "#e2e2e2";
                }
            };
            box.onmouseout = function(event){
                event.stopPropagation();
                if(!node.choosed){
                    box.resetBackground();
                }
            };
            box.resetBackground = function(){
                box.style.background = "#fff";
            };
            node.choosed = false;
            box.onmousedown = function(event){
                event.stopPropagation();
                setTapped(node,event);
                node.choosed = true;
                clearNodesChoosed(nodes);
                chooseNode(node);
            };
            box.onmouseup = function(event){
                event.stopPropagation();
                if(node==tappedNode){
                    if(getNodeEventDis(node,event)<9) {
                    }
                }else{

                }
                window.onmouseup(event);
            };
            let parentBox = box.parentNode.parentNode.children[0];
            let parentRect = parentBox.getBoundingClientRect();
            let thisRect = titleBox.getBoundingClientRect();
            if(level===0){
                parentBox = null;
            }
            titleBox.onmousemove = function(event){
                titleBox.onmousemu(event,false);
            };
            titleBox.onmouseup = function(event){
                titleBox.onmousemu(event,true);
            };
            titleBox.showBorder = function(flag){
                if (flag){
                    titleBox.style.borderWidth = "1px";
                    titleBox.style.padding = "0";
                } else {
                    titleBox.style.borderWidth = "0";
                    titleBox.style.padding = "1px";
                }
            };
            titleBox.onmousemu = function(event,up){
                if(tappedNode!=null&&tappedNode!==node){
                    if(parentBox==null){
                        titleBox.showBorder(true);
                        MoveTipUtils.setPosition(level+1,thisRect.top,thisRect.left,thisRect.bottom+2,thisRect.right);
                        if(up){moveNode(tappedNode,node,0)}
                    }else if(event.offsetY<=7&&event.offsetY>=0){
                        parentBox.showBorder(true);
                        titleBox.showBorder(false);
                        if(index===0){
                            MoveTipUtils.setPosition(level,parentRect.top,thisRect.left,thisRect.top+2,thisRect.right);
                        }else {
                            MoveTipUtils.setPosition(level,parentRect.top,thisRect.left,thisRect.top,thisRect.right);
                        }
                        if(up){moveNode(tappedNode,node.parentNode,index)}
                    }else if(event.offsetY<19&&event.offsetY>7){
                        parentBox.showBorder(false);
                        titleBox.showBorder(true);
                        MoveTipUtils.setPosition(level+1,thisRect.top,thisRect.left,thisRect.bottom+2,thisRect.right);
                        if(up){moveNode(tappedNode,node,0)}
                    }else if(event.offsetY<=26&&event.offsetY>=19){
                        if(children.length>0&&!node.fold){
                            parentBox.showBorder(false);
                            titleBox.showBorder(true);
                            MoveTipUtils.setPosition(level+1,thisRect.top,thisRect.left,thisRect.bottom+2,thisRect.right);
                            if(up){moveNode(tappedNode,node,0)}
                        }else {
                            parentBox.showBorder(true);
                            titleBox.showBorder(false);
                            MoveTipUtils.setPosition(level,parentRect.top,thisRect.left,thisRect.bottom,thisRect.right);
                            if(up){moveNode(tappedNode,node.parentNode,index+1)}
                        }
                    }
                }
            };
            titleBox.onmouseout = function (event) {
                if(parentBox){
                    parentBox.showBorder(false);
                }
                titleBox.showBorder(false);
                MoveTipUtils.show(false);
            };

            let holder = document.createElement("div");
            holder.className = "tree-holder";
            box.appendChild(holder);

            for (let i = 0; i < children.length; i++) {
                addTreeView(children[i],holder,level+1,i);
            }
        }
        let treeView = document.getElementById("tree-show");
        treeView.innerHTML = "";
        addTreeView(target.firstChild,treeView,0,0);
    }
}

function moveNode(node,targetNode,index) {
    let newNode = node.cloneNode(true);
    if(node.parentNode.id!=="temp"){
        node.parentNode.removeChild(node);
    }
    if(index===-1){
        targetNode.appendChild(newNode)
    }else {
        let len = targetNode.children.length;
        if(index>=len){
            targetNode.appendChild(newNode)
        }else{
            targetNode.insertBefore(newNode,targetNode.children[index])
        }
    }
    freshShow();
    freshCode();
}

function getNodeEventDis(node,event) {
    if(node==null||event==null){
        return -1;
    }
    return Math.sqrt(Math.pow(node.downX-event.clientX,2)+Math.pow(node.downY-event.clientY,2))
}

function freshXmlList() {
    toolbar.list = CodeUtils.getXmlCodeList(AceUtils.getCode(true));
    if(toolbar.list.length>0){
        if(toolbar.list.length>targetIndex){
            toolbar.$refs.selectTarget.chooseItem(toolbar.list[targetIndex])
        }else {
            targetIndex = 0;
            toolbar.$refs.selectTarget.chooseItem(toolbar.list[0])
        }
    }
}

function logTarget() {
    console.log(AceUtils.getCode(true));
    console.log(targetPoint);
    console.log(AceUtils.getCode().substring(targetPoint.range[0],targetPoint.range[1]));
}

function changeTarget(t) {
    targetIndex = toolbar.list.indexOf(t);
    targetPoint = t;
    target = CodeUtils.getXmlObject(AceUtils.getCode().substring(targetPoint.range[0],targetPoint.range[1]));

    freshShow();
}

function freshTarget() {
    freshXmlList();
    changeTarget(toolbar.list[targetIndex])
}

function askOnLeave(e){
    var e = window.event||e;
    e.returnValue=("请确保您的代码可能未保存。是否确定离开？");
}

function freshShow() {
    freshStructure();
    freshTree();
    freshAttr(target.firstChild);
}

function clearNodesChoosed(nodes) {
    for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        node.choosed = false;
        if(node.treeBox){
            node.treeBox.resetBackground();
        }
        if(node.structureBox){
            node.structureBox.resetBackground();
        }
    }
}
function chooseNode(node) {
    node.choosed = true;
    if(node.treeBox){
        node.treeBox.style.background = "#66ff6660";
    }
    if(node.structureBox){
        node.structureBox.style.background = "#66ff6660";
    }
    freshAttr(node);
}

function save() {
    savedCode = AceUtils.getCode()+"";
    exportRaw("ui.js",savedCode)
}

function exportRaw(name, data) {
    var urlObject = window.URL || window.webkitURL || window;
    var export_blob = new Blob([data]);
    var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
    save_link.href = urlObject.createObjectURL(export_blob);
    save_link.download = name;
    fakeClick(save_link);
}

function fakeClick(obj) {
    var ev = document.createEvent("MouseEvents");
    ev.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    obj.dispatchEvent(ev);
}

function getAllNormalAttrs() {
    let arrayList = [];
    arrayList.push([]);
    arrayList.push([]);
    arrayList.push(getUsefulAttrs());
    arrayList.push(getPositionAttrs());
    arrayList.push(getAllAttrs());
    return arrayList;
}

function getPositionAttrs() {
    let attrs = [];
    attrs.push(newAttr("w"));
    attrs.push(newAttr("h"));
    attrs.push(newAttr("gravity"));
    attrs.push(newAttr("layout_gravity"));
    attrs.push(newAttr("layout_weight"));
    attrs.push(newAttr("margin"));
    attrs.push(newAttr("padding"));
    attrs.push(newAttr("minHeight"));
    attrs.push(newAttr("minWidth"));
    return attrs;
}
function getUsefulAttrs() {
    let attrs = [];
    attrs.push(newAttr("id"));
    attrs.push(newAttr("bg"));
    attrs.push(newAttr("style"));
    attrs.push(newAttr("alpha"));
    attrs.push(newAttr("foreground"));
    attrs.push(newAttr("visibility"));
    attrs.push(newAttr("rotation"));
    return attrs;
}
function getAllAttrs() {
    let attrs = [];
    attrs.push(newAttr("accessibilityLiveRegion"));
    attrs.push(newAttr("alpha"));
    attrs.push(newAttr("autoLink"));
    attrs.push(newAttr("autoSizeMaxTextSize"));
    attrs.push(newAttr("autoSizeMinTextSize"));
    attrs.push(newAttr("autoSizePresetSizes"));
    attrs.push(newAttr("autoSizeStepGranularity"));
    attrs.push(newAttr("autoSizeTextType"));
    attrs.push(newAttr("autoText"));
    attrs.push(newAttr("background"));
    attrs.push(newAttr("backgroundTint"));
    attrs.push(newAttr("backgroundTintMode"));
    attrs.push(newAttr("bufferType"));
    attrs.push(newAttr("capitalize"));
    attrs.push(newAttr("clickable"));
    attrs.push(newAttr("contentDescription"));
    attrs.push(newAttr("cursorVisible"));
    attrs.push(newAttr("digits"));
    attrs.push(newAttr("drawableBottom"));
    attrs.push(newAttr("drawableBottomCompat"));
    attrs.push(newAttr("drawableEnd"));
    attrs.push(newAttr("drawableEndCompat"));
    attrs.push(newAttr("drawableLeft"));
    attrs.push(newAttr("drawableLeftCompat"));
    attrs.push(newAttr("drawablePadding"));
    attrs.push(newAttr("drawableRight"));
    attrs.push(newAttr("drawableRightCompat"));
    attrs.push(newAttr("drawableStart"));
    attrs.push(newAttr("drawableStartCompat"));
    attrs.push(newAttr("drawableTint"));
    attrs.push(newAttr("drawableTintMode"));
    attrs.push(newAttr("drawableTop"));
    attrs.push(newAttr("drawableTopCompat"));
    attrs.push(newAttr("drawingCacheQuality"));
    attrs.push(newAttr("duplicateParentState"));
    attrs.push(newAttr("editable"));
    attrs.push(newAttr("editorExtras"));
    attrs.push(newAttr("elegantTextHeight"));
    attrs.push(newAttr("elevation"));
    attrs.push(newAttr("ellipsize"));
    attrs.push(newAttr("ems"));
    attrs.push(newAttr("enabled"));
    attrs.push(newAttr("fadeScrollbars"));
    attrs.push(newAttr("fadingEdge"));
    attrs.push(newAttr("fadingEdgeLength"));
    attrs.push(newAttr("filterTouchesWhenObscured"));
    attrs.push(newAttr("fitsSystemWindows"));
    attrs.push(newAttr("focusable"));
    attrs.push(newAttr("focusableInTouchMode"));
    attrs.push(newAttr("fontFamily"));
    attrs.push(newAttr("fontFeatureSettings"));
    attrs.push(newAttr("foreground"));
    attrs.push(newAttr("foregroundGravity"));
    attrs.push(newAttr("foregroundTint"));
    attrs.push(newAttr("foregroundTintMode"));
    attrs.push(newAttr("freezesText"));
    attrs.push(newAttr("gravity"));
    attrs.push(newAttr("hapticFeedbackEnabled"));
    attrs.push(newAttr("height"));
    attrs.push(newAttr("hint"));
    attrs.push(newAttr("id"));
    attrs.push(newAttr("imeActionId"));
    attrs.push(newAttr("imeActionLabel"));
    attrs.push(newAttr("imeOptions"));
    attrs.push(newAttr("importantForAccessibility"));
    attrs.push(newAttr("includeFontPadding"));
    attrs.push(newAttr("inputMethod"));
    attrs.push(newAttr("inputType"));
    attrs.push(newAttr("isScrollContainer"));
    attrs.push(newAttr("keepScreenOn"));
    attrs.push(newAttr("labelFor"));
    attrs.push(newAttr("layerType"));
    attrs.push(newAttr("layoutDirection"));
    attrs.push(newAttr("layout_gravity"));
    attrs.push(newAttr("layout_height"));
    attrs.push(newAttr("layout_margin"));
    attrs.push(newAttr("layout_weight"));
    attrs.push(newAttr("layout_width"));
    attrs.push(newAttr("letterSpacing"));
    attrs.push(newAttr("lineSpacingExtra"));
    attrs.push(newAttr("lineSpacingMultiplier"));
    attrs.push(newAttr("lines"));
    attrs.push(newAttr("linksClickable"));
    attrs.push(newAttr("longClickable"));
    attrs.push(newAttr("marqueeRepeatLimit"));
    attrs.push(newAttr("maxEms"));
    attrs.push(newAttr("maxHeight"));
    attrs.push(newAttr("maxLength"));
    attrs.push(newAttr("maxLines"));
    attrs.push(newAttr("maxWidth"));
    attrs.push(newAttr("minEms"));
    attrs.push(newAttr("minHeight"));
    attrs.push(newAttr("minLines"));
    attrs.push(newAttr("minWidth"));
    attrs.push(newAttr("nestedScrollingEnabled"));
    attrs.push(newAttr("nextFocusDown"));
    attrs.push(newAttr("nextFocusForward"));
    attrs.push(newAttr("nextFocusLeft"));
    attrs.push(newAttr("nextFocusRight"));
    attrs.push(newAttr("nextFocusUp"));
    attrs.push(newAttr("numeric"));
    attrs.push(newAttr("onClick"));
    attrs.push(newAttr("outlineProvider"));
    attrs.push(newAttr("overScrollMode"));
    attrs.push(newAttr("padding"));
    attrs.push(newAttr("password"));
    attrs.push(newAttr("phoneNumber"));
    attrs.push(newAttr("privateImeOptions"));
    attrs.push(newAttr("requiresFadingEdge"));
    attrs.push(newAttr("rotation"));
    attrs.push(newAttr("rotationX"));
    attrs.push(newAttr("rotationY"));
    attrs.push(newAttr("saveEnabled"));
    attrs.push(newAttr("scaleX"));
    attrs.push(newAttr("scaleY"));
    attrs.push(newAttr("scrollHorizontally"));
    attrs.push(newAttr("scrollX"));
    attrs.push(newAttr("scrollY"));
    attrs.push(newAttr("scrollbarAlwaysDrawHorizontalTrack"));
    attrs.push(newAttr("scrollbarAlwaysDrawVerticalTrack"));
    attrs.push(newAttr("scrollbarDefaultDelayBeforeFade"));
    attrs.push(newAttr("scrollbarFadeDuration"));
    attrs.push(newAttr("scrollbarSize"));
    attrs.push(newAttr("scrollbarStyle"));
    attrs.push(newAttr("scrollbarThumbHorizontal"));
    attrs.push(newAttr("scrollbarThumbVertical"));
    attrs.push(newAttr("scrollbarTrackHorizontal"));
    attrs.push(newAttr("scrollbarTrackVertical"));
    attrs.push(newAttr("scrollbars"));
    attrs.push(newAttr("selectAllOnFocus"));
    attrs.push(newAttr("shadowColor"));
    attrs.push(newAttr("shadowDx"));
    attrs.push(newAttr("shadowDy"));
    attrs.push(newAttr("shadowRadius"));
    attrs.push(newAttr("singleLine"));
    attrs.push(newAttr("soundEffectsEnabled"));
    attrs.push(newAttr("stateListAnimator"));
    attrs.push(newAttr("style"));
    attrs.push(newAttr("tag"));
    attrs.push(newAttr("targetApi"));
    attrs.push(newAttr("text"));
    attrs.push(newAttr("textAlignment"));
    attrs.push(newAttr("textAllCaps"));
    attrs.push(newAttr("textColor"));
    attrs.push(newAttr("textColorHighlight"));
    attrs.push(newAttr("textColorHint"));
    attrs.push(newAttr("textColorLink"));
    attrs.push(newAttr("textCursorDrawable"));
    attrs.push(newAttr("textDirection"));
    attrs.push(newAttr("textIsSelectable"));
    attrs.push(newAttr("textScaleX"));
    attrs.push(newAttr("textSize"));
    attrs.push(newAttr("textStyle"));
    attrs.push(newAttr("theme"));
    attrs.push(newAttr("transformPivotX"));
    attrs.push(newAttr("transformPivotY"));
    attrs.push(newAttr("transitionName"));
    attrs.push(newAttr("translationX"));
    attrs.push(newAttr("translationY"));
    attrs.push(newAttr("translationZ"));
    attrs.push(newAttr("verticalScrollbarPosition"));
    attrs.push(newAttr("visibility"));
    return attrs;
}

function getSpecialAttrs(name) {
    let attrs = [];
    if (name === "text") {
        attrs.push(newAttr("text"));
        attrs.push(newAttr("textSize"));
        attrs.push(newAttr("textColor"));
        attrs.push(newAttr("textStyle"));
        attrs.push(newAttr("lines"));
        attrs.push(newAttr("maxLines"));
        attrs.push(newAttr("typeface"));
        attrs.push(newAttr("ellipsize"));
        attrs.push(newAttr("ems"));
        attrs.push(newAttr("autoLink"));
    } else if (name === "input") {
        attrs.push(newAttr("text"));
        attrs.push(newAttr("textSize"));
        attrs.push(newAttr("textColor"));
        attrs.push(newAttr("hint"));
        attrs.push(newAttr("textColorHint"));
        attrs.push(newAttr("textSizeHint"));
        attrs.push(newAttr("inputType"));
        attrs.push(newAttr("password"));
        attrs.push(newAttr("numeric"));
        attrs.push(newAttr("phoneNumber"));
        attrs.push(newAttr("digits"));
        attrs.push(newAttr("singleLine"));
    } else if (name === "button") {
        attrs.push(newAttr("text"));
        attrs.push(newAttr("textSize"));
        attrs.push(newAttr("textColor"));
    } else if (name === "img") {
        attrs.push(newAttr("src"));
        attrs.push(newAttr("tint"));
        attrs.push(newAttr("scaleType"));
        attrs.push(newAttr("radius"));
        attrs.push(newAttr("radiusTopLeft"));
        attrs.push(newAttr("radiusTopRight"));
        attrs.push(newAttr("radiusBottomLeft"));
        attrs.push(newAttr("radiusBottomRight"));
        attrs.push(newAttr("borderWidth"));
        attrs.push(newAttr("borderColor"));
        attrs.push(newAttr("circle"));
    } else if (name === "vertical") {
        attrs.push(newAttr("layout_weight"));
    } else if (name === "horizontal") {
        attrs.push(newAttr("layout_weight"));
    } else if (name === "spinner") {
        attrs.push(newAttr("entries"));
        attrs.push(newAttr("spinnerMode"));
    } else if (name === "progressbar") {
        attrs.push(newAttr("progress"));
        attrs.push(newAttr("indeterminate"));
    }
    return attrs
}

function newAttr(name,value) {
    value = value || "";
    return {name:name,value:value,inputs:[]}
}

function findOpt(name) {
    let opts = document.getElementsByTagName("Attr");
    for (let i = 0; i < opts.length; i++) {
        if(opts[i].getAttribute("name")===name){
            let res = "";
            let dos = opts[i].getElementsByTagName("opt");
            for (let j = 0; j < dos.length; j++) {
                if (j!=0){
                    res += "|";
                }
                res += dos[j].getAttribute("value");
            }
            return res;
        }
    }
    return "null";
}
