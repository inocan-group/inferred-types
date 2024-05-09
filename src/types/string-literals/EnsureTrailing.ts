
import { AsNumber, AsString, If,  IsWideType, EndsWith } from "src/types/index";

type Process<
  TContent extends string, 
  TTrailing extends string
>= If<
  IsWideType<TContent>,
  `${string}${TTrailing}`,
  If<
    IsWideType<TTrailing>,
    `${TContent}${string}`,
    If<
      EndsWith<TContent, TTrailing>,
      TContent,
      `${TContent}${TTrailing}`
    >
  >
>

type PreProcess<
  TContent extends string | number, 
  TTrailing extends string | number
> = If<
IsWideType<TContent>,
If<
  IsWideType<TTrailing>,
  // string | number
  TContent,
  TTrailing extends number
    ? TContent extends number
      ? AsNumber<Process<AsString<TContent>,AsString<TTrailing>>>
      : Process<AsString<TContent>,AsString<TTrailing>>
    : Process<AsString<TContent>,AsString<TTrailing>>
  >,
  TContent extends number
    ? AsNumber<
        Process<AsString<TContent>, AsString<TTrailing>>
      >
    : Process<AsString<TContent>, AsString<TTrailing>>
>

type IterateOver<
  TContent extends readonly (string | number)[],
  TLeading extends string | number
> = {
  [K in keyof TContent]: PreProcess<TContent[K], TLeading>
}

/**
 * **EnsureTrailing**`<TContent, TTrailing>`
 *
 * Will ensure that `T` ends with the substring `U` when
 * both are string literals.
 *
 * ```ts
 * type T = "Hello";
 * type U = " World";
 * // "Hello World"
 * type R = EnsureTrailing<T,U>;
 * ```
 */
export type EnsureTrailing<
  TContent extends string | number | readonly (string|number)[], 
  TTrailing extends string | number
> = TContent extends readonly (string|number)[]
? IterateOver<TContent,TTrailing>
: TContent extends string | number
  ? PreProcess<TContent,TTrailing>
  : never;
