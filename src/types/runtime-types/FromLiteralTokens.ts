import { IfStartsWith } from "../boolean-logic";
import { AfterFirst, First } from "../lists";
import { Alpha, Bracket, ClosingBracket, Digit, LowerAlpha, OpeningBracket, StripLeading, UpperAlpha } from "../string-literals";
import { StringLiteralToken } from "./StringLiteralToken";

type _Tokenize<T extends StringLiteralToken> = //
  IfStartsWith<
    T, "literal:", 
    StripLeading<T, "literal:">,
    T extends "<string>" ? `${string}`
    : T extends "<number>" ? `${number}`
    : T extends "<boolean>" ? `${boolean}`
    : T extends "<letter>" ? `${Alpha}`
    : T extends "<letter:lowercase>" ? `${LowerAlpha}`
    : T extends "<letter:uppercase>" ? `${UpperAlpha}`
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
