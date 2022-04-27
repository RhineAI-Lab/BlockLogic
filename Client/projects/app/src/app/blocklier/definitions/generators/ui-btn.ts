import { JavaScript } from './_common';

JavaScript['ui_btn_on_click'] = function (block: {
  getFieldValue: (arg0: string) => any;
}) {
  const id_value = block.getFieldValue('ID');
  const stat_value = JavaScript.statementToCode(
    block,
    'STAT',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const code = '$ui.' + id_value + '.on("click",()=>{\n' + stat_value + '});\n';
  return code;
};
