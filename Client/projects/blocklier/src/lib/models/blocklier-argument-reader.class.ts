import * as Blockly from 'blockly';

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
