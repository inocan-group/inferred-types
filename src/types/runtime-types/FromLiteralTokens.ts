import {
  If,
  StartsWith,
  AfterFirst,
  First,
  AlphaChar,
  Bracket,
  ClosingBracket,
  Digit,
  LowerAlphaChar,
  OpeningBracket,
  StripLeading,
  UpperAlphaChar,
  StringLiteralToken
} from "inferred-types/types";

type _Tokenize<T extends StringLiteralToken> = //
  If<
    StartsWith<T, "literal:">,
    StripLeading<T, "literal:">,
    T extends "<string>" ? `${string}`
    : T extends "<number>" ? `${number}`
    : T extends "<boolean>" ? `${boolean}`
    : T extends "<letter>" ? `${AlphaChar}`
    : T extends "<letter:lowercase>" ? `${LowerAlphaChar}`
    : T extends "<letter:uppercase>" ? `${UpperAlphaChar}`
    : T extends "<digit>" ? `${Digit}`
    : T extends "<bracket>" ? `${Bracket}`
    : T extends "<bracket:opening>" ? `${OpeningBracket}`
    : T extends "<bracket:closing>" ? `${ClosingBracket}`
    : never
  >;

type _Convert<
  T extends readonly StringLiteralToken[],
  Type extends string = ""
> = [] extends T
? Type
: _Convert<
    AfterFirst<T>,
    _Tokenize<First<T>> extends string
    ? `${Type}${_Tokenize<First<T>>}` extends StringLiteralToken
      ? `${Type}${_Tokenize<First<T>>}`
      : never
    : never
  >;

/**
 * **FromLiteralTokens**`<T>`
 *
 * Type utility which converts an array of `StringLiteralToken`'s
 * into a literal type.
 */
export type FromLiteralTokens<
  T extends readonly StringLiteralToken[]
> = _Convert<T>;
