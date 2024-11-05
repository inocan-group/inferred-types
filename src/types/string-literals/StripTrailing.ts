import type {  And,  IsStringLiteral,  AsNumber } from "inferred-types/dist/types/index";


type Process<
  TContent extends string,
  TStrip extends string
> = And<[ IsStringLiteral<TContent>, IsStringLiteral<TStrip>]> extends true
  ? TContent extends `${infer Before}${TStrip}`
    ? Before
    : TContent
  : string;

/**
 * **StripEnding**`<TContent, TStrip>`
 *
 * Will strip off `TStrip` from the ending of `TContent` when
 * it is found.
 *
 * ```ts
 * type T = "Hello World";
 * type U = " World";
 * // "Hello"re
 * type R = StripEnding<T,U>;
 * ```
 */
export type StripTrailing<
  TContent extends string|number,
  TStrip extends string|number
> = TContent extends number
? AsNumber<
    Process<
      `${TContent}`,
      `${TStrip}`
    > extends `${number}`
      ? Process<
          `${TContent}`,
          `${TStrip}`
        >
      : never
  >
: TContent extends string
  ? Process<
      `${TContent}`,
      `${TStrip}`
    > extends string
      ? Process<
          `${TContent}`,
          `${TStrip}`
        >
      : never
  : never;
