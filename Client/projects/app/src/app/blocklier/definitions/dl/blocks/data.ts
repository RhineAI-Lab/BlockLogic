import * as Blockly from 'blockly';

const style = 'loop_blocks';

Blockly.defineBlocksWithJsonArray([
  {
    type: 'data_for_dataloader',
    previousStatement: null,
    nextStatement: null,
    style: style,
    helpUrl: '',
    tooltip: '遍历数据集并把输出内容拆分赋值给变量，同时切换设备。',
    mutator: 'data_for_dataloader_mutator',
  },
  {
    type: 'data_for_dataloader_container',
    message0: '数据集 %1 %2',
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
    type: 'data_for_dataloader_item',
    message0: '数据',
    previousStatement: null,
    nextStatement: null,
    style: style,
    tooltip: '数据集中参数个数',
    enableContextMenu: false,
  },
]);

const DATA_FOR_DATALOADER_MUTATOR_MIXIN = {
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
    const containerBlock = workspace.newBlock('data_for_dataloader_container');
    containerBlock.initSvg();
    let connection = containerBlock.getInput('STACK').connection;
    for (let i = 0; i < this.itemCount_; i++) {
      const itemBlock = workspace.newBlock('data_for_dataloader_item');
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
        const input = this.appendValueInput('ADD' + i).setCheck(null);
        if (i == 0) {
          input
            .appendField('遍历')
            .appendField(
              new Blockly.FieldVariable(
                'train_loader',
                undefined,
                ['DataLoader'],
                'DataLoader',
              ),
              'DATA_LOADER',
            )
            .appendField(' [设备')
            .appendField(
              new Blockly.FieldVariable(
                'device',
                undefined,
                ['Device'],
                'Device',
              ),
              'DEVICE',
            )
            .appendField('] 至');
        }
      }
    }
    if (this.getInput('STAT')) {
      this.removeInput('STAT');
    }
    this.appendStatementInput('STAT');
    // Remove deleted inputs.
    while (this.getInput('ADD' + i)) {
      this.removeInput('ADD' + i);
      i++;
    }
  },
};

const DATA_FOR_DATALOADER_EXTENSION = function (this: any) {
  // Add the quote mixin for the itemCount_ = 0 case.
  // Initialize the mutator values.
  this.itemCount_ = 2;
  this.updateShape_();
  // Configure the mutator UI.
  this.setMutator(new Blockly.Mutator(['data_for_dataloader_item']));
};

Blockly.Extensions.registerMutator(
  'data_for_dataloader_mutator',
  DATA_FOR_DATALOADER_MUTATOR_MIXIN,
  DATA_FOR_DATALOADER_EXTENSION,
);
