import { Blockly } from 'ngx-blockly';

import {
  BlocklierArgumentReader,
  BlocklierBlockDefinition,
  BlocklierCodeDefinition,
  BlocklierCustomBlock,
} from '../blocklier-models';
import { helpUrlBuilder } from './common';

const colour = '#c6a000';
const helpUrl = helpUrlBuilder('app');

export class AppVersionCodeBlock extends BlocklierCustomBlock {
  type = 'app_version_code';

  override definition: BlocklierBlockDefinition = {
    lines: [{ message: '获取当前软件版本号' }],
    output: 'Number',
    colour,
    tooltip:
      '当前软件版本号，整数值。例如160, 256等。\n如果在Auto.js中运行则为Auto.js的版本号；在打包的软件中则为打包软件的版本号。',
    helpUrl: helpUrl('appversionCode'),
  };

  protected override toJS(): BlocklierCodeDefinition {
    return ['app.versionCode', 0];
  }
}

export class AppVersionNameBlock extends BlocklierCustomBlock {
  type = 'app_version_name';

  override definition: BlocklierBlockDefinition = {
    lines: [{ message: '获取当前软件的版本名称' }],
    output: 'String',
    colour: colour,
    tooltip:
      "当前软件的版本名称，例如'3.0.0 Beta'\n如果在Auto.js中运行则为Auto.js的版本名称；在打包的软件中则为打包软件的版本名称。",
    helpUrl: helpUrl('appversionName'),
  };

  protected override toJS(): BlocklierCodeDefinition {
    return ['app.versionName', 0];
  }
}

export class AppAutojsBlock extends BlocklierCustomBlock {
  type = 'app_autojs';

  override definition: BlocklierBlockDefinition = {
    lines: [
      {
        message: '获取当前autojs的 %1 ',
        args: [
          {
            type: 'field_dropdown',
            name: 'KEY',
            options: [
              ['版本号', 'versionCode'],
              ['版本名', 'versionName'],
            ],
          },
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: colour,
    tooltip: '',
    helpUrl: helpUrl('appautojsversioncode'),
  };

  override toJS(args: BlocklierArgumentReader): BlocklierCodeDefinition {
    const value = args.code('KEY');
    return `app.autojs.${value};\n`;
  }
}

export class AppLaunchBlock extends BlocklierCustomBlock {
  type = 'app_launch';

  override definition: BlocklierBlockDefinition = {
    lines: [
      {
        message: '通过应用包名启动应用 %1 ',
        args: [{ type: 'input_value', name: 'PACKAGE_NAME', check: 'String' }],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: colour,
    tooltip:
      '如果该名称对应的应用不存在，则返回false; 否则返回true。如果该名称对应多个应用，则只启动其中某一个。',
    helpUrl: helpUrl('applaunchpackagename'),
  };

  override toJS(args: BlocklierArgumentReader): BlocklierCodeDefinition {
    const packageName = args.code('PACKAGE_NAME');
    return `app.launch(${packageName});\n`;
  }
}

export class AppLaunchAppBlock extends BlocklierCustomBlock {
  type = 'app_launch_app';

  override definition: BlocklierBlockDefinition = {
    lines: [
      {
        message: '通过应用名称启动应用 %1 ',
        args: [{ type: 'input_value', name: 'APP_NAME', check: 'String' }],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: colour,
    tooltip:
      '如果该名称对应的应用不存在，则返回false; 否则返回true。如果该名称对应多个应用，则只启动其中某一个。',
    helpUrl: helpUrl('applaunchappappname'),
  };

  override toJS(args: BlocklierArgumentReader): BlocklierCodeDefinition {
    const appName = args.code('APP_NAME');
    return `app.launchApp(${appName});\n`;
  }
}

export class AppGetPackageNameBlock extends BlocklierCustomBlock {
  type = 'app_get_package_name';

  override definition: BlocklierBlockDefinition = {
    lines: [
      {
        message: '获取应用名对应的包名 %1 ',
        args: [{ type: 'input_value', name: 'APP_NAME', check: 'String' }],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: colour,
    tooltip:
      '如果该找不到该应用，返回null；如果该名称对应多个应用，则只返回其中某一个的包名。。',
    helpUrl: helpUrl('appgetpackagenameappname'),
  };

  override toJS(args: BlocklierArgumentReader): BlocklierCodeDefinition {
    const appName = args.code('APP_NAME');
    return [`app.getPackageName(${appName})`, 0];
  }
}

export class AppGetAppNameBlock extends BlocklierCustomBlock {
  type = 'app_get_app_name';

  override definition: BlocklierBlockDefinition = {
    lines: [
      {
        message: '获取包名对应的应用名 %1',
        args: [{ type: 'input_value', name: 'PACKAGE_NAME', check: 'String' }],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: colour,
    tooltip: '如果该找不到该应用，返回null。',
    helpUrl: helpUrl('appgetappnamepackagename'),
  };

  override toJS(args: BlocklierArgumentReader): BlocklierCodeDefinition {
    const packageName = args.code('PACKAGE_NAME');
    return `app.getAppName(${packageName})`;
  }
}

export class AppOpenAppSettingBlock extends BlocklierCustomBlock {
  type = 'app_open_app_setting';

  override definition: BlocklierBlockDefinition = {
    lines: [
      {
        message: '打开应用的详情页',
      },
    ],
    output: 'String',
    colour: colour,
    tooltip: '如果找不到该应用，返回false; 否则返回true。',
    helpUrl: helpUrl('appopenappsettingpackagename'),
  };

  override toJavaScriptCode(): BlocklierCodeDefinition {
    const code = 'app.openAppSetting';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  }
}

export class AppViewFileBlock extends BlocklierCustomBlock {
  type = 'app_view_file';

  override definition: BlocklierBlockDefinition = {
    lines: [
      {
        message: '用其他应用查看文件 %1 ',
        args: [{ type: 'input_value', name: 'PATH', check: 'String' }],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: colour,
    tooltip:
      '文件不存在的情况由查看文件的应用处理。如果找不出可以查看该文件的应用，则抛出ActivityNotException。',
    helpUrl: helpUrl('appviewfilepath'),
  };

  override toJS(args: BlocklierArgumentReader): BlocklierCodeDefinition {
    const path = args.code('PATH');
    return `app.viewFile(${path});\n`;
  }
}

export class AppEditFileBlock extends BlocklierCustomBlock {
  type = 'app_edit_file';

  override definition: BlocklierBlockDefinition = {
    lines: [
      {
        message: '用其他应用编辑文件 %1 ',
        args: [{ type: 'input_value', name: 'PATH', check: 'String' }],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: colour,
    tooltip:
      '文件不存在的情况由编辑文件的应用处理。如果找不出可以编辑该文件的应用，则抛出ActivityNotException。',
    helpUrl: helpUrl('appeditfilepath'),
  };

  override toJS(args: BlocklierArgumentReader): BlocklierCodeDefinition {
    const path = args.code('PATH');
    return `app.editFile(${path});\n`;
  }
}

export class AppUninstallBlock extends BlocklierCustomBlock {
  type = 'app_uninstall';

  override definition: BlocklierBlockDefinition = {
    lines: [
      {
        message: '卸载应用 %1 ',
        args: [{ type: 'input_value', name: 'PACKAGE_NAME', check: 'String' }],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: colour,
    tooltip:
      '执行后会会弹出卸载应用的提示框。如果该包名的应用未安装，由应用卸载程序处理，可能弹出未找到应用的提示。',
    helpUrl: helpUrl('appuninstallpackagename'),
  };

  override toJS(args: BlocklierArgumentReader): BlocklierCodeDefinition {
    const packageName = args.code('PACKAGE_NAME');
    return `app.uninstall(${packageName});\n`;
  }
}

export class AppOpenUrlBlock extends BlocklierCustomBlock {
  type = 'app_open_url';

  override definition: BlocklierBlockDefinition = {
    lines: [
      {
        message: '用浏览器打开网站url %1 ',
        args: [{ type: 'input_value', name: 'URL', check: 'String' }],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: colour,
    tooltip: '如果没有安装浏览器应用，则抛出ActivityNotException。',
    helpUrl: helpUrl('appopenurlurl'),
  };

  override toJS(args: BlocklierArgumentReader): BlocklierCodeDefinition {
    const url = args.code('URL');
    return `app.openUrl(${url});\n`;
  }
}

export class AppSendEmailBlock extends BlocklierCustomBlock {
  type = 'app_send_email';

  override definition: BlocklierBlockDefinition = {
    lines: [
      {
        message: '根据选项options调用邮箱应用发送邮件 %1 ',
        args: [{ type: 'input_value', name: 'OPTIONS', check: 'String' }], // TODO: arg type?
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: colour,
    tooltip:
      '如果该名称对应的应用不存在，则返回false; 否则返回true。如果该名称对应多个应用，则只启动其中某一个。',
    helpUrl: helpUrl('appsendemailoptions'),
  };

  override toJS(args: BlocklierArgumentReader): BlocklierCodeDefinition {
    const options = args.code('OPTIONS');
    return `app.sendEmail(${options});\n`;
  }
}

export class AppStartActivityBlock extends BlocklierCustomBlock {
  type = 'app_start_activity';

  override definition: BlocklierBlockDefinition = {
    lines: [
      {
        message: '启动Auto.js界面 %1 ',
        args: [{ type: 'input_value', name: 'NAME', check: 'String' }],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: colour,
    tooltip:
      '该函数在Auto.js内运行则会打开Auto.js内的界面，在打包应用中运行则会打开打包应用的相应界面。',
    helpUrl: helpUrl('appstartactivityname'),
  };

  override toJS(args: BlocklierArgumentReader): BlocklierCodeDefinition {
    const name = args.code('NAME');
    return `app.startActivity(${name});\n`;
  }
}
