import * as Blockly from 'blockly';

const colorChooseTool = '#d7ac87';

export class BlocklierTheme {
  private static blockColors = `
default 38b793 默认
logic 45a92d 逻辑
loop 487ce3 循环
math 3d98e3 数学
text dc7f3b 文本
list 38b793 列表 集合
class 7658ee 对象
colour d7ac87 颜色
variable e35881 变量
procedure dc6161 函数
puzzle 888888 自定义块

module f85c5c 模型定义
layer ff7a41 内置模型/层
transforms 38b793 数据增强
learner 009561 学习
data 487ce3 数据导入
tensor 3abcd3 张量
numpy 3abcd3 Numpy
time 38b793 时间
opencv 52c5e8 图像读写 图像处理

console 0eaf9e 控制台
device 3264e1 设备
device_msg 698a8a 设备信息
dialog 9abc86 对话框
files b9993d 文件系统
global 7476c6 全局
http 339999 HTTP
intent 8e30be 意图
media d4285c 多媒体
plugins e5af00 插件
power_manager 52a242 电源管理
root_automator e6645c 触摸模拟对象
setting c68a16 设置
simple 90b01f 快捷控件操作
storages cb863a 本地存储
temp 3264e1 临时
ui 3c2eaf 界面 文本控件 按钮控件
widget 2196F3 基于控件操作
app c6a000 应用
auto e5af00 无障碍服务
coordinate 5A66A4 基于坐标操作
crypto 88282a 摘要/加密
debug cc9999 调试工具
  `;

  static blockStyles: any = {};
  static colorsMap = new Map();
  static {
    for (const line of this.blockColors.split('\n')) {
      const args = line.trim().split(' ');
      if (args.length < 2) continue;
      this.blockStyles[args[0] + '_blocks'] = { colourPrimary: '#' + args[1] };
      for (let i = 2; i < args.length; i++) {
        this.colorsMap.set(args[i], '#' + args[1]);
      }
    }
  }
  static theme = Blockly.Theme.defineTheme('b-base', {
    base: 'classic',
    blockStyles: this.blockStyles,
  });

  static themeLight = Blockly.Theme.defineTheme('b-light', {
    base: 'b-base',
    flyoutForegroundColour: '#2b2b2b',
  });
  static themeDark = Blockly.Theme.defineTheme('b-dark', {
    base: 'b-base',
    componentStyles: {
      workspaceBackgroundColour: '#1e1e1e',
      flyoutBackgroundColour: '#2b2c2d',
      flyoutForegroundColour: '#c6c6c6',
      scrollbarColour: '#666',
    },
  });
}

export function themeColor(key: string): string {
  if (key.startsWith('#')) {
    return key;
  }
  const style = BlocklierTheme.theme.blockStyles[key + '_blocks'];
  return style ? style.colourPrimary : '#aaaaaa';
}
