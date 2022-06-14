import * as Blockly from 'blockly';

const style = 'var_function_blocks';

Blockly.defineBlocksWithJsonArray([
  {
    type: 'var_function_wc',
    message0: '无参函数 %1 %2',
    args0: [{ type: 'input_dummy' }, { type: 'input_statement', name: 'STAT' }],
    style: style,
    output: 'Function',
    tooltip: '无参函数',
    helpUrl: '',
  },
  {
    type: 'var_function',
    message0: '有参函数',
    style: style,
    output: 'Function',
    tooltip: '有参函数，填写对应数量的输入变量用于函数输入',
    helpUrl: '',
    mutator: 'var_function_join_mutator',
  },
  {
    type: 'inputs_join_container',
    message0: '输入变量 %1 %2',
    args0: [
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'STACK',
      },
    ],
    style: style,
    tooltip: '输入变量。',
  },
  {
    type: 'inputs_join_item',
    message0: '变量',
    previousStatement: null,
    nextStatement: null,
    style: style,
    tooltip: '变量。',
  },
  {
    type: 'var_function_return',
    message0: '返回 %1 ',
    previousStatement: null,
    args0: [{ type: 'input_value', name: 'VALUE', check: null }],
    style: style,
    tooltip: '函数返回。',
  },
]);

const VAR_FUNCTION_JOIN_MUTATOR_MIXIN = {
  mutationToDom: function (this: any) {
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  domToMutation: function (this: any, xmlElement: any) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_();
  },
  decompose: function (this: any, workspace: any) {
    const containerBlock = workspace.newBlock('inputs_join_container');
    containerBlock.initSvg();
    let connection = containerBlock.getInput('STACK').connection;
    for (let i = 0; i < this.itemCount_; i++) {
      const itemBlock = workspace.newBlock('inputs_join_item');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  compose: function (this: any, containerBlock: any) {
    let itemBlock = containerBlock.getInputTargetBlock('STACK');
    // Count number of inputs.
    const connections = [];
    while (itemBlock && !itemBlock.isInsertionMarker()) {
      connections.push(itemBlock.valueConnection_);
      itemBlock =
        itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
    }
    // Disconnect any children that don't belong.
    for (let i = 0; i < this.itemCount_; i++) {
      const connection = this.getInput('ADD' + i).connection.targetConnection;
      if (connection && connections.indexOf(connection) === -1) {
        connection.disconnect();
      }
    }
    this.itemCount_ = connections.length;
    this.updateShape_();
    // Reconnect any child blocks.
    for (let i = 0; i < this.itemCount_; i++) {
      Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i);
    }
  },
  saveConnections: function (this: any, containerBlock: any) {
    let itemBlock = containerBlock.getInputTargetBlock('STACK');
    let i = 0;
    while (itemBlock) {
      const input = this.getInput('ADD' + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock =
        itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
    }
  },
  updateShape_: function (this: any) {
    if (this.getInput('STAT')) {
      this.removeInput('STAT');
    }
    if (this.itemCount_ && this.getInput('EMPTY')) {
      this.removeInput('EMPTY');
    } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
      this.appendDummyInput('EMPTY')
        .appendField(this.newQuote_(true))
        .appendField(this.newQuote_(false));
    }
    // Add new inputs.
    let i;
    for (i = 0; i < this.itemCount_; i++) {
      if (!this.getInput('ADD' + i)) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const input = this.appendValueInput('ADD' + i).setAlign(
          Blockly.ALIGN_RIGHT,
        );
      }
    }
    // Remove deleted inputs.
    while (this.getInput('ADD' + i)) {
      this.removeInput('ADD' + i);
      i++;
    }
    this.appendStatementInput('STAT');
  },
};

const VAR_FUNCTION_JOIN_EXTENSION = function (this: any) {
  // Add the quote mixin for the itemCount_ = 0 case.
  // Initialize the mutator values.
  this.itemCount_ = 1;
  this.updateShape_();
  // Configure the mutator UI.
  this.setMutator(new Blockly.Mutator(['inputs_join_item']));
};

Blockly.Extensions.registerMutator(
  'var_function_join_mutator',
  VAR_FUNCTION_JOIN_MUTATOR_MIXIN,
  VAR_FUNCTION_JOIN_EXTENSION,
);
