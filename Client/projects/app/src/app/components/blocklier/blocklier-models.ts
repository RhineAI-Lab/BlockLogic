import {
  Blockly,
  BlockMutator,
  CustomBlock as CustomBlockBase,
} from 'ngx-blockly';

export type CodeDefinition = string | [string, number];
export type BlockDefinition = {
  lines: { message: string; args?: any }[];
  previousStatement?: null | string;
  nextStatement?: null | string;
  output?: null | string | string[];
  inputsInline?: boolean;
  colour?: string;
  tooltip?: string;
  style?: string;
  helpUrl?: string;
};

export type ArgumentReader = (name: string) => string;

/**
 * Better implementation of {@link CustomBlockBase}
 */
export abstract class CustomBlock
  implements
    Omit<
      CustomBlockBase,
      'kind' | 'block' | 'class' | 'blockMutator' | 'defineBlock' | 'onChange'
    >
{
  /* eslint-disable @typescript-eslint/no-unused-vars */

  static use(classRefs: (new () => CustomBlock)[]): CustomBlockBase[] {
    return classRefs.map(
      (classRef) => new classRef() as unknown as CustomBlockBase,
    );
  }

  abstract type: string;
  definition?: BlockDefinition;
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

  toDartCode(): CodeDefinition {
    return this.dart((name) => Blockly.Dart.valueToCode(this.block, name, 0));
  }
  toJavaScriptCode(): CodeDefinition {
    return this.js((name) =>
      Blockly.JavaScript.valueToCode(this.block, name, 0),
    );
  }
  toLuaCode(): CodeDefinition {
    return this.lua((name) => Blockly.Lua.valueToCode(this.block, name, 0));
  }
  toPHPCode(): CodeDefinition {
    return this.php((name) => Blockly.PHP.valueToCode(this.block, name, 0));
  }
  toPythonCode(): CodeDefinition {
    return this.python((name) =>
      Blockly.Python.valueToCode(this.block, name, 0),
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

  protected dart(arg: ArgumentReader): CodeDefinition {
    throw 'not implemented';
  }
  protected js(arg: ArgumentReader): CodeDefinition {
    throw 'not implemented';
  }
  protected lua(arg: ArgumentReader): CodeDefinition {
    throw 'not implemented';
  }
  protected php(arg: ArgumentReader): CodeDefinition {
    throw 'not implemented';
  }
  protected python(arg: ArgumentReader): CodeDefinition {
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
