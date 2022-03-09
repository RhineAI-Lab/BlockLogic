/* eslint-disable @typescript-eslint/no-empty-interface */

import 'blockly/core';

declare module 'blockly/core' {
  export const JavaScript: JavaScriptGenerator;
  export const Dart: DartGenerator;
  export const Lua: LuaGenerator;
  export const PHP: PHPGenerator;
  export const Python: PythonGenerator;

  export interface JavaScriptGenerator extends Generator {
    // Orders from "https://developers.google.com/blockly/guides/create-custom-blocks/operator-precedence"
    ORDER_ATOMIC: 0; // 0 "" ...
    ORDER_NEW: 1.1; // new
    ORDER_MEMBER: 1.2; // . []
    ORDER_FUNCTION_CALL: 2; // ()
    ORDER_INCREMENT: 3; // ++
    ORDER_DECREMENT: 3; // --
    ORDER_BITWISE_NOT: 4.1; // ~
    ORDER_UNARY_PLUS: 4.2; // +
    ORDER_UNARY_NEGATION: 4.3; // -
    ORDER_LOGICAL_NOT: 4.4; // !
    ORDER_TYPEOF: 4.5; // typeof
    ORDER_VOID: 4.6; // void
    ORDER_DELETE: 4.7; // delete
    ORDER_AWAIT: 4.8; // await
    ORDER_EXPONENTIATION: 5.0; // **
    ORDER_MULTIPLICATION: 5.1; // *
    ORDER_DIVISION: 5.2; // /
    ORDER_MODULUS: 5.3; // %
    ORDER_SUBTRACTION: 6.1; // -
    ORDER_ADDITION: 6.2; // +
    ORDER_BITWISE_SHIFT: 7; // << >> >>>
    ORDER_RELATIONAL: 8; // < <= > >=
    ORDER_IN: 8; // in
    ORDER_INSTANCEOF: 8; // instanceof
    ORDER_EQUALITY: 9; // == != === !==
    ORDER_BITWISE_AND: 10; // &
    ORDER_BITWISE_XOR: 11; // ^
    ORDER_BITWISE_OR: 12; // |
    ORDER_LOGICAL_AND: 13; // &&
    ORDER_LOGICAL_OR: 14; // ||
    ORDER_CONDITIONAL: 15; // ?:
    ORDER_ASSIGNMENT: 16; // = += -= **= *= /= %= <<= >>= ...
    ORDER_YIELD: 16.5; // yield
    ORDER_COMMA: 17; // ,
    ORDER_NONE: 99; // (...)

    // TODO: remove
    valueToCode(
      block: Block,
      name: string,
      outerOrder: number,
      forceReturn?: boolean,
    ): string;
  }
  export interface DartGenerator extends Generator {}
  export interface LuaGenerator extends Generator {}
  export interface PHPGenerator extends Generator {}
  export interface PythonGenerator extends Generator {}

  /**
   * One of the built-in renderers.
   */
  export namespace geras {
    export class Renderer extends blockRendering.Renderer {}
    export class ConstantProvider extends blockRendering.ConstantProvider {}
  }
}
