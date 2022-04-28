import { JavaScript } from '../../_common';

JavaScript['ui_text_set_text'] = function (block: {
  getFieldValue: (arg0: string) => any;
}) {
  const id_value = block.getFieldValue('ID');
  const text_value = JavaScript.valueToCode(
    block,
    'TEXT',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = '$ui.' + id_value + '.setText(' + text_value + ');\n';
  return code;
};
