import { IfStartsWith, AfterFirst, First, AlphaChar, Bracket, ClosingBracket, Digit, LowerAlphaChar, OpeningBracket, StripLeading, UpperAlphaChar, StringLiteralToken } from "..";

type _Tokenize<T extends StringLiteralToken> = //
  IfStartsWith<
    T, "literal:", 
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
    `${Type}${_Tokenize<First<T>>}`
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
