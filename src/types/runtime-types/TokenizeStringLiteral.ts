import { IfLiteral, IfNumber, IfString } from "../boolean-logic";
import { AfterFirst, First } from "../lists";
import { ToString } from "../type-conversion";
import { StringLiteralToken } from "./StringLiteralToken";

type _Tokenize<
  T extends readonly (string | number | boolean)[],
  Results extends readonly StringLiteralToken[] = []
> = [] extends T
  ? Results
  : First<T> extends StringLiteralToken
  ? _Tokenize<AfterFirst<T>, [...Results, First<T>]>
  : IfLiteral<
      First<T>,
      // literal value
      _Tokenize<
        AfterFirst<T>,
        [...Results, `literal:${ToString<First<T>>}`]
      >,
      // non-literal value
      _Tokenize<
        AfterFirst<T>,
        [
          ...Results,
          IfString<
            First<T>, 
            "<string>", 
            IfNumber<First<T>, "<number>", "<boolean>">
          >
        ]
      >
      
    >;


/**
 * **TokenizeStringLiteral**`<T>`
 * 
 * Type utility which receives a list of _tokens_ which are intended
 * to represent the underlying type of a string literal. This utility
 * will ensure that known tokens -- those delimited by `<` and `>` symbols
 * are maintained but that any _string literals_ are prefixed with "literal:".
 * 
 * - a wide _number_ or _boolean_ type will be converted to `${number}` and `${boolean}`
 * - literal values for number and boolean will be converted to a string using `ToString<T>`
 * 
 * **Related:** `ToStringLiteral<T>`
 */
export type TokenizeStringLiteral<
  T extends readonly (string | number | boolean)[]
> = _Tokenize<T>;
