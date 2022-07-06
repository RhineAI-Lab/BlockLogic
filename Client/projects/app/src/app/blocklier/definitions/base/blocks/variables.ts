import * as Blockly from 'blockly';

const style = 'variable_blocks';

Blockly.defineBlocksWithJsonArray([
  {
    type: 'variables_split',
    previousStatement: null,
    nextStatement: null,
    style: style,
    helpUrl: '',
    tooltip: '将一个合并变量拆成多个。',
    mutator: 'variables_split_mutator',
  },
  {
    type: 'variables_split_container',
    message0: '变量列表',
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
    type: 'variables_split_item',
    message0: '变量',
    previousStatement: null,
    nextStatement: null,
    style: style,
    enableContextMenu: false,
  },
  {
    type: 'variables_get_number',
    message0: '%1',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: 'num',
        variableTypes: ['Number'],
        defaultType: 'Number',
      },
    ],
    style: 'math_blocks',
    output: 'Number',
  },
  {
    type: 'variables_set_number',
    message0: '赋值 %1 为  %2',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: 'num',
        variableTypes: ['Number'],
        defaultType: 'Number',
      },
      {
        type: 'input_value',
        name: 'VALUE',
        check: 'Number',
      },
    ],
    style: 'math_blocks',
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'variables_add_number',
    message0: '将 %1 增加 %2',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: 'num',
        variableTypes: ['Number'],
        defaultType: 'Number',
      },
      {
        type: 'input_value',
        name: 'VALUE',
        check: 'Number',
      },
    ],
    style: 'math_blocks',
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'variables_get_string',
    message0: '%1',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: 'str',
        variableTypes: ['String'],
        defaultType: 'String',
      },
    ],
    style: 'text_blocks',
    output: 'String',
  },
  {
    type: 'variables_set_string',
    message0: '赋值 %1 为  %2',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: 'str',
        variableTypes: ['String'],
        defaultType: 'String',
      },
      {
        type: 'input_value',
        name: 'VALUE',
        check: 'String',
      },
    ],
    style: 'text_blocks',
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'variables_add_string',
    message0: '在 %1 后追加 %2',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: 'str',
        variableTypes: ['String'],
        defaultType: 'String',
      },
      {
        type: 'input_value',
        name: 'VALUE',
        check: 'String',
      },
    ],
    style: 'text_blocks',
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: 'variables_get_boolean',
    message0: '%1',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: 'boo',
        variableTypes: ['Boolean'],
        defaultType: 'Boolean',
      },
    ],
    style: 'logic_blocks',
    output: 'Boolean',
  },
  {
    type: 'variables_set_boolean',
    message0: '赋值 %1 为  %2',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: 'boo',
        variableTypes: ['Boolean'],
        defaultType: 'Boolean',
      },
      {
        type: 'input_value',
        name: 'VALUE',
        check: 'Boolean',
      },
    ],
    style: 'logic_blocks',
    previousStatement: null,
    nextStatement: null,
  },
]);

const VARIABLES_SPLIT_MUTATOR_MIXIN = {
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
    const containerBlock = workspace.newBlock('variables_split_container');
    containerBlock.initSvg();
    let connection = containerBlock.getInput('STACK').connection;
    for (let i = 0; i < this.itemCount_; i++) {
      const itemBlock = workspace.newBlock('variables_split_item');
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
          input.appendField('拆分变量');
          input.appendField(new Blockly.FieldVariable('a'), 'VAR');
          input.appendField('至');
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

const VARIABLES_SPLIT_EXTENSION = function (this: any) {
  // Add the quote mixin for the itemCount_ = 0 case.
  // Initialize the mutator values.
  this.itemCount_ = 2;
  this.updateShape_();
  // Configure the mutator UI.
  this.setMutator(new Blockly.Mutator(['variables_split_item']));
};

Blockly.Extensions.registerMutator(
  'variables_split_mutator',
  VARIABLES_SPLIT_MUTATOR_MIXIN,
  VARIABLES_SPLIT_EXTENSION,
);
