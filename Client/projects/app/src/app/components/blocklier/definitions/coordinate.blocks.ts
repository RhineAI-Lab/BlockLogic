import { BlocklierArgumentReader } from '../models/blocklier-argument-reader.class';
import {
  BlocklierCustomBlock,
  BlocklierCustomBlockCode,
  BlocklierCustomBlockWithJavaScript,
} from '../models/blocklier-custom-block.class';
import { helpUrlBuilder } from './common';

const colour = 230;
const helpUrl = helpUrlBuilder('coordinatesBasedAutomation');

@BlocklierCustomBlock.register({
  type: 'coordinate_set_screen',
  lines: [
    {
      message: '等比适应分辨率  宽: %1 高: %2',
      args: [
        { type: 'input_value', name: 'W', check: 'Number' },
        { type: 'input_value', name: 'H', check: 'Number', align: 'RIGHT' },
      ],
    },
  ],
  tooltip: '等比例缩放屏幕分辨率至指定分辨率',
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  colour,
  helpUrl: helpUrl('setscreenmetricswidth-height'),
})
export class Coordinate_coordinate_set_screen_Block
  extends BlocklierCustomBlock
  implements BlocklierCustomBlockWithJavaScript
{
  toJavaScript(args: BlocklierArgumentReader): BlocklierCustomBlockCode {
    const width = args.code('W');
    const height = args.code('H');
    return `setScreenMetrics(${width}, ${height});\n`;
  }
}

@BlocklierCustomBlock.register({
  type: 'coordinate_click',
  lines: [
    {
      message: '点击屏幕   坐标 X: %1 Y: %2',
      args: [
        { type: 'input_value', name: 'X', check: 'Number' },
        { type: 'input_value', name: 'Y', check: 'Number', align: 'RIGHT' },
      ],
    },
  ],
  tooltip: '根据坐标点击屏幕',
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  colour,
  helpUrl: helpUrl('clickx-y'),
})
export class Coordinate_coordinate_click_Block
  extends BlocklierCustomBlock
  implements BlocklierCustomBlockWithJavaScript
{
  toJavaScript(args: BlocklierArgumentReader): BlocklierCustomBlockCode {
    const x = args.code('X');
    const y = args.code('Y');
    return `click(${x}, ${y});\n`;
  }
}

@BlocklierCustomBlock.register({
  type: 'coordinate_long_click',
  lines: [
    {
      message: '长按屏幕   坐标 X: %1 Y: %2',
      args: [
        { type: 'input_value', name: 'X', check: 'Number' },
        { type: 'input_value', name: 'Y', check: 'Number', align: 'RIGHT' },
      ],
    },
  ],
  tooltip: '根据坐标长按屏幕',
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  colour,
  helpUrl: helpUrl('longclickx-y'),
})
export class Coordinate_coordinate_long_click_Block
  extends BlocklierCustomBlock
  implements BlocklierCustomBlockWithJavaScript
{
  toJavaScript(args: BlocklierArgumentReader): BlocklierCustomBlockCode {
    const x = args.code('X');
    const y = args.code('Y');
    return `longClick(${x}, ${y});\n`;
  }
}

@BlocklierCustomBlock.register({
  type: 'coordinate_press',
  lines: [
    {
      message: '按住屏幕   坐标 X: %1 Y: %2 时长(毫秒): %3',
      args: [
        { type: 'input_value', name: 'X', check: 'Number' },
        { type: 'input_value', name: 'Y', check: 'Number', align: 'RIGHT' },
        { type: 'input_value', name: 'D', check: 'Number', align: 'RIGHT' },
      ],
    },
  ],
  tooltip: '根据坐标按住屏幕',
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  colour,
  helpUrl: helpUrl('pressx-y-duration'),
})
export class Coordinate_coordinate_press_Block
  extends BlocklierCustomBlock
  implements BlocklierCustomBlockWithJavaScript
{
  toJavaScript(args: BlocklierArgumentReader): BlocklierCustomBlockCode {
    const x = args.code('X');
    const y = args.code('Y');
    const d = args.code('D');
    return `press(${x}, ${y}, ${d});\n`;
  }
}

@BlocklierCustomBlock.register({
  type: 'coordinate_swipe',
  lines: [
    {
      message:
        '滑动   起点坐标 X: %1 Y: %2 终点坐标 X: %3 Y: %4 时长(毫秒): %5',
      args: [
        { type: 'input_value', name: 'X1', check: 'Number' },
        { type: 'input_value', name: 'Y1', check: 'Number', align: 'RIGHT' },
        { type: 'input_value', name: 'X2', check: 'Number', align: 'RIGHT' },
        { type: 'input_value', name: 'Y2', check: 'Number', align: 'RIGHT' },
        { type: 'input_value', name: 'D', check: 'Number', align: 'RIGHT' },
      ],
    },
  ],
  tooltip: '根据坐标滑动屏幕',
  previousStatement: null,
  nextStatement: null,
  colour,
  helpUrl: helpUrl('swipex1-y1-x2-y2-duration'),
})
export class Coordinate_coordinate_swipe_Block
  extends BlocklierCustomBlock
  implements BlocklierCustomBlockWithJavaScript
{
  toJavaScript(args: BlocklierArgumentReader): BlocklierCustomBlockCode {
    const x1 = args.code('X1');
    const y1 = args.code('Y1');
    const x2 = args.code('X2');
    const y2 = args.code('Y2');
    const d = args.code('D');
    return `swipe(${x1}, ${y1}, ${x2}, ${y2}, ${d});\n`;
  }
}

@BlocklierCustomBlock.register({
  type: 'coordinate_root_tap',
  lines: [
    {
      message: '点击屏幕(Root权限)   坐标 X: %1 Y: %2',
      args: [
        { type: 'input_value', name: 'X', check: 'Number' },
        { type: 'input_value', name: 'Y', check: 'Number', align: 'RIGHT' },
      ],
    },
  ],
  tooltip: '根据坐标点击屏幕',
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  colour,
  helpUrl: helpUrl('tapx-y'),
})
export class Coordinate_coordinate_root_tap_Block
  extends BlocklierCustomBlock
  implements BlocklierCustomBlockWithJavaScript
{
  toJavaScript(args: BlocklierArgumentReader): BlocklierCustomBlockCode {
    const x = args.code('X');
    const y = args.code('Y');
    return `Tap(${x}, ${y});\n`;
  }
}

@BlocklierCustomBlock.register({
  type: 'coordinate_root_swipe',
  lines: [
    {
      message:
        '滑动(Root权限)   起点坐标 X: %1 Y: %2 终点坐标 X: %3 Y: %4 时长(毫秒): %5',
      args: [
        { type: 'input_value', name: 'X1', check: 'Number' },
        { type: 'input_value', name: 'Y1', check: 'Number', align: 'RIGHT' },
        { type: 'input_value', name: 'X2', check: 'Number', align: 'RIGHT' },
        { type: 'input_value', name: 'Y2', check: 'Number', align: 'RIGHT' },
        { type: 'input_value', name: 'D', check: 'Number', align: 'RIGHT' },
      ],
    },
  ],
  tooltip: '根据坐标滑动屏幕',
  previousStatement: null,
  nextStatement: null,
  colour,
  helpUrl: helpUrl('swipex1-y1-x2-y2-duration-1'),
})
export class Coordinate_coordinate_root_swipe_Block
  extends BlocklierCustomBlock
  implements BlocklierCustomBlockWithJavaScript
{
  toJavaScript(args: BlocklierArgumentReader): BlocklierCustomBlockCode {
    const x1 = args.code('X1');
    const y1 = args.code('Y1');
    const x2 = args.code('X2');
    const y2 = args.code('Y2');
    const d = args.code('D');
    return `Swipe(${x1}, ${y1}, ${x2}, ${y2}, ${d});\n`;
  }
}
