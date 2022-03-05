import { Blockly } from 'ngx-blockly';

const colour = '#52a242';
const baseHelpUrl = 'https://pro.autojs.org/docs/#/zh-cn/app?id=';

Blockly.defineBlocksWithJsonArray([
  {
    type: '$power_manager_request_ignore_battery_optimizations2',
    message0: ' %1 忽略电池优化',
    args0: [
      {
        type: 'field_dropdown',
        name: 'BATTERY2',
        options: [
          ['正常请求', 'false'],
          ['强制请求', 'true'],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: colour,
    tooltip:
      '请求用户忽略对应用pkg的电池优化。系统将会弹出一个弹窗提示用户确认，这个过程是异步的，确认结果不会返回。',
    helpUrl:
      baseHelpUrl +
      'power_managerrequestignorebatteryoptimizationsforcerequest-pkg',
  },
  {
    type: '$power_manager_request_ignore_battery_optimizations',
    message0: '为其他应用 %1 忽略电池优化 包名: %2 ',
    args0: [
      {
        type: 'field_dropdown',
        name: 'BATTERY',
        options: [
          ['正常请求', 'false'],
          ['强制请求', 'true'],
        ],
      },
      { type: 'input_value', name: 'PKG', check: 'String' },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: colour,
    tooltip:
      '请求用户忽略对应用pkg的电池优化。系统将会弹出一个弹窗提示用户确认，这个过程是异步的，确认结果不会返回。',
    helpUrl:
      baseHelpUrl +
      'power_managerrequestignorebatteryoptimizationsforcerequest-pkg',
  },
  {
    type: '$power_manager_is_ignoring_battery_optimizations',
    message0: '本应用是否启用忽略电池优化',
    output: 'Boolean',
    colour: colour,
    tooltip: '返回当前是否对应用pkg启用了【忽略电池优化】。',
    helpUrl: baseHelpUrl + 'power_managerisignoringbatteryoptimizationspkg',
  },
  {
    type: '$power_manager_is_ignoring_battery_optimizations2',
    message0: '该应用是否启用忽略电池优化 %1 ',
    args0: [{ type: 'input_value', name: 'PKG', check: 'String' }],
    output: 'Boolean',
    colour: colour,
    tooltip: '返回当前是否对应用pkg启用了【忽略电池优化】。',
    helpUrl: baseHelpUrl + 'power_managerisignoringbatteryoptimizationspkg',
  },
]);
