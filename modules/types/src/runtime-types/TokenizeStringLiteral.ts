import type {
  AfterFirst,
  AllLiteral,
  AsString,
  First,
  If,
  IsNumber,
  Passthrough,
  StringLiteralToken,
} from "inferred-types/types";

type _Tokenize<
  T extends readonly (string | number | boolean)[],
  Results extends readonly StringLiteralToken[] = [],
> = [] extends T
  ? Results
  : First<T> extends StringLiteralToken
    ? _Tokenize<AfterFirst<T>, [...Results, First<T>]>
    : If<
      AllLiteral<[First<T>]>,
      // literal value
      _Tokenize<
        AfterFirst<T>,
        [
          ...Results,
          `literal:${AsString<First<T>>}`,
        ]
      >,
      // non-literal value
      _Tokenize<
        AfterFirst<T>,
        [
          ...Results,
          Passthrough<
            If<
              First<T> extends string ? true : false,
              "<string>",
              If<IsNumber<First<T>>, "<number>", "<boolean>">
            >,
            StringLiteralToken,
            never
          >,
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
  T extends readonly (string | number | boolean)[],
> = _Tokenize<T>;
