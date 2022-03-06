/* eslint-disable @typescript-eslint/no-unused-vars */
import { Blockly, BlockMutator, Constructor, CustomBlock } from 'ngx-blockly';

export const helpUrlBuilder =
  (scope: string) =>
  (id: string): string =>
    `https://pro.autojs.org/docs/#/zh-cn/${scope}?id=${id}`;

export type CodeDefinition = string | [string, number];
export type ArgumentReader = (name: string) => string;

/**
 * Better implementation of {@link CustomBlock}
 */
export abstract class CustomBlockEnhanced implements Omit<CustomBlock, ''> {
  static use(classRefs: (new () => CustomBlockEnhanced)[]): CustomBlock[] {
    return classRefs.map(
      (classRef) => new classRef() as unknown as CustomBlock,
    );
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
    this.block.setOnChange(this.onChange.bind(this));
  }

  abstract defineBlock(): void;

  onChange(changeEvent: Blockly.Events.Abstract): void {}

  toXML(): string {
    return `<block type="${this.type}" disabled="${this.disabled}"></block>`;
  }

  toDartCode(): CodeDefinition {
    return this.toDartCodeInternal((name) =>
      Blockly.Dart.valueToCode(this.block, name, 0),
    );
  }
  toJavaScriptCode(): CodeDefinition {
    return this.toJavaScriptCodeInternal((name) =>
      Blockly.JavaScript.valueToCode(this.block, name, 0),
    );
  }
  toLuaCode(): CodeDefinition {
    return this.toLuaCodeInternal((name) =>
      Blockly.Lua.valueToCode(this.block, name, 0),
    );
  }
  toPHPCode(): CodeDefinition {
    return this.toPHPCodeInternal((name) =>
      Blockly.PHP.valueToCode(this.block, name, 0),
    );
  }
  toPythonCode(): CodeDefinition {
    return this.toPythonCodeInternal((name) =>
      Blockly.Python.valueToCode(this.block, name, 0),
    );
  }

  toDartCodeInternal(arg: ArgumentReader): CodeDefinition {
    throw 'not implemented';
  }
  toJavaScriptCodeInternal(arg: ArgumentReader): CodeDefinition {
    throw 'not implemented';
  }
  toLuaCodeInternal(arg: ArgumentReader): CodeDefinition {
    throw 'not implemented';
  }
  toPHPCodeInternal(arg: ArgumentReader): CodeDefinition {
    throw 'not implemented';
  }
  toPythonCodeInternal(arg: ArgumentReader): CodeDefinition {
    throw 'not implemented';
  }
}
