import { Blockly, BlockMutator, Constructor, CustomBlock } from 'ngx-blockly';

export type CodeDefinition = string | [string, number];

/**
 * Better implementation of {@link CustomBlock}
 */
export abstract class CustomBlockEnhanced implements Omit<CustomBlock, ''> {
  static use(classRefs: (new () => CustomBlockEnhanced)[]): CustomBlock[] {
    return classRefs.map((classRef) => new classRef() as CustomBlock);
  }

  abstract type: string;
  blockMutator!: BlockMutator; // type assertion here because of the terrible original type
  args: unknown[] = [];

  kind = 'BLOCK';
  block!: Blockly.Block;
  disabled = false;

  // prettier-ignore
  get class(): Constructor { return this.constructor as Constructor }

  init(block: Blockly.Block): void {
    this.block = block;
    this.defineBlock();
    this.block.setOnChange(function (this: any, event) {
      this.blockInstance.onChange(event);
    });
  }

  abstract defineBlock(): void;

  onChange(_changeEvent: Blockly.Events.Abstract): void {}

  toXML(): string {
    return `<block type="${this.type}" disabled="${this.disabled}"></block>`;
  }

  toDartCode(_block: Blockly.Block): CodeDefinition {
    throw 'not implemented';
  }

  toJavaScriptCode(_block: Blockly.Block): CodeDefinition {
    throw 'not implemented';
  }

  toLuaCode(_block: Blockly.Block): CodeDefinition {
    throw 'not implemented';
  }

  toPHPCode(_block: Blockly.Block): CodeDefinition {
    throw 'not implemented';
  }

  toPythonCode(_block: Blockly.Block): CodeDefinition {
    throw 'not implemented';
  }
}
