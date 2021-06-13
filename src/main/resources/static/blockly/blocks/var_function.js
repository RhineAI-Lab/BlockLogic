'use strict';

goog.provide('Blockly.Blocks.VarFunction');  // Deprecated
goog.provide('Blockly.Constants.VarFunction');

goog.require('Blockly');
goog.require('Blockly.Blocks');
goog.require('Blockly.FieldDropdown');
goog.require('Blockly.FieldLabel');
goog.require('Blockly.Mutator');

var colour = "#0eaf9e";

Blockly.defineBlocksWithJsonArray([
    {
        "type": "var_function_wc",
        "message0": "无参函数 %1 %2",
        "args0": [{
            "type": "input_dummy"
        }, {
            "type": "input_statement",
            "name": "STAT"
        }],
        "colour": colour,
        "output": "Function",
        "tooltip": "无参函数",
        "helpUrl": "",
    }, {
        "type": "var_function",
        "message0": "有参函数",
        "colour": colour,
        "output": "Function",
        "tooltip": "有参函数，填写对应数量的输入变量用于函数输入",
        "helpUrl": "",
        "mutator": "var_function_join_mutator"
    }, {
        "type": "inputs_join_container",
        "message0": "输入变量 %1 %2",
        "args0": [{
            "type": "input_dummy"
        }, {
            "type": "input_statement",
            "name": "STACK"
        }],
        "colour": colour,
        "tooltip": "输入变量。",
    }, {
        "type": "inputs_join_item",
        "message0": "变量",
        "previousStatement": null,
        "nextStatement": null,
        "colour": colour,
        "tooltip": "变量。",
    }, {
        "type": "var_function_return",
        "message0": "返回 %1 ",
        "previousStatement": null,
        "args0":[
            {"type":"input_value","name":"VALUE","check":null},
        ],
        "colour": colour,
        "tooltip": "函数返回。",
    }
]);


Blockly.Constants.VarFunction.VAR_FUNCTION_JOIN_MUTATOR_MIXIN = {
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
        var containerBlock = workspace.newBlock('inputs_join_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
            var itemBlock = workspace.newBlock('inputs_join_item');
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
            if (connection && connections.indexOf(connection) === -1) {
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
        if(this.getInput("STAT")){
            this.removeInput("STAT");
        }
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
        this.appendStatementInput("STAT")
    }
};

Blockly.Constants.VarFunction.VAR_FUNCTION_JOIN_EXTENSION = function() {
    // Add the quote mixin for the itemCount_ = 0 case.
    // Initialize the mutator values.
    this.itemCount_ = 1;
    this.updateShape_();
    // Configure the mutator UI.
    this.setMutator(new Blockly.Mutator(['inputs_join_item']));
};

Blockly.Extensions.registerMutator('var_function_join_mutator',
    Blockly.Constants.VarFunction.VAR_FUNCTION_JOIN_MUTATOR_MIXIN,
    Blockly.Constants.VarFunction.VAR_FUNCTION_JOIN_EXTENSION);
