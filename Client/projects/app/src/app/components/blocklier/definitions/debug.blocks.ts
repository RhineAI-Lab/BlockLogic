import {
  BlocklierArgumentReader,
  BlocklierBlockDefinition,
  BlocklierCodeDefinition,
  BlocklierCustomBlock,
} from '../blocklier-models';
import { helpUrlBuilder } from './common';

const colour = '#cc9999';
const helpUrl = helpUrlBuilder('debug');

@BlocklierCustomBlock.register()
export class Debug_dump_hprof_Block extends BlocklierCustomBlock {
  override type = '$debug_dump_hprof';

  override definition: BlocklierBlockDefinition = {
    lines: [
      {
        message: '将整个脚本进程的内存dump到文件file中 %1 ',
        args: [{ type: 'input_value', name: 'FILE', check: 'String' }],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: colour,
    tooltip:
      '当你发现Auto.js Pro占用内存很高时，你可以运行这个函数来dump整个内存并反馈给开发者，开发者可以通过内存dump文件来诊断是否有内存泄露。',
    helpUrl: helpUrl('debugdumphproffile'),
  };

  override toJS(args: BlocklierArgumentReader): BlocklierCodeDefinition {
    const file = args.code('FILE');
    return `$debug.dumpHprof(${file});\n`;
  }
}

@BlocklierCustomBlock.register()
export class Debug_dump_and_send_hprof_Block extends BlocklierCustomBlock {
  override type = '$debug_dump_and_send_hprof';

  override definition: BlocklierBlockDefinition = {
    lines: [
      { message: '将整个脚本进程的内存dump到文件file中，并自动压缩为zip文件' },
    ],
    output: 'string',
    colour: colour,
    tooltip: '使用压缩程度最高的压缩等级，因此需要的时间更久，但文件更小。',
    helpUrl: helpUrl('debugdumpandsendhproffile'),
  };

  override toJS(): BlocklierCodeDefinition {
    return [`$debug.dumpAndSendHprof()`, 0];
  }
}

@BlocklierCustomBlock.register()
export class Debug_get_stack_trace_Block extends BlocklierCustomBlock {
  override type = '$debug_get_stack_trace';

  override definition: BlocklierBlockDefinition = {
    lines: [
      {
        message: '获取一个异常的详细堆栈并返回 %1 ',
        args: [{ type: 'input_value', name: 'ERROR', check: 'String' }],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: colour,
    tooltip: '',
    helpUrl: helpUrl('debuggetstacktraceerror'),
  };

  override toJS(args: BlocklierArgumentReader): BlocklierCodeDefinition {
    const error = args.code('ERROR');
    return `$debug.getStackTrace(${error});\n`;
  }
}

@BlocklierCustomBlock.register()
export class Debug_set_memory_leak_detection_enabled_Block extends BlocklierCustomBlock {
  override type = '$debug_set_memory_leak_detection_enabled';

  override definition: BlocklierBlockDefinition = {
    lines: [
      {
        message: ' %1 内存泄漏检测',
        args: [
          {
            type: 'field_dropdown',
            name: 'ENABLED',
            options: [
              ['启用', 'true'],
              ['不启用', 'false'],
            ],
          },
        ],
      },
    ],
    previousStatement: 'null',
    nextStatement: 'null',
    colour: colour,
    tooltip: '',
    helpUrl: helpUrl('debugsetmemoryleakdetectionenabledenabled'),
  };

  override toJS(args: BlocklierArgumentReader): BlocklierCodeDefinition {
    const enabled = args.value('ENABLED');
    return `$debug.setMemoryLeakDetectionEnabled(${enabled});\n`;
  }
}

@BlocklierCustomBlock.register()
export class Debug_gc_Block extends BlocklierCustomBlock {
  override type = '$debug_gc';

  override definition: BlocklierBlockDefinition = {
    lines: [
      {
        message: '建议JVM进行垃圾回收',
      },
    ],
    colour: colour,
    previousStatement: null,
    nextStatement: null,
    tooltip: '建议JVM进行垃圾回收（并不一定进行垃圾回收）。',
    helpUrl: helpUrl('debuggc'),
  };

  override toJS(args: BlocklierArgumentReader): BlocklierCodeDefinition {
    const gc = args.code('GC');
    return `$debug.gc(${gc});\n`;
  }
}
