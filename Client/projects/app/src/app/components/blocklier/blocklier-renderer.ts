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
}

Blockly.blockRendering.register(BlocklierRenderer.name, BlocklierRenderer);
