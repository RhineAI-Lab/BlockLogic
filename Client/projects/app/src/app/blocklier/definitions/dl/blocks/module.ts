import * as Blockly from 'blockly';

const style = 'module_blocks';

Blockly.defineBlocksWithJsonArray([
  {
    type: 'modules_get',
    message0: '%1',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: 'net',
        variableTypes: ['Module'],
        defaultType: 'Module',
      },
    ],
    style: style,
    output: 'Module',
  },
  {
    type: 'modules_set',
    message0: '设置 %1 为  %2',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: 'net',
        variableTypes: ['Module'],
        defaultType: 'Module',
      },
      {
        type: 'input_value',
        name: 'VALUE',
        check: 'Module',
      },
    ],
    style: style,
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'modules_call',
    message0: '调用 %1 %2',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: 'net',
        variableTypes: ['Module'],
        defaultType: 'Module',
      },
      {
        type: 'input_value',
        name: 'INPUT',
        check: 'Tensor',
      },
    ],
    style: style,
    output: 'Tensor',
  },
  {
    type: 'modules_define',
    message0: '定义模型 %1 %2 %3 调用:    输入 %4 %5 返回 %6',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: 'net',
        variableTypes: ['Module'],
        defaultType: 'Module',
      },
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'INIT',
        align: 'RIGHT',
      },
      {
        type: 'input_value',
        name: 'INPUT',
        check: 'Tensor',
        align: 'RIGHT',
      },
      {
        type: 'input_statement',
        name: 'FORWARD',
        align: 'RIGHT',
      },
      {
        type: 'input_value',
        name: 'OUTPUT',
        check: 'Tensor',
        align: 'RIGHT',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    style: style,
    tooltip: '',
    helpUrl: '',
  },
  {
    type: 'modules_sequential',
    output: 'Module',
    style: style,
    helpUrl: '',
    tooltip:
      '创建顺序模型，会将输入变量按顺序输入网络层进行计算，并返回计算结果。',
    mutator: 'modules_sequential_mutator',
  },
  {
    type: 'modules_sequential_container',
    message0: '顺序模型 %1 %2',
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
    type: 'modules_sequential_item',
    message0: '模型层',
    previousStatement: null,
    nextStatement: null,
    style: style,
    tooltip: '模型层',
    enableContextMenu: false,
  },
]);

const MODULES_SEQUENTIAL_MUTATOR_MIXIN = {
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
    const containerBlock = workspace.newBlock('modules_sequential_container');
    containerBlock.initSvg();
    let connection = containerBlock.getInput('STACK').connection;
    for (let i = 0; i < this.itemCount_; i++) {
      const itemBlock = workspace.newBlock('modules_sequential_item');
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
        const input = this.appendValueInput('ADD' + i).setCheck('Module');
        if (i == 0) {
          input.appendField('顺序模型');
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

const MODULES_SEQUENTIAL_EXTENSION = function (this: any) {
  // Add the quote mixin for the itemCount_ = 0 case.
  // Initialize the mutator values.
  this.itemCount_ = 2;
  this.updateShape_();
  // Configure the mutator UI.
  this.setMutator(new Blockly.Mutator(['modules_sequential_item']));
};

Blockly.Extensions.registerMutator(
  'modules_sequential_mutator',
  MODULES_SEQUENTIAL_MUTATOR_MIXIN,
  MODULES_SEQUENTIAL_EXTENSION,
);
