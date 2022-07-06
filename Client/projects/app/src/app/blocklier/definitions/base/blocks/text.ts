import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
  {
    type: 'text_to_int',
    message0: '转整数 %1',
    args0: [{ type: 'input_value', name: 'STR', check: 'String' }],
    output: 'Number',
    style: 'text_blocks',
    tooltip: '将字符串转为整数。',
  },
  {
    type: 'text_to_float',
    message0: '转小数 %1',
    args0: [{ type: 'input_value', name: 'STR', check: 'String' }],
    output: 'Number',
    style: 'text_blocks',
    tooltip: '将字符串转为小数。',
  },
  {
    type: 'number_to_text',
    message0: '转文字 %1',
    args0: [{ type: 'input_value', name: 'NUM', check: 'Number' }],
    output: 'String',
    style: 'text_blocks',
    tooltip: '将数字转为字符串。',
  },
  {
    type: 'text_output_more',
    previousStatement: null,
    nextStatement: null,
    style: 'console_blocks',
    helpUrl: '',
    tooltip: '多信息输出。',
    mutator: 'output_more_mutator',
  },
  {
    type: 'text_output_more_container',
    message0: '输出 %1 %2',
    args0: [
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'STACK',
      },
    ],
    style: 'console_blocks',
    tooltip: '放所需数量的块至内部',
    enableContextMenu: false,
  },
  {
    type: 'text_output_more_item',
    message0: '信息',
    previousStatement: null,
    nextStatement: null,
    style: 'console_blocks',
    enableContextMenu: false,
  },
]);

const TEXT_OUTPUT_MORE_MUTATOR_MIXIN = {
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
    const containerBlock = workspace.newBlock('text_output_more_container');
    containerBlock.initSvg();
    let connection = containerBlock.getInput('STACK').connection;
    for (let i = 0; i < this.itemCount_; i++) {
      const itemBlock = workspace.newBlock('text_output_more_item');
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
    const keys = [];
    while (itemBlock && !itemBlock.isInsertionMarker()) {
      connections.push(itemBlock.valueConnection_);
      keys.push(itemBlock.valueKey);
      itemBlock =
        itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
    }
    // Disconnect any children that don't belong.
    for (let i = 0; i < this.itemCount_; i++) {
      const connection = this.getInput('ADD' + i).connection.targetConnection;
      if (connection && connections.indexOf(connection) == -1) {
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
      itemBlock.valueKey = this.getFieldValue('KEY' + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock =
        itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
    }
  },
  updateShape_: function (this: any) {
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
        const input = this.appendValueInput('ADD' + i);
        if (i == 0) {
          input.appendField('输出');
        }
      }
    }
    // Remove deleted inputs.
    while (this.getInput('ADD' + i)) {
      this.removeInput('ADD' + i);
      i++;
    }
  },
};

const TEXT_OUTPUT_MORE_EXTENSION = function (this: any) {
  // Add the quote mixin for the itemCount_ = 0 case.
  // Initialize the mutator values.
  this.itemCount_ = 1;
  this.updateShape_();
  // Configure the mutator UI.
  this.setMutator(new Blockly.Mutator(['text_output_more_item']));
};

Blockly.Extensions.registerMutator(
  'output_more_mutator',
  TEXT_OUTPUT_MORE_MUTATOR_MIXIN,
  TEXT_OUTPUT_MORE_EXTENSION,
);
