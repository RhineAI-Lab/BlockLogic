import {
  BlocklierArgumentReader,
  BlocklierBlockDefinition,
  BlocklierCodeDefinition,
  BlocklierCustomBlock,
} from '../blocklier-models';
import { helpUrlBuilder } from './common';

const colour = '#e5af00';
const helpUrl = helpUrlBuilder('widgetsBasedAutomation');

@BlocklierCustomBlock.register()
export class AutoWaitForBlock extends BlocklierCustomBlock {
  override type = 'auto_wait_for';

  override definition: BlocklierBlockDefinition = {
    lines: [{ message: '申请并等待无障碍权限开启' }],
    previousStatement: null,
    nextStatement: null,
    colour,
    tooltip: '申请并等待无障碍权限开启，如已开启，则直接跳过',
    helpUrl: helpUrl('autowaitfor'),
  };

  override toJS(): BlocklierCodeDefinition {
    return `auto.waitFor();\n`;
  }
}

@BlocklierCustomBlock.register()
export class AutoSetModeBlock extends BlocklierCustomBlock {
  override type = 'auto_set_mode';

  override definition: BlocklierBlockDefinition = {
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

  override toJS(args: BlocklierArgumentReader): BlocklierCodeDefinition {
    const mode = args.value('MODE');
    return `auto.setMode('${mode}')\n`;
  }
}

@BlocklierCustomBlock.register()
export class AutoSetFlagsBlock extends BlocklierCustomBlock {
  override type = 'auto_set_flags';

  override definition: BlocklierBlockDefinition = {
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

  override toJS(args: BlocklierArgumentReader): BlocklierCodeDefinition {
    const flag = args.value('FLAT');
    return `auto.setFlags(['${flag}']);\n`;
  }
}

@BlocklierCustomBlock.register()
export class AutoServiceBlock extends BlocklierCustomBlock {
  override type = 'auto_service';

  override definition: BlocklierBlockDefinition = {
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

  override toJS(): BlocklierCodeDefinition {
    return [`auto.service`, 0];
  }
}

@BlocklierCustomBlock.register()
export class AutoWindowsBlock extends BlocklierCustomBlock {
  override type = 'auto_windows';

  override definition: BlocklierBlockDefinition = {
    lines: [{ message: '获取当前窗口' }],
    output: ['AutoWindows', 'Array'],
    colour,
    tooltip: '获取当前全部窗口，返回窗口列表',
    helpUrl: helpUrl('autowindows'),
  };

  override toJS(): BlocklierCodeDefinition {
    return [`auto.windows`, 0];
  }
}

@BlocklierCustomBlock.register()
export class AutoRootBlock extends BlocklierCustomBlock {
  override type = 'auto_root';

  override definition: BlocklierBlockDefinition = {
    lines: [{ message: '获取当前窗口根控件' }],
    output: 'UiObject',
    colour,
    tooltip: '获取当前窗口根控件',
    helpUrl: helpUrl('autoroot'),
  };

  override toJS(): BlocklierCodeDefinition {
    return [`auto.root`, 0];
  }
}

@BlocklierCustomBlock.register()
export class AutoRootInActiveWindowBlock extends BlocklierCustomBlock {
  override type = 'auto_root_in_active_window';

  override definition: BlocklierBlockDefinition = {
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

  override toJS(): BlocklierCodeDefinition {
    return [`auto.rootInActiveWindow`, 0];
  }
}

@BlocklierCustomBlock.register()
export class AutoSetWindowFilterBlock extends BlocklierCustomBlock {
  override type = 'auto_set_window_filter';

  override definition: BlocklierBlockDefinition = {
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

  override toJS(args: BlocklierArgumentReader): BlocklierCodeDefinition {
    const filter = args.code('FILTER');
    return `auto.setWindowFilter('${filter}');\n`;
  }
}
