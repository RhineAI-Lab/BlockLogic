import { Blockly } from 'ngx-blockly';

/**
 * @see https://github.com/google/blockly-samples/blob/master/codelabs/custom_renderer/custom_renderer.md
 */
export class BlocklierRenderer extends Blockly.blockRendering.Renderer {
  override makeConstants_(): Blockly.blockRendering.ConstantProvider {
    return new BlocklierRendererConstantProvider();
  }
}

class BlocklierRendererConstantProvider extends Blockly.blockRendering
  .ConstantProvider {
  override CORNER_RADIUS = 4;

  override makeNotch() {
    const width = this.NOTCH_WIDTH;
    const height = this.NOTCH_HEIGHT;
    const innerWidth = 7;
    const outerWidth = (width - innerWidth) / 2;
    function makeMainPath(dir: number) {
      return Blockly.utils.svgPaths.line([
        Blockly.utils.svgPaths.point(dir * outerWidth, height),
        Blockly.utils.svgPaths.point(dir * innerWidth, 0),
        Blockly.utils.svgPaths.point(dir * outerWidth, -height),
      ]);
    }
    const pathLeft = makeMainPath(1);
    const pathRight = makeMainPath(-1);
    return { type: this.SHAPES.NOTCH, width, height, pathLeft, pathRight };
  }
}

Blockly.blockRendering.register(BlocklierRenderer.name, BlocklierRenderer);
