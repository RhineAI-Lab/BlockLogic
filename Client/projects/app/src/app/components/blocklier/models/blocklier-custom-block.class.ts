import * as Blockly from 'blockly';

import { BlocklierArgumentReader } from './blocklier-argument-reader.class';

/**
 * Abstraction of a Blockly Custom Block.
 */
export abstract class BlocklierCustomBlock {
  /* eslint-disable @typescript-eslint/no-unused-vars */

  static register =
    () =>
    (classRef: new () => BlocklierCustomBlock): void => {
      const instance = new classRef();
      this.registerBlock(instance);
      this.registerGenerators(instance);
    };

  private static registerBlock(instance: BlocklierCustomBlock) {
    Blockly.Blocks[instance.type] = {
      init(this: Blockly.Block) {
        const { lines, ...definitions } = instance.definition;
        const result = definitions as Record<string, unknown>;
        lines.forEach(({ message, args }, index) => {
          result[`message${index}`] = message;
          if (args) result[`args${index}`] = args;
        });
        this.jsonInit(result);
      },
    };
  }

  private static registerGenerators(instance: BlocklierCustomBlock) {
    const register = (
      generator: Blockly.Generator,
      method: (reader: BlocklierArgumentReader) => BlocklierCustomBlockCode,
    ) => {
      const registry = generator as unknown as Record<
        string,
        (block: Blockly.Block) => BlocklierCustomBlockCode
      >;
      registry[instance.type] = (block) =>
        method(new BlocklierArgumentReader(generator, block));
    };
    const i = instance as Partial<BlocklierCustomBlockWithAll>;
    if (i.toJavaScript) register(Blockly.JavaScript, i.toJavaScript.bind(i));
    if (i.toDart) register(Blockly.Dart, i.toDart.bind(i));
    if (i.toLua) register(Blockly.Lua, i.toLua.bind(i));
    if (i.toPHP) register(Blockly.PHP, i.toPHP.bind(i));
    if (i.toPython) register(Blockly.Python, i.toPython.bind(i));
  }

  abstract type: string;
  abstract definition: BlocklierCustomBlockDefinition;

  /* eslint-enable @typescript-eslint/no-unused-vars */
}

export interface BlocklierCustomBlockWithJavaScript
  extends BlocklierCustomBlock {
  toJavaScript(args: BlocklierArgumentReader): BlocklierCustomBlockCode;
}
export interface BlocklierCustomBlockWithDart extends BlocklierCustomBlock {
  toDart(args: BlocklierArgumentReader): BlocklierCustomBlockCode;
}
export interface BlocklierCustomBlockWithLua extends BlocklierCustomBlock {
  toLua(args: BlocklierArgumentReader): BlocklierCustomBlockCode;
}
export interface BlocklierCustomBlockWithPHP extends BlocklierCustomBlock {
  toPHP(args: BlocklierArgumentReader): BlocklierCustomBlockCode;
}
export interface BlocklierCustomBlockWithPython extends BlocklierCustomBlock {
  toPython(args: BlocklierArgumentReader): BlocklierCustomBlockCode;
}
export type BlocklierCustomBlockWithAll = BlocklierCustomBlockWithJavaScript &
  BlocklierCustomBlockWithDart &
  BlocklierCustomBlockWithLua &
  BlocklierCustomBlockWithPHP &
  BlocklierCustomBlockWithPython;

export type BlocklierCustomBlockCode = string | [string, number];
export type BlocklierCustomBlockDefinition = {
  lines: { message: string; args?: any }[];
  previousStatement?: null | string;
  nextStatement?: null | string;
  output?: null | string | string[];
  inputsInline?: boolean;
  colour?: string | number;
  tooltip?: string;
  style?: string;
  helpUrl?: string;
};
