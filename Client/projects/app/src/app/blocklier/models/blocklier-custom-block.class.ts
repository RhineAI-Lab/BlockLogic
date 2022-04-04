import * as Blockly from 'blockly';

import { BlocklierArgumentReader } from './blocklier-argument-reader.class';

const DEFINITION = Symbol('definition');

/**
 * Abstraction of a Blockly Custom Block.
 */
export abstract class BlocklierCustomBlock {
  static registry = new Set<BlocklierCustomBlockConstructor>();

  static register =
    (definition: BlocklierCustomBlockDefinition) =>
    (classRef: BlocklierCustomBlockConstructor): void => {
      classRef.prototype[DEFINITION] = definition;
      this.registry.add(classRef);
      this.registerBlock(classRef);
      this.registerGenerators(classRef);
    };

  static getDefinition(
    classRef: BlocklierCustomBlockConstructor,
  ): BlocklierCustomBlockDefinition {
    return classRef.prototype[DEFINITION];
  }

  private static registerBlock(classRef: BlocklierCustomBlockConstructor) {
    const definition = this.getDefinition(classRef);
    const definitionFinal: Record<string, unknown> = { ...definition };
    definition.lines.forEach(({ message, args }, index) => {
      definitionFinal[`message${index}`] = message;
      if (args) definitionFinal[`args${index}`] = args;
    });
    Blockly.Blocks[definition.type] = {
      init(this: Blockly.Block & WithBlocklier) {
        this.jsonInit(definitionFinal);
        this.blocklier = new classRef(this);
      },
    };
  }

  private static registerGenerators(classRef: BlocklierCustomBlockConstructor) {
    const type = this.getDefinition(classRef).type;
    const register = (
      generator: Blockly.Generator,
      handler: (
        model: BlocklierCustomBlockWithAll,
      ) => (reader: BlocklierArgumentReader) => void,
    ) => {
      if (!generator) return;
      const registry: Record<string, any> = generator;
      registry[type] = (block: Blockly.Block & WithBlocklier) => {
        const reader = new BlocklierArgumentReader(generator, block);
        const model = block.blocklier as BlocklierCustomBlockWithAll;
        return handler(model)?.bind(model)(reader);
      };
    };
    register(Blockly.JavaScript, (m) => m.toJavaScript);
    register(Blockly.Dart, (m) => m.toDart);
    register(Blockly.Lua, (m) => m.toLua);
    register(Blockly.PHP, (m) => m.toPHP);
    register(Blockly.Python, (m) => m.toPython);
  }

  [DEFINITION]: BlocklierCustomBlockDefinition;

  constructor(public block: Blockly.Block & WithBlocklier) {}
}

export interface BlocklierCustomBlockConstructor {
  new (block: Blockly.Block & WithBlocklier): BlocklierCustomBlock;
  prototype: BlocklierCustomBlock;
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
  type: string;
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

interface WithBlocklier {
  blocklier: BlocklierCustomBlock;
}
