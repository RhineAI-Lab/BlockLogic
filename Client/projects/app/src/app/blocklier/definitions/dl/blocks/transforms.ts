import * as Blockly from 'blockly';

const style = 'transforms_blocks';
const baseHelpUrl = '';

Blockly.defineBlocksWithJsonArray([
  {
    type: 'transforms_get',
    message0: '%1',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: 'trans',
        variableTypes: ['Transforms'],
        defaultType: 'Transforms',
      },
    ],
    style: style,
    output: 'Transforms',
  },
  {
    type: 'transforms_set',
    message0: '设置 %1 为  %2',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: 'trans',
        variableTypes: ['Transforms'],
        defaultType: 'Transforms',
      },
      {
        type: 'input_value',
        name: 'VALUE',
        check: 'Transforms',
      },
    ],
    style: style,
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'transforms_call',
    message0: '调用 %1 %2',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: 'trans',
        variableTypes: ['Transforms'],
        defaultType: 'Transforms',
      },
      {
        type: 'input_value',
        name: 'INPUT',
        check: ['Tensor', 'Numpy'],
      },
    ],
    style: style,
    output: ['Tensor', 'Numpy'],
  },
  {
    type: 'transforms_compose',
    message0: '进行 %1 变换',
    args0: [{ type: 'input_value', name: 'LIST', check: 'Array' }],
    inputsInline: true,
    output: 'Transforms',
    style: style,
    tooltip: '结合不同的变换',
    helpUrl: baseHelpUrl + '',
  },
  {
    type: 'transforms_toTensor',
    message0: '转换为张量',
    args0: [],
    output: 'Transforms',
    style: style,
    tooltip: '将图像或者ndarray转换为张量',
    helpUrl: baseHelpUrl + '',
  },
  {
    type: 'transforms_toPILImage',
    message0: '转换为图像',
    args0: [],
    output: 'Transforms',
    style: style,
    tooltip: '将张量转换为图像',
    helpUrl: baseHelpUrl + '',
  },
  {
    type: 'transforms_compose',
    output: 'Transforms',
    style: style,
    helpUrl: '',
    tooltip: '连接多个变换。',
    mutator: 'transforms_compose_mutator',
  },
  {
    type: 'transforms_compose_container',
    message0: '连接容器 %1 %2',
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
    type: 'transforms_compose_item',
    message0: '变换',
    previousStatement: null,
    nextStatement: null,
    style: style,
    tooltip: '单个变换',
    enableContextMenu: false,
  },
]);

const TRANSFORMS_COMPOSE_MUTATOR_MIXIN = {
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
    const containerBlock = workspace.newBlock('transforms_compose_container');
    containerBlock.initSvg();
    let connection = containerBlock.getInput('STACK').connection;
    for (let i = 0; i < this.itemCount_; i++) {
      const itemBlock = workspace.newBlock('transforms_compose_item');
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
        const input = this.appendValueInput('ADD' + i).setCheck('Transforms');
        if (i == 0) {
          input.appendField('连接变换');
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

const TRANSFORMS_COMPOSE_EXTENSION = function (this: any) {
  // Add the quote mixin for the itemCount_ = 0 case.
  // Initialize the mutator values.
  this.itemCount_ = 2;
  this.updateShape_();
  // Configure the mutator UI.
  this.setMutator(new Blockly.Mutator(['transforms_compose_item']));
};

Blockly.Extensions.registerMutator(
  'transforms_compose_mutator',
  TRANSFORMS_COMPOSE_MUTATOR_MIXIN,
  TRANSFORMS_COMPOSE_EXTENSION,
);
