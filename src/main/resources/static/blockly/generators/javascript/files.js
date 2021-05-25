'use strict';

goog.provide('Blockly.JavaScript.files');
goog.require('Blockly.JavaScript');

Blockly.JavaScript['files_is_file'] = function (block) {
    var path_value = Blockly.JavaScript.valueToCode(block, 'PATH', Blockly.JavaScript.ORDER_ATOMIC, true);
    return ['files.isFile(' + path_value + ')', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['files_is_dir'] = function (block) {
    var path_value = Blockly.JavaScript.valueToCode(block, 'PATH', Blockly.JavaScript.ORDER_ATOMIC, true);
    return ['files.isDir(' + path_value + ')', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['files_is_empty_dir_path'] = function (block) {
    var path_value = Blockly.JavaScript.valueToCode(block, 'PATH', Blockly.JavaScript.ORDER_ATOMIC, true);
    return ['files.isEmptyDir(' + path_value + ')', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['files_join'] = function (block) {
    var path_value = Blockly.JavaScript.valueToCode(block, 'PATH', Blockly.JavaScript.ORDER_ATOMIC, true);
    var value_value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC, true);
    return ['files.join(' + path_value + ',' + value_value + ')', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['files_create_path'] = function (block) {
    var path_value = Blockly.JavaScript.valueToCode(block, 'PATH', Blockly.JavaScript.ORDER_ATOMIC, true);
    return ['files.create(' + path_value + ')', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['files_create_with_dirs_path'] = function (block) {
    var path_value = Blockly.JavaScript.valueToCode(block, 'PATH', Blockly.JavaScript.ORDER_ATOMIC, true);
    return ['files.createWithDirs(' + path_value + ')', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['files_exists_path'] = function (block) {
    var path_value = Blockly.JavaScript.valueToCode(block, 'PATH', Blockly.JavaScript.ORDER_ATOMIC, true);
    return ['files.exists(' + path_value + ')', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['files_ensure_dir_path'] = function (block) {
    var path_value = Blockly.JavaScript.valueToCode(block, 'PATH', Blockly.JavaScript.ORDER_ATOMIC, true);
    return 'files.ensureDir(' + path_value + ');\n';
};

Blockly.JavaScript['files_read_path'] = function (block) {
    var path_value = Blockly.JavaScript.valueToCode(block, 'PATH', Blockly.JavaScript.ORDER_ATOMIC, true);
    var encoding_way = block.getFieldValue('WAY');
    return ['files.read(' + path_value + ',' + encoding_way + ');\n', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['files_read_bytes_path'] = function (block) {
    var path_value = Blockly.JavaScript.valueToCode(block, 'PATH', Blockly.JavaScript.ORDER_ATOMIC, true);
    return ['files.readBytes(' + path_value + ');\n', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['files_write_path_text'] = function (block) {
    var path_value = Blockly.JavaScript.valueToCode(block, 'PATH', Blockly.JavaScript.ORDER_ATOMIC, true);
    var text_value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC, true);
    var encoding_way = block.getFieldValue('WAY');
    return 'files.write(' + path_value + ',' + text_value + ',' + encoding_way + ');\n';
};

Blockly.JavaScript['files_write_bytes_path_bytes'] = function (block) {
    var path_value = Blockly.JavaScript.valueToCode(block, 'PATH', Blockly.JavaScript.ORDER_ATOMIC, true);
    var text_value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC, true);
    return 'files.writeBytes(' + path_value + ',' + text_value + ');\n';
};

Blockly.JavaScript['files_append_path_text'] = function (block) {
    var path_value = Blockly.JavaScript.valueToCode(block, 'PATH', Blockly.JavaScript.ORDER_ATOMIC, true);
    var text_value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC, true);
    var encoding_way = block.getFieldValue('WAY');
    return 'files.append(' + path_value + ',' + text_value + ',' + encoding_way + ');\n';
};

Blockly.JavaScript['files_append_bytes_path'] = function (block) {
    var path_value = Blockly.JavaScript.valueToCode(block, 'PATH', Blockly.JavaScript.ORDER_ATOMIC, true);
    return 'files.appendBytes(' + path_value + ',' + text_value + ',' + encoding_way + ');\n';
};

Blockly.JavaScript['files_copy'] = function (block) {
    var path_value = Blockly.JavaScript.valueToCode(block, 'PATH', Blockly.JavaScript.ORDER_ATOMIC, true);
    var text_value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC, true);
    return ['files.copy(' + path_value + ',' + text_value + ')', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['files_move'] = function (block) {
    var path_value = Blockly.JavaScript.valueToCode(block, 'PATH', Blockly.JavaScript.ORDER_ATOMIC, true);
    var text_value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC, true);
    return ['files.move(' + path_value + ',' + text_value + ')', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['files_rename_path'] = function (block) {
    var path_value = Blockly.JavaScript.valueToCode(block, 'PATH', Blockly.JavaScript.ORDER_ATOMIC, true);
    var text_value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC, true);
    return ['files.rename(' + path_value + ',' + text_value + ')', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['files_rename_without_extension_path'] = function (block) {
    var path_value = Blockly.JavaScript.valueToCode(block, 'PATH', Blockly.JavaScript.ORDER_ATOMIC, true);
    var text_value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC, true);
    return ['files.renameWithoutExtension(' + path_value + ',' + text_value + ')', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['files_getname'] = function (block) {
    var path_value = Blockly.JavaScript.valueToCode(block, 'PATH', Blockly.JavaScript.ORDER_ATOMIC, true);
    return ['files.getName(' + path_value + ')', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['files_getname_without_extension'] = function (block) {
    var path_value = Blockly.JavaScript.valueToCode(block, 'PATH', Blockly.JavaScript.ORDER_ATOMIC, true);
    return ['files.getNameWithoutExtension(' + path_value + ')', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['files_get_extension'] = function (block) {
    var path_value = Blockly.JavaScript.valueToCode(block, 'PATH', Blockly.JavaScript.ORDER_ATOMIC, true);
    return ['files.getExtension(' + path_value + ')', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['files_remove'] = function (block) {
    var path_value = Blockly.JavaScript.valueToCode(block, 'PATH', Blockly.JavaScript.ORDER_ATOMIC, true);
    return ['files.remove(' + path_value + ')', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['files_remove_dir'] = function (block) {
    var path_value = Blockly.JavaScript.valueToCode(block, 'PATH', Blockly.JavaScript.ORDER_ATOMIC, true);
    return ['files.removeDir(' + path_value + ')', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['files_getsdcard_path'] = function (block) {
    return ['files.getSdcardPath()', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['files_cwd'] = function (block) {
    return ['files.cwd()', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['files_path_relative'] = function (block) {
    var path_value = Blockly.JavaScript.valueToCode(block, 'PATH', Blockly.JavaScript.ORDER_ATOMIC, true);
    return ['files.path(' + path_value + ')', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['files_list_dir'] = function (block) {
    var path_value = Blockly.JavaScript.valueToCode(block, 'PATH', Blockly.JavaScript.ORDER_ATOMIC, true);
    var function_value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC, true);
    return ['(' + path_value + ',' + (function_value ? ',' + function_value : '') + ')', Blockly.JavaScript.ORDER_ATOMIC];
};
