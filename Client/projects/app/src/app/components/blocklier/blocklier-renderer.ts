import * as Blockly from 'blockly';

/**
 * @see https://github.com/google/blockly-samples/blob/master/codelabs/custom_renderer/custom_renderer.md
 */
export class BlocklierRenderer extends Blockly.geras.Renderer {
  override makeConstants_(): Blockly.geras.ConstantProvider {
    return new BlocklierRendererConstantProvider();
  }
}

class BlocklierRendererConstantProvider extends Blockly.geras.ConstantProvider {
  override CORNER_RADIUS = 4;

  override FIELD_TEXT_BASELINE_CENTER = false;

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

  override makeOutsideCorners() {
    const radius = this.CORNER_RADIUS;

    const topLeft =
      Blockly.utils.svgPaths.moveBy(0, radius) +
      Blockly.utils.svgPaths.line([
        Blockly.utils.svgPaths.point(radius, -radius),
      ]);

    const topRight = Blockly.utils.svgPaths.arc(
      'a',
      '0 0,1',
      radius,
      Blockly.utils.svgPaths.point(radius, radius),
    );

    const bottomLeft = Blockly.utils.svgPaths.line([
      Blockly.utils.svgPaths.point(-radius, -radius),
    ]);

    const bottomRight = Blockly.utils.svgPaths.arc(
      'a',
      '0 0,1',
      radius,
      Blockly.utils.svgPaths.point(-radius, radius),
    );

    return {
      topLeft: topLeft,
      topRight: topRight,
      bottomRight: bottomRight,
      bottomLeft: bottomLeft,
      rightHeight: radius,
    };
  }
}

Blockly.blockRendering.register(BlocklierRenderer.name, BlocklierRenderer);
