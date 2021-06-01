'use strict';

goog.provide('Blockly.Blocks.Widget');  // Deprecated
goog.provide('Blockly.Constants.Widget');

goog.require('Blockly');
goog.require('Blockly.Blocks');
goog.require('Blockly.FieldDropdown');
goog.require('Blockly.FieldLabel');
goog.require('Blockly.Mutator');

var colour = "#2196F3";
var baseHelpUrl = "https://pro.autojs.org/docs/#/zh-cn/widgetsBasedAutomation?id=";

Blockly.defineBlocksWithJsonArray([
    {
        "type": "widget_attr_selector",
        "message0": "筛选控件  属性 %1   匹配 %2   内容 %3",
        "args0": [
            {"type": "field_dropdown", "name": "ATTR", "options": [["ID", "id"], ["文本", "text"], ["描述", "desc"], ["类名", "className"], ["包名", "packageName"]]},
            {"type": "field_dropdown", "name": "WAY", "options": [["相同", ""], ["包含", "Contains"], ["以开头", "StartsWith"], ["以结尾", "EndsWith"], ["正则", "Matches"]]},
            {"type": "input_value", "name": "VALUE", "check": "String"}
        ],
        "output": "UiSelector",
        "colour": colour,
        "tooltip": "控件筛选器，多个之间可串联",
        "helpUrl": baseHelpUrl+"uiselectortextstr"
    },{
        "type": "widget_status_selector",
        "message0": "筛选控件  状态 %1  值 %2",
        "args0": [
            {"type": "field_dropdown", "name": "ATTR", "options": [["可点击", "clickable"], ["可长按", "longClickable"], ["可勾选", "checkable"], ["已选中", "selected"], ["已启用", "enabled"], ["可编辑", "editable"], ["可滑动", "scrollable"], ["是否多行显示", "multiLine"]]},
            {"type": "field_dropdown", "name": "VALUE", "options": [["对", "true"], ["错", "false"]]},
        ],
        "output": "UiSelector",
        "colour": colour,
        "tooltip": "控件筛选器，多个之间可串联",
        "helpUrl": baseHelpUrl+"uiselectortextstr"
    },{
        "type": "widget_find_one",
        "message0": "重复至找到符合的控件 %1",
        "args0": [{"type": "input_value", "name": "SELECTOR", "check": "UiSelector"}],
        "output": "UiObject",
        "colour": colour,
        "tooltip": "重复查找控件，直到找到，返回一个控件",
        "helpUrl": baseHelpUrl+"uiselectorfindone"
    },{
        "type": "widget_find_once",
        "message0": "查找当前符合的一个控件 %1",
        "args0": [{"type": "input_value", "name": "SELECTOR", "check": "UiSelector"}],
        "output": "UiObject",
        "colour": colour,
        "tooltip": "查找当前符合的一个控件，没有则返回空",
        "helpUrl": baseHelpUrl+"uiselectorfindone"
    },{
        "type": "widget_exists",
        "message0": "是否存在控件 %1",
        "args0": [{"type": "input_value", "name": "SELECTOR", "check": "UiSelector"}],
        "output": "Boolean",
        "colour": colour,
        "tooltip": "查找当前是否有符合条件的控件",
        "helpUrl": baseHelpUrl+"uiselectorexists"
    },{
        "type": "widget_wait",
        "message0": "等待出现控件 %1",
        "args0": [{"type": "input_value", "name": "SELECTOR", "check": "UiSelector"}],
        "previousStatement": null,
        "nextStatement": null,
        "colour": colour,
        "tooltip": "等待符合的控件出现",
        "helpUrl": baseHelpUrl+"uiselectorwaitfor"
    },{
        "type": "widget_until_find",
        "message0": "重复至找到符合的所有控件 %1",
        "args0": [{"type": "input_value", "name": "SELECTOR", "check": "UiSelector"}],
        "output": ["UiCollection","Array"],
        "colour": colour,
        "tooltip": "重复查找控件，直到找到，返回全部控件",
        "helpUrl": baseHelpUrl+"uiselectoruntilfind"
    },{
        "type": "widget_find",
        "message0": "查找当前符合的所有控件 %1",
        "args0": [{"type": "input_value", "name": "SELECTOR", "check": "UiSelector"}],
        "output": ["UiCollection","Array"],
        "colour": colour,
        "tooltip": "查找当前符合的全部控件，没有则返回空集合",
        "helpUrl": baseHelpUrl+"uiselectorfind"
    },{
        "type": "widget_operate",
        "message0": "操作 %1   控件: %2",
        "args0": [
            {"type": "field_dropdown", "name": "METH", "options": [["点击", "click"], ["长按", "longClick"], ["选中", "select"], ["复制", "copy"], ["剪切", "cut"], ["粘贴", "paste"], ["向前滑", "scrollForward"], ["向后滑", "scrollBackward"], ["向上滑", "scrollUp"], ["向下滑", "scrollDown"], ["向左滑", "scrollLeft"], ["向右滑", "scrollRight"], ["折叠", "collapse"], ["展开", "expand"], ["显示", "show"]]},
            {"type": "input_value", "name": "WIDGET", "check": "UiObject"}
        ],
        "output": "Boolean",
        "colour": colour,
        "tooltip": "对控件进行操作，返回是否成功",
        "helpUrl": baseHelpUrl+"uiobjectclick"
    },{
        "type": "widget_get_attr",
        "message0": "获取 %1   控件: %2",
        "args0": [
            {"type": "field_dropdown", "name": "METH", "options": [["子元素个数", "childCount"], ["边框", "bounds"], ["父控件中的范围", "boundsInParent"], ["绘制次序", "drawingOrder"], ["ID", "id"], ["文本", "text"], ["描述", "desc"]]},
            {"type": "input_value", "name": "WIDGET", "check": "UiObject"}
        ],
        "output": null,
        "colour": colour,
        "tooltip": "获取控件属性",
        "helpUrl": baseHelpUrl+"uiobjectclickable"
    },{
        "type": "widget_parent",
        "message0": "获取父控件 %1",
        "args0": [
            {"type": "input_value", "name": "VALUE", "check": "UiObject"}
        ],
        "output": "UiObject",
        "colour": colour,
        "tooltip": "获取控件属性",
        "helpUrl": baseHelpUrl+"parent"
    },{
        "type": "widget_children",
        "message0": "获取子控件合集 %1",
        "args0": [
            {"type": "input_value", "name": "VALUE", "check": "UiObject"}
        ],
        "output": ["UiCollection","Array"],
        "colour": colour,
        "tooltip": "获取控件属性",
        "helpUrl": baseHelpUrl+"children"
    }, {
        "type": "widget_selectors_join",
        "message0": "多条件",
        "output": "UiSelector",
        "colour": colour,
        "helpUrl": "",
        "tooltip": "连接多个控件筛选条件",
        "mutator": "widget_selectors_join_mutator"
    }, {
        "type": "widget_selectors_join_container",
        "message0": "条件组 %1 %2",
        "args0": [{
            "type": "input_dummy"
        }, {
            "type": "input_statement",
            "name": "STACK"
        }],
        "colour": colour,
        "tooltip": "放所需数量的块至内部",
        "enableContextMenu": false
    }, {
        "type": "widget_selectors_join_item",
        "message0": "条件",
        "previousStatement": null,
        "nextStatement": null,
        "colour": colour,
        "tooltip": "条件",
        "enableContextMenu": false
    },{
        "type": "widget_set_text",
        "message0": "输入文本 控件: %1 文本: %2",
        "args0": [
            {"type": "input_value", "name": "WIDGET", "check": "UiObject"},
            {"type": "input_value", "name": "TEXT", "check": "String" ,"align": "RIGHT"}
        ],
        "output": "Boolean",
        "colour": colour,
        "tooltip": "设置控件文本",
        "helpUrl": baseHelpUrl+"uiobjectsettexttext"
    },{
        "type": "widget_algorithm",
        "message0": "%1 %2",lin
        "args0": [
            {"type": "field_dropdown", "name": "WAY", "options": [["深度搜索", "DFS"], ["广度搜索", "BFS"]]},
            {"type": "input_value", "name": "SELECTOR", "check": "UiSelector"}
        ],
        "output": "UiSelector",
        "colour": colour,
        "tooltip": "设置控件搜索算法",
        "helpUrl": baseHelpUrl+"uiselectoralgorithmalgorithm"
    }
]);


Blockly.Constants.Widget.WIDGET_SELECTORS_JOIN_MUTATOR_MIXIN = {
    mutationToDom: function() {
        var container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        return container;
    },
    domToMutation: function(xmlElement) {
        this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
        this.updateShape_();
    },
    decompose: function(workspace) {
        var containerBlock = workspace.newBlock('widget_selectors_join_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
            var itemBlock = workspace.newBlock('widget_selectors_join_item');
            itemBlock.initSvg();
            connection.connect(itemBlock.previousConnection);
            connection = itemBlock.nextConnection;
        }
        return containerBlock;
    },
    compose: function(containerBlock) {
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        // Count number of inputs.
        var connections = [];
        while (itemBlock && !itemBlock.isInsertionMarker()) {
            connections.push(itemBlock.valueConnection_);
            itemBlock = itemBlock.nextConnection &&
                itemBlock.nextConnection.targetBlock();
        }
        // Disconnect any children that don't belong.
        for (var i = 0; i < this.itemCount_; i++) {
            var connection = this.getInput('ADD' + i).connection.targetConnection;
            if (connection && connections.indexOf(connection) == -1) {
                connection.disconnect();
            }
        }
        this.itemCount_ = connections.length;
        this.updateShape_();
        // Reconnect any child blocks.
        for (var i = 0; i < this.itemCount_; i++) {
            Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i);
        }
    },
    saveConnections: function(containerBlock) {
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        var i = 0;
        while (itemBlock) {
            var input = this.getInput('ADD' + i);
            itemBlock.valueConnection_ = input && input.connection.targetConnection;
            i++;
            itemBlock = itemBlock.nextConnection &&
                itemBlock.nextConnection.targetBlock();
        }
    },
    updateShape_: function() {
        if (this.itemCount_ && this.getInput('EMPTY')) {
            this.removeInput('EMPTY');
        } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
            this.appendDummyInput('EMPTY')
                .appendField(this.newQuote_(true))
                .appendField(this.newQuote_(false));
        }
        // Add new inputs.
        for (var i = 0; i < this.itemCount_; i++) {
            if (!this.getInput('ADD' + i)) {
                var input = this.appendValueInput('ADD' + i).setAlign(Blockly.ALIGN_RIGHT);
            }
        }
        // Remove deleted inputs.
        while (this.getInput('ADD' + i)) {
            this.removeInput('ADD' + i);
            i++;
        }
    }
};

Blockly.Constants.Widget.WIDGET_SELECTORS_JOIN_EXTENSION = function() {
    // Add the quote mixin for the itemCount_ = 0 case.
    // Initialize the mutator values.
    this.itemCount_ = 2;
    this.updateShape_();
    // Configure the mutator UI.
    this.setMutator(new Blockly.Mutator(['widget_selectors_join_item']));
};

Blockly.Extensions.registerMutator('widget_selectors_join_mutator',
    Blockly.Constants.Widget.WIDGET_SELECTORS_JOIN_MUTATOR_MIXIN,
    Blockly.Constants.Widget.WIDGET_SELECTORS_JOIN_EXTENSION);
