import {
  Blockly,
  BlockMutator,
  CustomBlock,
  NgxBlocklyComponent,
} from 'ngx-blockly';

export type BlocklierCodeDefinition = string | [string, number];
export type BlocklierBlockDefinition = {
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

/**
 * Better implementation of {@link CustomBlockBase}
 */
export abstract class BlocklierCustomBlock
  implements
    Omit<
      CustomBlock,
      'kind' | 'block' | 'class' | 'blockMutator' | 'defineBlock' | 'onChange'
    >
{
  /* eslint-disable @typescript-eslint/no-unused-vars */

  static register =
    () =>
    (target: new () => BlocklierCustomBlock): void =>
      NgxBlocklyComponent.initCustomBlocks([
        new target() as unknown as CustomBlock,
      ]);

  abstract type: string;
  definition?: BlocklierBlockDefinition;
  block!: Blockly.Block;
  mutator?: BlockMutator;
  disabled = false;
  args: unknown[] = [];

  constructor() {
    this.p('kind', 'BLOCK');
    this.p('class', this.constructor);
    this.p('blockMutator', this.mutator);
  }

  init(block: Blockly.Block): void {
    this.block = block;
    this.define();
    this.block.setOnChange(this.onChange.bind(this));
  }

  toXML(): string {
    return `<block type="${this.type}" disabled="${this.disabled}"></block>`;
  }

  toDartCode(): BlocklierCodeDefinition {
    return this.toDart(new BlocklierArgumentReader(Blockly.Dart, this.block));
  }
  toJavaScriptCode(): BlocklierCodeDefinition {
    return this.toJS(
      new BlocklierArgumentReader(Blockly.JavaScript, this.block),
    );
  }
  toLuaCode(): BlocklierCodeDefinition {
    return this.toLua(new BlocklierArgumentReader(Blockly.Lua, this.block));
  }
  toPHPCode(): BlocklierCodeDefinition {
    return this.toPHP(new BlocklierArgumentReader(Blockly.PHP, this.block));
  }
  toPythonCode(): BlocklierCodeDefinition {
    return this.toPython(
      new BlocklierArgumentReader(Blockly.Python, this.block),
    );
  }

  protected define(): void {
    if (this.definition) {
      const { lines, ...definition } = this.definition;
      const result: any = definition;
      lines.forEach((line, index) => {
        result[`message${index}`] = line.message;
        if (line.args) result[`args${index}`] = line.args;
      });
      this.block.jsonInit(result);
    }
  }

  protected toDart(args: BlocklierArgumentReader): BlocklierCodeDefinition {
    throw 'not implemented';
  }
  protected toJS(args: BlocklierArgumentReader): BlocklierCodeDefinition {
    throw 'not implemented';
  }
  protected toLua(args: BlocklierArgumentReader): BlocklierCodeDefinition {
    throw 'not implemented';
  }
  protected toPHP(args: BlocklierArgumentReader): BlocklierCodeDefinition {
    throw 'not implemented';
  }
  protected toPython(args: BlocklierArgumentReader): BlocklierCodeDefinition {
    throw 'not implemented';
  }

  protected onChange(changeEvent: Blockly.Events.Abstract): void {}

  private p(name: string, value: unknown) {
    Object.defineProperty(this, name, {
      value,
      configurable: true,
      enumerable: true,
    });
  }

  /* eslint-enable @typescript-eslint/no-unused-vars */
}

export class BlocklierArgumentReader {
  constructor(
    public generator: Blockly.Generator,
    private block: Blockly.Block,
  ) {}

  value(name: string): string {
    return this.block.getFieldValue(name);
  }

  code(name: string, statement = false): string {
    return statement
      ? this.generator.statementToCode(this.block, name)
      : this.generator.valueToCode(this.block, name, 0);
  }
}
