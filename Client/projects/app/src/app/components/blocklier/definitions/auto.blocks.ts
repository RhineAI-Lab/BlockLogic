import { BlocklierArgumentReader } from '../models/blocklier-argument-reader.class';
import {
  BlocklierCustomBlock,
  BlocklierCustomBlockCode,
  BlocklierCustomBlockDefinition,
  BlocklierCustomBlockWithJavaScript,
} from '../models/blocklier-custom-block.class';
import { helpUrlBuilder } from './common';

const colour = '#e5af00';
const helpUrl = helpUrlBuilder('widgetsBasedAutomation');

@BlocklierCustomBlock.register('auto_wait_for')
export class AutoWaitForBlock
  extends BlocklierCustomBlock
  implements BlocklierCustomBlockWithJavaScript
{
  definition: BlocklierCustomBlockDefinition = {
    lines: [{ message: '申请并等待无障碍权限开启' }],
    previousStatement: null,
    nextStatement: null,
    colour,
    tooltip: '申请并等待无障碍权限开启，如已开启，则直接跳过',
    helpUrl: helpUrl('autowaitfor'),
  };

  toJavaScript(): BlocklierCustomBlockCode {
    return `auto.waitFor();\n`;
  }
}

@BlocklierCustomBlock.register('auto_set_mode')
export class AutoSetModeBlock
  extends BlocklierCustomBlock
  implements BlocklierCustomBlockWithJavaScript
{
  definition: BlocklierCustomBlockDefinition = {
    lines: [
      {
        message: '设置无障碍模式 %1',
        args: [
          {
            type: 'field_dropdown',
            name: 'MODE',
            options: [
              ['快速', 'fast'],
              ['正常', 'normal'],
            ],
          },
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour,
    tooltip: '设置无障碍模式，不使用该功能默认正常',
    helpUrl: helpUrl('autosetmodemode'),
  };

  toJavaScript(args: BlocklierArgumentReader): BlocklierCustomBlockCode {
    const mode = args.value('MODE');
    return `auto.setMode('${mode}')\n`;
  }
}

@BlocklierCustomBlock.register('auto_set_flags')
export class AutoSetFlagsBlock
  extends BlocklierCustomBlock
  implements BlocklierCustomBlockWithJavaScript
{
  definition: BlocklierCustomBlockDefinition = {
    lines: [
      {
        message: '设置无障碍标志 %1',
        args: [
          {
            type: 'field_dropdown',
            name: 'FLAG',
            options: [
              ['启用主进程搜索', 'findOnUiThread'],
              ['启用“使用情况统计”服务', 'useUsageStats'],
              ['启用Shell命令模式', 'useShell'],
            ],
          },
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour,
    tooltip: '设置无障碍特殊运行标志',
    helpUrl: helpUrl('autosetflagsflags'),
  };

  toJavaScript(args: BlocklierArgumentReader): BlocklierCustomBlockCode {
    const flag = args.value('FLAT');
    return `auto.setFlags(['${flag}']);\n`;
  }
}

@BlocklierCustomBlock.register('auto_service')
export class AutoServiceBlock
  extends BlocklierCustomBlock
  implements BlocklierCustomBlockWithJavaScript
{
  definition: BlocklierCustomBlockDefinition = {
    lines: [
      {
        message: '获取无障碍服务',
      },
    ],
    output: 'AutoService',
    colour,
    tooltip: '获取无障碍服务。如果无障碍服务没有启动，则返回null',
    helpUrl: helpUrl('autoservice'),
  };

  toJavaScript(): BlocklierCustomBlockCode {
    return [`auto.service`, 0];
  }
}

@BlocklierCustomBlock.register('auto_windows')
export class AutoWindowsBlock
  extends BlocklierCustomBlock
  implements BlocklierCustomBlockWithJavaScript
{
  definition: BlocklierCustomBlockDefinition = {
    lines: [{ message: '获取当前窗口' }],
    output: ['AutoWindows', 'Array'],
    colour,
    tooltip: '获取当前全部窗口，返回窗口列表',
    helpUrl: helpUrl('autowindows'),
  };

  toJavaScript(): BlocklierCustomBlockCode {
    return [`auto.windows`, 0];
  }
}

@BlocklierCustomBlock.register('auto_root')
export class AutoRootBlock
  extends BlocklierCustomBlock
  implements BlocklierCustomBlockWithJavaScript
{
  definition: BlocklierCustomBlockDefinition = {
    lines: [{ message: '获取当前窗口根控件' }],
    output: 'UiObject',
    colour,
    tooltip: '获取当前窗口根控件',
    helpUrl: helpUrl('autoroot'),
  };

  toJavaScript(): BlocklierCustomBlockCode {
    return [`auto.root`, 0];
  }
}

@BlocklierCustomBlock.register('auto_root_in_active_window')
export class AutoRootInActiveWindowBlock
  extends BlocklierCustomBlock
  implements BlocklierCustomBlockWithJavaScript
{
  definition: BlocklierCustomBlockDefinition = {
    lines: [
      {
        message: '获取活跃窗口根控件',
      },
    ],
    output: 'UiObject',
    colour,
    tooltip: '获取活跃窗口根控件',
    helpUrl: helpUrl('autorootinactivewindow'),
  };

  toJavaScript(): BlocklierCustomBlockCode {
    return [`auto.rootInActiveWindow`, 0];
  }
}

@BlocklierCustomBlock.register('auto_set_window_filter')
export class AutoSetWindowFilterBlock
  extends BlocklierCustomBlock
  implements BlocklierCustomBlockWithJavaScript
{
  definition: BlocklierCustomBlockDefinition = {
    lines: [
      {
        message: '设置窗口过滤器 %1',
        args: [{ type: 'input_value', name: 'FILTER', check: 'Function' }],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour,
    tooltip: '设置窗口过滤器，函数会输入一个窗口，需返回布尔值表示是否保留',
    helpUrl: helpUrl('autosetwindowfilterfilter'),
  };

  toJavaScript(args: BlocklierArgumentReader): BlocklierCustomBlockCode {
    const filter = args.code('FILTER');
    return `auto.setWindowFilter('${filter}');\n`;
  }
}
