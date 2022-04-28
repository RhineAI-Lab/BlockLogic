import { JavaScript } from '../../_common';

JavaScript['var_function_wc'] = function (block: any) {
  const stat = JavaScript.statementToCode(block, 'STAT');
  const code = 'function(){\n' + stat + '}';
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['var_function'] = function (block: { itemCount_: number }) {
  const stat = JavaScript.statementToCode(block, 'STAT');
  const elements = new Array(block.itemCount_);
  for (let i = 0; i < block.itemCount_; i++) {
    elements[i] = JavaScript.valueToCode(
      block,
      'ADD' + i,
      JavaScript.ORDER_ATOMIC,
      true,
    );
  }
  const code = 'function(' + elements.join(',') + '){\n' + stat + '}';
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['var_function_return'] = function (block: any) {
  const name_value = JavaScript.valueToCode(
    block,
    'VALUE',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = 'return ' + name_value + ';\n';
  return code;
};
