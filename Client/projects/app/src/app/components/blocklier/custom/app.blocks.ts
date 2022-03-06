import { Blockly } from 'ngx-blockly';

import { helpUrlBuilder } from './common';
import { CodeDefinition, CustomBlockEnhanced } from './custom-block-enhanced';

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

  override toJavaScriptCode(): CodeDefinition {
    const code = 'app.versionCode';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
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
    const code = 'app.versionName';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
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
          name: 'AUTO',
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

  override toJavaScriptCode(block: Blockly.Block): CodeDefinition {
    const name_value = Blockly.JavaScript.valueToCode(
      block,
      'AUTO',
      Blockly.JavaScript.ORDER_ATOMIC,
      true,
    );
    const code = 'app.autojs(' + name_value + ');\n';
    return code;
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

  override toJavaScriptCode(block: Blockly.Block): CodeDefinition {
    const name_value = Blockly.JavaScript.valueToCode(
      block,
      'PACKAGE_NAME',
      Blockly.JavaScript.ORDER_ATOMIC,
      true,
    );
    const code = 'app.lauch(' + name_value + ');\n';
    return code;
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

  override toJavaScriptCode(block: Blockly.Block): CodeDefinition {
    const name_value = Blockly.JavaScript.valueToCode(
      block,
      'APP_NAME',
      Blockly.JavaScript.ORDER_ATOMIC,
      true,
    );
    const code = 'app.lauchApp(' + name_value + ');\n';
    return code;
  }
}

export class AppGetPackageNameBlock extends CustomBlockEnhanced {
  type = 'app_get_package_name';

  defineBlock(): void {
    this.block.jsonInit({
      message0: '获取应用名对应的包名 %1 ',
      previousStatement: null,
      nextStatement: null,
      args0: [{ type: 'input_value', name: 'PACKAGE', check: 'String' }],
      colour: colour,
      tooltip:
        '如果该找不到该应用，返回null；如果该名称对应多个应用，则只返回其中某一个的包名。。',
      helpUrl: helpUrl('appgetpackagenameappname'),
    });
  }

  override toJavaScriptCode(): CodeDefinition {
    const code = 'app.getPackageName';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  }
}

export class AppGetAppNameBlock extends CustomBlockEnhanced {
  type = 'app_get_app_name';

  defineBlock(): void {
    this.block.jsonInit({
      message0: '获取包名对应的应用名 %1',
      previousStatement: null,
      nextStatement: null,
      args0: [{ type: 'input_value', name: 'GET', check: 'String' }],
      colour: colour,
      tooltip: '如果该找不到该应用，返回null。',
      helpUrl: helpUrl('appgetappnamepackagename'),
    });
  }

  override toJavaScriptCode(block: Blockly.Block): CodeDefinition {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const name_value = Blockly.JavaScript.valueToCode(
      block,
      'GET',
      Blockly.JavaScript.ORDER_ATOMIC,
      true,
    );
    const code = 'app.getAppName';
    return code;
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

export class AppViewfileBlock extends CustomBlockEnhanced {
  type = 'app_viewfile';

  defineBlock(): void {
    this.block.jsonInit({
      message0: '用其他应用查看文件 %1 ',
      previousStatement: null,
      nextStatement: null,
      args0: [{ type: 'input_value', name: 'VIEWFILE', check: 'String' }],
      colour: colour,
      tooltip:
        '文件不存在的情况由查看文件的应用处理。如果找不出可以查看该文件的应用，则抛出ActivityNotException。',
      helpUrl: helpUrl('appviewfilepath'),
    });
  }

  override toJavaScriptCode(block: Blockly.Block): CodeDefinition {
    const name_value = Blockly.JavaScript.valueToCode(
      block,
      'VIEWFILE',
      Blockly.JavaScript.ORDER_ATOMIC,
      true,
    );
    const code = 'app.viewFile(' + name_value + ');\n';
    return code;
  }
}

export class AppEditfileBlock extends CustomBlockEnhanced {
  type = 'app_editfile';

  defineBlock(): void {
    this.block.jsonInit({
      message0: '用其他应用编辑文件 %1 ',
      previousStatement: null,
      nextStatement: null,
      args0: [{ type: 'input_value', name: 'EDITFILE', check: 'String' }],
      colour: colour,
      tooltip:
        '文件不存在的情况由编辑文件的应用处理。如果找不出可以编辑该文件的应用，则抛出ActivityNotException。',
      helpUrl: helpUrl('appeditfilepath'),
    });
  }

  override toJavaScriptCode(block: Blockly.Block): CodeDefinition {
    const name_value = Blockly.JavaScript.valueToCode(
      block,
      'EDITFILE',
      Blockly.JavaScript.ORDER_ATOMIC,
      true,
    );
    const code = 'app.editFile(' + name_value + ');\n';
    return code;
  }
}

export class AppUninstallBlock extends CustomBlockEnhanced {
  type = 'app_uninstall';

  defineBlock(): void {
    this.block.jsonInit({
      message0: '卸载应用 %1 ',
      previousStatement: null,
      nextStatement: null,
      args0: [{ type: 'input_value', name: 'UNINSTALL', check: 'String' }],
      colour: colour,
      tooltip:
        '执行后会会弹出卸载应用的提示框。如果该包名的应用未安装，由应用卸载程序处理，可能弹出未找到应用的提示。',
      helpUrl: helpUrl('appuninstallpackagename'),
    });
  }

  override toJavaScriptCode(block: Blockly.Block): CodeDefinition {
    const name_value = Blockly.JavaScript.valueToCode(
      block,
      'UNINSTALL',
      Blockly.JavaScript.ORDER_ATOMIC,
      true,
    );
    const code = 'app.uninstall(' + name_value + ');\n';
    return code;
  }
}

export class AppOpenurlBlock extends CustomBlockEnhanced {
  type = 'app_openurl';

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

  override toJavaScriptCode(block: Blockly.Block): CodeDefinition {
    const name_value = Blockly.JavaScript.valueToCode(
      block,
      'URL',
      Blockly.JavaScript.ORDER_ATOMIC,
      true,
    );
    const code = 'app.openUrl(' + name_value + ');\n';
    return code;
  }
}

export class AppSendEmailBlock extends CustomBlockEnhanced {
  type = 'app_send_email';

  defineBlock(): void {
    this.block.jsonInit({
      message0: '根据选项options调用邮箱应用发送邮件 %1 ',
      previousStatement: null,
      nextStatement: null,
      args0: [{ type: 'input_value', name: 'EMAIL', check: 'String' }],
      colour: colour,
      tooltip:
        '如果该名称对应的应用不存在，则返回false; 否则返回true。如果该名称对应多个应用，则只启动其中某一个。',
      helpUrl: helpUrl('aappsendemailoptions'),
    });
  }

  override toJavaScriptCode(block: Blockly.Block): CodeDefinition {
    const name_value = Blockly.JavaScript.valueToCode(
      block,
      'OPTIONS',
      Blockly.JavaScript.ORDER_ATOMIC,
      true,
    );
    const code = 'app.sendEmail(' + name_value + ');\n';
    return code;
  }
}

export class AppStartActivityBlock extends CustomBlockEnhanced {
  type = 'app_start_activity';

  defineBlock(): void {
    this.block.jsonInit({
      message0: '启动Auto.js界面 %1 ',
      previousStatement: null,
      nextStatement: null,
      args0: [{ type: 'input_value', name: 'ACTIVITY', check: 'String' }],
      colour: colour,
      tooltip:
        '该函数在Auto.js内运行则会打开Auto.js内的界面，在打包应用中运行则会打开打包应用的相应界面。',
      helpUrl: helpUrl('appstartactivityname'),
    });
  }

  override toJavaScriptCode(block: Blockly.Block): CodeDefinition {
    const name_value = Blockly.JavaScript.valueToCode(
      block,
      'ACTIVITY',
      Blockly.JavaScript.ORDER_ATOMIC,
      true,
    );
    const code = 'app.startActivity(' + name_value + ');\n';
    return code;
  }
}
