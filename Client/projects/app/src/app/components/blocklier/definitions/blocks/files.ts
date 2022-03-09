import * as Blockly from 'blockly';

const colour = '#b9993d';
const baseHelpUrl = 'https://pro.autojs.org/docs/#/zh-cn/files?id=';

Blockly.defineBlocksWithJsonArray([
  {
    type: 'files_is_file',
    message0: '路径 %1 是否是文件',
    args0: [
      {
        type: 'input_value',
        name: 'PATH',
        check: 'String',
      },
    ],
    output: 'Boolean',
    colour: colour,
    helpUrl: baseHelpUrl + 'filesisfilepath',
    tooltip: '返回该路径是否是文件。',
  },
  {
    type: 'files_is_dir',
    message0: '路径 %1 是否是文件夹',
    args0: [
      {
        type: 'input_value',
        name: 'PATH',
        check: 'String',
      },
    ],
    output: 'Boolean',
    colour: colour,
    helpUrl: baseHelpUrl + 'filesisdirpath',
    tooltip: '返回该路径是否是文件夹。',
  },
  {
    type: 'files_is_empty_dir_path',
    message0: '文件夹 %1 是否为空文件夹',
    args0: [
      {
        type: 'input_value',
        name: 'PATH',
        check: 'String',
      },
    ],
    output: 'Boolean',
    colour: colour,
    helpUrl: baseHelpUrl + 'filesisemptydirpath',
    tooltip:
      '返回该文件夹是否为空文件夹。如果该路径并非文件夹，则直接返回false。',
  },
  {
    type: 'files_join',
    message0: '连接路径 %1 和路径 %2',
    args0: [
      {
        type: 'input_value',
        name: 'PATH',
        check: 'String',
      },
      {
        type: 'input_value',
        name: 'VALUE',
        check: 'String',
      },
    ],
    output: 'String',
    colour: colour,
    helpUrl: baseHelpUrl + 'filesjoinparent-child',
    tooltip:
      '连接两个路径并返回，例如files.join("/sdcard/", "1.txt")返回"/sdcard/1.txt"。',
  },
  {
    type: 'files_create_path',
    message0: '在路径 %1 创建一个文件或文件夹',
    args0: [
      {
        type: 'input_value',
        name: 'PATH',
        check: 'String',
      },
    ],
    output: 'Boolean',
    colour: colour,
    helpUrl: baseHelpUrl + 'filescreatepath',
    tooltip:
      '创建一个文件或文件夹并返回是否创建成功。如果文件已经存在，则直接返回false。',
  },
  {
    type: 'files_create_with_dirs_path',
    message0: '创建路径 %1 (包括所在的一系列文件夹)',
    args0: [
      {
        type: 'input_value',
        name: 'PATH',
        check: 'String',
      },
    ],
    output: 'Boolean',
    colour: colour,
    helpUrl: baseHelpUrl + 'filescreatewithdirspath',
    tooltip:
      '创建一个文件或文件夹并返回是否创建成功。如果文件所在文件夹不存在，则先创建他所在的一系列文件夹。如果文件已经存在，则直接返回false。',
  },
  {
    type: 'files_exists_path',
    message0: '是否存在路径 %1 的文件',
    args0: [
      {
        type: 'input_value',
        name: 'PATH',
        check: 'String',
      },
    ],
    output: 'Boolean',
    colour: colour,
    helpUrl: baseHelpUrl + 'filesexistspath',
    tooltip: '返回在该路径处的文件是否存在。',
  },
  {
    type: 'files_ensure_dir_path',
    message0: '确保路径  %1  文件夹存在',
    args0: [
      {
        type: 'input_value',
        name: 'PATH',
        check: 'String',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: colour,
    helpUrl: baseHelpUrl + 'filesensuredirpath',
    tooltip:
      '确保该路径所在的文件夹存在。如果该路径所在文件夹不存在，则创建该文件夹。',
  },
  {
    type: 'files_read_path',
    message0: '以 %2 字符编码格式读取文本文件 %1 ',
    args0: [
      {
        type: 'input_value',
        name: 'PATH',
        check: 'String',
      },
      {
        type: 'field_dropdown',
        name: 'WAY',
        options: [
          ['utf-8', 'utf-8'],
          ['GBK', 'GBK'],
          ['GB2312', 'GB2312'],
          ['Big5', 'Big5'],
          ['GB18030', 'GB18030'],
        ],
      },
    ],
    output: 'String',
    colour: colour,
    helpUrl: baseHelpUrl + 'filesreadpath-encoding-quotutf-8quot',
    tooltip:
      '读取该文本文件的所有内容并返回。如果文件不存在，则抛出FileNotFoundException。',
  },
  {
    type: 'files_read_bytes_path',
    message0: '读取文件 %1 的字节数组',
    args0: [
      {
        type: 'input_value',
        name: 'PATH',
        check: 'String',
      },
    ],
    output: 'Array',
    colour: colour,
    helpUrl: baseHelpUrl + 'filesreadbytespath',
    tooltip:
      '读取该文件的所有内容并返回一个字节数组。如果文件不存在，则抛出FileNotFoundException。',
  },
  {
    type: 'files_write_path_text',
    message0: '以 %3 编码写入 %2 文本到 %1',
    args0: [
      {
        type: 'input_value',
        name: 'PATH',
        check: 'String',
      },
      {
        type: 'input_value',
        name: 'VALUE',
        check: 'String',
      },
      {
        type: 'field_dropdown',
        name: 'WAY',
        options: [
          ['utf-8', 'utf-8'],
          ['GBK', 'GBK'],
          ['GB2312', 'GB2312'],
          ['Big5', 'Big5'],
          ['GB18030', 'GB18030'],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: colour,
    helpUrl: baseHelpUrl + 'fileswritepath-text-encoding-quotutf-8quot',
    tooltip: '把文本写入到该文件中。如果文件存在则覆盖，不存在则创建。',
  },
  {
    type: 'files_write_bytes_path_bytes',
    message0: '把字节数组 %2 写入到 %1',
    args0: [
      {
        type: 'input_value',
        name: 'PATH',
        check: 'String',
      },
      {
        type: 'input_value',
        name: 'VALUE',
        check: 'Array',
        align: 'RIGHT',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: colour,
    helpUrl: baseHelpUrl + 'fileswritebytespath-bytes',
    tooltip: '把bytes写入到该文件中。如果文件存在则覆盖，不存在则创建。',
  },
  {
    type: 'files_append_path_text',
    message0: '以 %3 编码把文本 %2 追加到文件 %1 的末尾',
    args0: [
      {
        type: 'input_value',
        name: 'PATH',
        check: 'String',
      },
      {
        type: 'input_value',
        name: 'VALUE',
        check: 'String',
      },
      {
        type: 'field_dropdown',
        name: 'WAY',
        options: [
          ['utf-8', 'utf-8'],
          ['GBK', 'GBK'],
          ['GB2312', 'GB2312'],
          ['Big5', 'Big5'],
          ['GB18030', 'GB18030'],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: colour,
    helpUrl: baseHelpUrl + 'filesappendpath-text-encoding-39utf-839',
    tooltip: '把text追加到该文件的末尾。如果文件不存在则创建。',
  },
  {
    type: 'files_append_bytes_path',
    message0: '以 %3 编码 追加字节数组 %2 到文件 %1 末尾',
    args0: [
      {
        type: 'input_value',
        name: 'PATH',
        check: 'String',
      },
      {
        type: 'input_value',
        name: 'VALUE',
        check: 'Array',
      },
      {
        type: 'field_dropdown',
        name: 'WAY',
        options: [
          ['utf-8', 'utf-8'],
          ['GBK', 'GBK'],
          ['GB2312', 'GB2312'],
          ['Big5', 'Big5'],
          ['GB18030', 'GB18030'],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: colour,
    helpUrl: baseHelpUrl + 'filesappendbytespath-text-encoding-39utf-839',
    tooltip: '把bytes追加到该文件的末尾。如果文件不存在则创建。',
  },
  {
    type: 'files_copy',
    message0: '把文件 %1 复制到 %2',
    args0: [
      {
        type: 'input_value',
        name: 'PATH',
        check: 'String',
      },
      {
        type: 'input_value',
        name: 'VALUE',
        check: 'String',
      },
    ],
    output: 'Boolean',
    colour: colour,
    helpUrl: baseHelpUrl + 'filescopyfrompath-topath',
    tooltip: '复制文件，返回是否复制成功。',
  },
  {
    type: 'files_move',
    message0: '把文件 %1 移动到 %2',
    args0: [
      {
        type: 'input_value',
        name: 'PATH',
        check: 'String',
      },
      {
        type: 'input_value',
        name: 'VALUE',
        check: 'String',
      },
    ],
    output: 'Boolean',
    colour: colour,
    helpUrl: baseHelpUrl + 'filesmovefrompath-topath',
    tooltip: '移动文件，返回是否移动成功。',
  },
  {
    type: 'files_rename_path',
    message0: '把文件 %1 重命名为 %2',
    args0: [
      {
        type: 'input_value',
        name: 'PATH',
        check: 'String',
      },
      {
        type: 'input_value',
        name: 'VALUE',
        check: 'String',
      },
    ],
    output: 'Boolean',
    colour: colour,
    helpUrl: baseHelpUrl + 'filesrenamepath-newname',
    tooltip: '重命名文件，并返回是否重命名成功。',
  },
  {
    type: 'files_rename_without_extension_path',
    message0: '把文件 %1 (不包含扩展名)重命名为 %2',
    args0: [
      {
        type: 'input_value',
        name: 'PATH',
        check: 'String',
        align: 'RIGHT',
      },
      {
        type: 'input_value',
        name: 'VALUE',
        check: 'String',
        align: 'RIGHT',
      },
    ],
    output: 'Boolean',
    colour: colour,
    helpUrl: baseHelpUrl + 'filesrenamewithoutextensionpath-newname',
    tooltip: '重命名文件，不包含拓展名，并返回是否重命名成功。',
  },
  {
    type: 'files_getname',
    message0: '获取文件 %1 的完整名称',
    args0: [
      {
        type: 'input_value',
        name: 'PATH',
        check: 'String',
      },
    ],
    output: 'String',
    colour: colour,
    helpUrl: baseHelpUrl + 'filesgetnamepath',
    tooltip: '返回文件的文件名。',
  },
  {
    type: 'files_getname_without_extension',
    message0: '获取文件 %1 不包含扩展名的名称',
    args0: [
      {
        type: 'input_value',
        name: 'PATH',
        check: 'String',
      },
    ],
    output: 'String',
    colour: colour,
    helpUrl: baseHelpUrl + 'filesgetnamewithoutextensionpath',
    tooltip: '返回不含拓展名的文件的文件名。',
  },
  {
    type: 'files_get_extension',
    message0: '获取文件 %1 的扩展名',
    args0: [
      {
        type: 'input_value',
        name: 'PATH',
        check: 'String',
      },
    ],
    output: 'String',
    colour: colour,
    helpUrl: baseHelpUrl + 'filesgetextensionpath',
    tooltip: '返回文件的拓展名。',
  },
  {
    type: 'files_remove',
    message0: '删除文件或空文件夹 %1 ',
    args0: [
      {
        type: 'input_value',
        name: 'PATH',
        check: 'String',
      },
    ],
    output: 'Boolean',
    colour: colour,
    helpUrl: baseHelpUrl + 'filesremovepath',
    tooltip: '删除文件或空文件夹，返回是否删除成功。',
  },
  {
    type: 'files_remove_dir',
    message0: '删除文件夹 %1 ',
    args0: [
      {
        type: 'input_value',
        name: 'PATH',
        check: 'String',
      },
    ],
    output: 'Boolean',
    colour: colour,
    helpUrl: baseHelpUrl + 'filesremovedirpath',
    tooltip:
      '删除文件夹，如果文件夹不为空，则删除该文件夹的所有内容再删除该文件夹，返回是否全部删除成功。',
  },
  {
    type: 'files_getsdcard_path',
    message0: '获取SD卡的路径',
    output: 'String',
    colour: colour,
    helpUrl: baseHelpUrl + 'filesgetsdcardpath',
    tooltip: '返回SD卡路径。所谓SD卡，即外部存储器。',
  },
  {
    type: 'files_cwd',
    message0: '获取执行文件的当前路径',
    output: 'String',
    colour: colour,
    helpUrl: baseHelpUrl + 'filescwd',
    tooltip:
      '返回当前执行文件的"当前工作文件夹路径"。该路径指的是，如果脚本本身为脚本文件，则返回这个脚本文件所在目录；否则返回null获取其他设定路径。',
  },
  {
    type: 'files_path_relative',
    message0: '获取相对路径  %1  对应的绝对路径',
    args0: [
      {
        type: 'input_value',
        name: 'PATH',
        check: 'String',
      },
    ],
    output: 'String',
    colour: colour,
    helpUrl: baseHelpUrl + 'filespathrelativepath',
    tooltip: '返回相对路径对应的绝对路径。',
  },
  {
    type: 'files_list_dir',
    message0: '列出文件夹路径 %1 下的满足条件 %2 的文件和文件夹的名称数组',
    args0: [
      {
        type: 'input_value',
        name: 'PATH',
        check: 'String',
        align: 'RIGHT',
      },
      {
        type: 'input_value',
        name: 'VALUE',
        check: 'Function',
        align: 'RIGHT',
      },
    ],
    inputsInline: false,
    output: 'Array',
    colour: colour,
    helpUrl: baseHelpUrl + 'fileslistdirpath-filter',
    tooltip:
      '列出该文件夹下的满足条件的文件和文件夹的名称的数组。如果不加filter参数，则返回所有文件和文件夹。',
  },
]);
