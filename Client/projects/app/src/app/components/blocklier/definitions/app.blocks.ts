import { Blockly } from 'ngx-blockly';

import { ArgumentReader, helpUrlBuilder } from './common';
import { CodeDefinition, CustomBlockEnhanced } from './common';

const colour = '#c6a000';
const helpUrl = helpUrlBuilder('app');

export class AppVersionCodeBlock extends CustomBlockEnhanced {
  type = 'app_version_code';

  defineBlock(): void {
    this.block.jsonInit({
      message0: '获取当前软件版本号',
      output: 'Number',
      colour,
      tooltip:
        '当前软件版本号，整数值。例如160, 256等。\n如果在Auto.js中运行则为Auto.js的版本号；在打包的软件中则为打包软件的版本号。',
      helpUrl: helpUrl('appversionCode'),
    });
  }

  override toJavaScriptCodeInternal(): CodeDefinition {
    return ['app.versionCode', 0];
  }
}

export class AppVersionNameBlock extends CustomBlockEnhanced {
  type = 'app_version_name';

  defineBlock(): void {
    this.block.jsonInit({
      message0: '获取当前软件的版本名称',
      output: 'String',
      colour: colour,
      tooltip:
        "当前软件的版本名称，例如'3.0.0 Beta'\n如果在Auto.js中运行则为Auto.js的版本名称；在打包的软件中则为打包软件的版本名称。",
      helpUrl: helpUrl('appversionName'),
    });
  }

  override toJavaScriptCode(): CodeDefinition {
    return ['app.versionName', 0];
  }
}

export class AppAutojsBlock extends CustomBlockEnhanced {
  type = 'app_autojs';

  defineBlock(): void {
    this.block.jsonInit({
      message0: '获取当前autojs的 %1 ',
      args0: [
        {
          type: 'field_dropdown',
          name: 'KEY',
          options: [
            ['版本号', 'versionCode'],
            ['版本名', 'versionName'],
          ],
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: colour,
      tooltip: '',
      helpUrl: helpUrl('appautojsversioncode'),
    });
  }

  override toJavaScriptCodeInternal(arg: ArgumentReader): CodeDefinition {
    const value = arg('KEY');
    return `app.autojs.${value};\n`;
  }
}

export class AppLaunchBlock extends CustomBlockEnhanced {
  type = 'app_launch';

  defineBlock(): void {
    this.block.jsonInit({
      message0: '通过应用包名启动应用 %1 ',
      previousStatement: null,
      nextStatement: null,
      args0: [{ type: 'input_value', name: 'PACKAGE_NAME', check: 'String' }],
      colour: colour,
      tooltip:
        '如果该名称对应的应用不存在，则返回false; 否则返回true。如果该名称对应多个应用，则只启动其中某一个。',
      helpUrl: helpUrl('applaunchpackagename'),
    });
  }

  override toJavaScriptCodeInternal(arg: ArgumentReader): CodeDefinition {
    const packageName = arg('PACKAGE_NAME');
    return `app.launch(${packageName});\n`;
  }
}

export class AppLaunchAppBlock extends CustomBlockEnhanced {
  type = 'app_launch_app';

  defineBlock(): void {
    this.block.jsonInit({
      message0: '通过应用名称启动应用 %1 ',
      previousStatement: null,
      nextStatement: null,
      args0: [{ type: 'input_value', name: 'APP_NAME', check: 'String' }],
      colour: colour,
      tooltip:
        '如果该名称对应的应用不存在，则返回false; 否则返回true。如果该名称对应多个应用，则只启动其中某一个。',
      helpUrl: helpUrl('applaunchappappname'),
    });
  }

  override toJavaScriptCodeInternal(arg: ArgumentReader): CodeDefinition {
    const appName = arg('APP_NAME');
    return `app.launchApp(${appName});\n`;
  }
}

export class AppGetPackageNameBlock extends CustomBlockEnhanced {
  type = 'app_get_package_name';

  defineBlock(): void {
    this.block.jsonInit({
      message0: '获取应用名对应的包名 %1 ',
      previousStatement: null,
      nextStatement: null,
      args0: [{ type: 'input_value', name: 'APP_NAME', check: 'String' }],
      colour: colour,
      tooltip:
        '如果该找不到该应用，返回null；如果该名称对应多个应用，则只返回其中某一个的包名。。',
      helpUrl: helpUrl('appgetpackagenameappname'),
    });
  }

  override toJavaScriptCodeInternal(arg: ArgumentReader): CodeDefinition {
    const appName = arg('APP_NAME');
    return [`app.getPackageName(${appName})`, 0];
  }
}

export class AppGetAppNameBlock extends CustomBlockEnhanced {
  type = 'app_get_app_name';

  defineBlock(): void {
    this.block.jsonInit({
      message0: '获取包名对应的应用名 %1',
      previousStatement: null,
      nextStatement: null,
      args0: [{ type: 'input_value', name: 'PACKAGE_NAME', check: 'String' }],
      colour: colour,
      tooltip: '如果该找不到该应用，返回null。',
      helpUrl: helpUrl('appgetappnamepackagename'),
    });
  }

  override toJavaScriptCodeInternal(arg: ArgumentReader): CodeDefinition {
    const packageName = arg('PACKAGE_NAME');
    return `app.getAppName(${packageName})`;
  }
}

export class AppOpenAppSettingBlock extends CustomBlockEnhanced {
  type = 'app_open_app_setting';

  defineBlock(): void {
    this.block.jsonInit({
      message0: '打开应用的详情页',
      output: 'String',
      colour: colour,
      tooltip: '如果找不到该应用，返回false; 否则返回true。',
      helpUrl: helpUrl('appopenappsettingpackagename'),
    });
  }

  override toJavaScriptCode(): CodeDefinition {
    const code = 'app.openAppSetting';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  }
}

export class AppViewFileBlock extends CustomBlockEnhanced {
  type = 'app_view_file';

  defineBlock(): void {
    this.block.jsonInit({
      message0: '用其他应用查看文件 %1 ',
      previousStatement: null,
      nextStatement: null,
      args0: [{ type: 'input_value', name: 'PATH', check: 'String' }],
      colour: colour,
      tooltip:
        '文件不存在的情况由查看文件的应用处理。如果找不出可以查看该文件的应用，则抛出ActivityNotException。',
      helpUrl: helpUrl('appviewfilepath'),
    });
  }

  override toJavaScriptCodeInternal(arg: ArgumentReader): CodeDefinition {
    const path = arg('PATH');
    return `app.viewFile(${path});\n`;
  }
}

export class AppEditFileBlock extends CustomBlockEnhanced {
  type = 'app_edit_file';

  defineBlock(): void {
    this.block.jsonInit({
      message0: '用其他应用编辑文件 %1 ',
      previousStatement: null,
      nextStatement: null,
      args0: [{ type: 'input_value', name: 'PATH', check: 'String' }],
      colour: colour,
      tooltip:
        '文件不存在的情况由编辑文件的应用处理。如果找不出可以编辑该文件的应用，则抛出ActivityNotException。',
      helpUrl: helpUrl('appeditfilepath'),
    });
  }

  override toJavaScriptCodeInternal(arg: ArgumentReader): CodeDefinition {
    const path = arg('PATH');
    return `app.editFile(${path});\n`;
  }
}

export class AppUninstallBlock extends CustomBlockEnhanced {
  type = 'app_uninstall';

  defineBlock(): void {
    this.block.jsonInit({
      message0: '卸载应用 %1 ',
      previousStatement: null,
      nextStatement: null,
      args0: [{ type: 'input_value', name: 'PACKAGE_NAME', check: 'String' }],
      colour: colour,
      tooltip:
        '执行后会会弹出卸载应用的提示框。如果该包名的应用未安装，由应用卸载程序处理，可能弹出未找到应用的提示。',
      helpUrl: helpUrl('appuninstallpackagename'),
    });
  }

  override toJavaScriptCodeInternal(arg: ArgumentReader): CodeDefinition {
    const packageName = arg('PACKAGE_NAME');
    return `app.uninstall(${packageName});\n`;
  }
}

export class AppOpenUrlBlock extends CustomBlockEnhanced {
  type = 'app_open_url';

  defineBlock(): void {
    this.block.jsonInit({
      message0: '用浏览器打开网站url %1 ',
      previousStatement: null,
      nextStatement: null,
      args0: [{ type: 'input_value', name: 'URL', check: 'String' }],
      colour: colour,
      tooltip: '如果没有安装浏览器应用，则抛出ActivityNotException。',
      helpUrl: helpUrl('appopenurlurl'),
    });
  }

  override toJavaScriptCodeInternal(arg: ArgumentReader): CodeDefinition {
    const url = arg('URL');
    return `app.openUrl(${url});\n`;
  }
}

export class AppSendEmailBlock extends CustomBlockEnhanced {
  type = 'app_send_email';

  defineBlock(): void {
    this.block.jsonInit({
      type: 'app_send_email',
      message0: '根据选项options调用邮箱应用发送邮件 %1 ',
      previousStatement: null,
      nextStatement: null,
      args0: [{ type: 'input_value', name: 'OPTIONS', check: 'String' }], // TODO: arg type?
      colour: colour,
      tooltip:
        '如果该名称对应的应用不存在，则返回false; 否则返回true。如果该名称对应多个应用，则只启动其中某一个。',
      helpUrl: helpUrl('appsendemailoptions'),
    });
  }

  override toJavaScriptCodeInternal(arg: ArgumentReader): CodeDefinition {
    const options = arg('OPTIONS');
    return `app.sendEmail(${options});\n`;
  }
}

export class AppStartActivityBlock extends CustomBlockEnhanced {
  type = 'app_start_activity';

  defineBlock(): void {
    this.block.jsonInit({
      message0: '启动Auto.js界面 %1 ',
      previousStatement: null,
      nextStatement: null,
      args0: [{ type: 'input_value', name: 'NAME', check: 'String' }],
      colour: colour,
      tooltip:
        '该函数在Auto.js内运行则会打开Auto.js内的界面，在打包应用中运行则会打开打包应用的相应界面。',
      helpUrl: helpUrl('appstartactivityname'),
    });
  }

  override toJavaScriptCodeInternal(arg: ArgumentReader): CodeDefinition {
    const name = arg('NAME');
    return `app.startActivity(${name});\n`;
  }
}
