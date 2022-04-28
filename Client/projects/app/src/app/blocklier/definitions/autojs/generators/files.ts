import { JavaScript } from '../../_common';

JavaScript['files_is_file'] = function (block: any) {
  const path_value = JavaScript.valueToCode(
    block,
    'PATH',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  return ['files.isFile(' + path_value + ')', JavaScript.ORDER_ATOMIC];
};

JavaScript['files_is_dir'] = function (block: any) {
  const path_value = JavaScript.valueToCode(
    block,
    'PATH',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  return ['files.isDir(' + path_value + ')', JavaScript.ORDER_ATOMIC];
};

JavaScript['files_is_empty_dir_path'] = function (block: any) {
  const path_value = JavaScript.valueToCode(
    block,
    'PATH',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  return ['files.isEmptyDir(' + path_value + ')', JavaScript.ORDER_ATOMIC];
};

JavaScript['files_join'] = function (block: any) {
  const path_value = JavaScript.valueToCode(
    block,
    'PATH',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const value_value = JavaScript.valueToCode(
    block,
    'VALUE',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  return [
    'files.join(' + path_value + ',' + value_value + ')',
    JavaScript.ORDER_ATOMIC,
  ];
};

JavaScript['files_create_path'] = function (block: any) {
  const path_value = JavaScript.valueToCode(
    block,
    'PATH',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  return ['files.create(' + path_value + ')', JavaScript.ORDER_ATOMIC];
};

JavaScript['files_create_with_dirs_path'] = function (block: any) {
  const path_value = JavaScript.valueToCode(
    block,
    'PATH',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  return ['files.createWithDirs(' + path_value + ')', JavaScript.ORDER_ATOMIC];
};

JavaScript['files_exists_path'] = function (block: any) {
  const path_value = JavaScript.valueToCode(
    block,
    'PATH',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  return ['files.exists(' + path_value + ')', JavaScript.ORDER_ATOMIC];
};

JavaScript['files_ensure_dir_path'] = function (block: any) {
  const path_value = JavaScript.valueToCode(
    block,
    'PATH',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  return 'files.ensureDir(' + path_value + ');\n';
};

JavaScript['files_read_path'] = function (block: {
  getFieldValue: (arg0: string) => any;
}) {
  const path_value = JavaScript.valueToCode(
    block,
    'PATH',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const encoding_way = block.getFieldValue('WAY');
  return [
    'files.read(' + path_value + ',' + encoding_way + ');\n',
    JavaScript.ORDER_ATOMIC,
  ];
};

JavaScript['files_read_bytes_path'] = function (block: any) {
  const path_value = JavaScript.valueToCode(
    block,
    'PATH',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  return ['files.readBytes(' + path_value + ');\n', JavaScript.ORDER_ATOMIC];
};

JavaScript['files_write_path_text'] = function (block: {
  getFieldValue: (arg0: string) => any;
}) {
  const path_value = JavaScript.valueToCode(
    block,
    'PATH',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const text_value = JavaScript.valueToCode(
    block,
    'VALUE',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const encoding_way = block.getFieldValue('WAY');
  return (
    'files.write(' + path_value + ',' + text_value + ',' + encoding_way + ');\n'
  );
};

JavaScript['files_write_bytes_path_bytes'] = function (block: any) {
  const path_value = JavaScript.valueToCode(
    block,
    'PATH',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const text_value = JavaScript.valueToCode(
    block,
    'VALUE',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  return 'files.writeBytes(' + path_value + ',' + text_value + ');\n';
};

JavaScript['files_append_path_text'] = function (block: {
  getFieldValue: (arg0: string) => any;
}) {
  const path_value = JavaScript.valueToCode(
    block,
    'PATH',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const text_value = JavaScript.valueToCode(
    block,
    'VALUE',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const encoding_way = block.getFieldValue('WAY');
  return (
    'files.append(' +
    path_value +
    ',' +
    text_value +
    ',' +
    encoding_way +
    ');\n'
  );
};

JavaScript['files_append_bytes_path'] = function (block: any) {
  const path_value = JavaScript.valueToCode(
    block,
    'PATH',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const text_value = JavaScript.valueToCode(
    block,
    'VALUE',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const encoding_way = block.getFieldValue('WAY');
  return (
    'files.appendBytes(' +
    path_value +
    ',' +
    text_value +
    ',' +
    encoding_way +
    ');\n'
  );
};

JavaScript['files_copy'] = function (block: any) {
  const path_value = JavaScript.valueToCode(
    block,
    'PATH',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const text_value = JavaScript.valueToCode(
    block,
    'VALUE',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  return [
    'files.copy(' + path_value + ',' + text_value + ')',
    JavaScript.ORDER_ATOMIC,
  ];
};

JavaScript['files_move'] = function (block: any) {
  const path_value = JavaScript.valueToCode(
    block,
    'PATH',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const text_value = JavaScript.valueToCode(
    block,
    'VALUE',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  return [
    'files.move(' + path_value + ',' + text_value + ')',
    JavaScript.ORDER_ATOMIC,
  ];
};

JavaScript['files_rename_path'] = function (block: any) {
  const path_value = JavaScript.valueToCode(
    block,
    'PATH',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const text_value = JavaScript.valueToCode(
    block,
    'VALUE',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  return [
    'files.rename(' + path_value + ',' + text_value + ')',
    JavaScript.ORDER_ATOMIC,
  ];
};

JavaScript['files_rename_without_extension_path'] = function (block: any) {
  const path_value = JavaScript.valueToCode(
    block,
    'PATH',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const text_value = JavaScript.valueToCode(
    block,
    'VALUE',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  return [
    'files.renameWithoutExtension(' + path_value + ',' + text_value + ')',
    JavaScript.ORDER_ATOMIC,
  ];
};

JavaScript['files_getname'] = function (block: any) {
  const path_value = JavaScript.valueToCode(
    block,
    'PATH',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  return ['files.getName(' + path_value + ')', JavaScript.ORDER_ATOMIC];
};

JavaScript['files_getname_without_extension'] = function (block: any) {
  const path_value = JavaScript.valueToCode(
    block,
    'PATH',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  return [
    'files.getNameWithoutExtension(' + path_value + ')',
    JavaScript.ORDER_ATOMIC,
  ];
};

JavaScript['files_get_extension'] = function (block: any) {
  const path_value = JavaScript.valueToCode(
    block,
    'PATH',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  return ['files.getExtension(' + path_value + ')', JavaScript.ORDER_ATOMIC];
};

JavaScript['files_remove'] = function (block: any) {
  const path_value = JavaScript.valueToCode(
    block,
    'PATH',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  return ['files.remove(' + path_value + ')', JavaScript.ORDER_ATOMIC];
};

JavaScript['files_remove_dir'] = function (block: any) {
  const path_value = JavaScript.valueToCode(
    block,
    'PATH',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  return ['files.removeDir(' + path_value + ')', JavaScript.ORDER_ATOMIC];
};

JavaScript['files_getsdcard_path'] = function (_block: any) {
  return ['files.getSdcardPath()', JavaScript.ORDER_ATOMIC];
};

JavaScript['files_cwd'] = function (_block: any) {
  return ['files.cwd()', JavaScript.ORDER_ATOMIC];
};

JavaScript['files_path_relative'] = function (block: any) {
  const path_value = JavaScript.valueToCode(
    block,
    'PATH',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  return ['files.path(' + path_value + ')', JavaScript.ORDER_ATOMIC];
};

JavaScript['files_list_dir'] = function (block: any) {
  const path_value = JavaScript.valueToCode(
    block,
    'PATH',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  const function_value = JavaScript.valueToCode(
    block,
    'VALUE',
    JavaScript.ORDER_ATOMIC,
    true,
  );
  return [
    '(' + path_value + ',' + (function_value ? ',' + function_value : '') + ')',
    JavaScript.ORDER_ATOMIC,
  ];
};
