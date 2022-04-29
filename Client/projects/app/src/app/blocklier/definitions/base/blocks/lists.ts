import * as Blockly from 'blockly';

const style = 'list_blocks';
const baseHelpUrl = '';

Blockly.defineBlocksWithJsonArray([
  {
    type: 'lists_new_coll',
    message0: '创建新 %1 ',
    args0: [
      {
        type: 'field_dropdown',
        name: 'MODE',
        options: [
          ['列表', 'list'],
          ['字典', 'Map'],
          ['元组', 'Tuple'],
        ],
      },
    ],
    inputsInline: true,
    output: ['Array', 'Map', 'Tuple'],
    style: style,
    tooltip: '创建新列表、字典、元组',
    helpUrl: baseHelpUrl + '',
  },
  {
    type: 'lists_dict_new_coll',
    message0: '创建字典',
    output: 'Map',
    style: style,
    helpUrl: '',
    tooltip: '设置多个初始值',
    mutator: 'lists_dict_new_coll_mutator',
  },
  {
    type: 'lists_dict_new_coll_container',
    message0: '字典 %1 %2',
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
    tooltip: '放所需数量的块至内部',
    enableContextMenu: false,
  },
  {
    type: 'lists_dict_new_coll_item',
    message0: '键值对',
    previousStatement: null,
    nextStatement: null,
    style: style,
    tooltip: '键值对',
    enableContextMenu: false,
  },
]);

const LISTS_DICT_NEW_COLL_MUTATOR_MIXIN = {
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
    const containerBlock = workspace.newBlock('lists_dict_new_coll_container');
    containerBlock.initSvg();
    let connection = containerBlock.getInput('STACK').connection;
    for (let i = 0; i < this.itemCount_; i++) {
      const itemBlock = workspace.newBlock('lists_dict_new_coll_item');
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
    // TODO: 无法缓存key参数
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
        const input = this.appendValueInput('ADD' + i)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField('键:')
          .appendField(new Blockly.FieldTextInput('key' + i), 'KEY' + i)
          .appendField(' 值:');
      }
    }
    // Remove deleted inputs.
    while (this.getInput('ADD' + i)) {
      this.removeInput('ADD' + i);
      i++;
    }
  },
};

const LISTS_DICT_NEW_COLL_EXTENSION = function (this: any) {
  // Add the quote mixin for the itemCount_ = 0 case.
  // Initialize the mutator values.
  this.itemCount_ = 2;
  this.updateShape_();
  // Configure the mutator UI.
  this.setMutator(new Blockly.Mutator(['lists_dict_new_coll_item']));
};

Blockly.Extensions.registerMutator(
  'lists_dict_new_coll_mutator',
  LISTS_DICT_NEW_COLL_MUTATOR_MIXIN,
  LISTS_DICT_NEW_COLL_EXTENSION,
);
