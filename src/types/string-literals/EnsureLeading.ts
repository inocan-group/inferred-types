
import { AsNumber, AsString, If, StartsWith, IsWideType } from "src/types/index";

type Process<
  TContent extends string, 
  TLeading extends string
>= If<
  IsWideType<TLeading>,
  `${string}${TContent}`,
  If<
    IsWideType<TContent>,
    `${TLeading}${string}`,
    If<
      StartsWith<TContent, TLeading>,
      TContent,
      `${TLeading}${TContent}`
    >
  >
>

type PreProcess<
  TContent extends string | number, 
  TLeading extends string | number
> = If<
IsWideType<TContent>,
If<
  IsWideType<TLeading>,
  // string | number
  TContent,
  TLeading extends number
    ? TContent extends number
      ? AsNumber<Process<AsString<TContent>,AsString<TLeading>>>
      : Process<AsString<TContent>,AsString<TLeading>>
    : Process<AsString<TContent>,AsString<TLeading>>
  >,
  TContent extends number
    ? AsNumber<
        Process<AsString<TContent>, AsString<TLeading>>
      >
    : Process<AsString<TContent>, AsString<TLeading>>
>

type IterateOver<
  TContent extends readonly (string | number)[],
  TLeading extends string | number
> = {
  [K in keyof TContent]: PreProcess<TContent[K], TLeading>
}

/**
 * **EnsureLeading**`<TContent, TLeading>`
 *
 * Will ensure that `TContent` _starts with_ the `TLeading`; adding 
 * it when it wasn't present or proxying the value through when it was.
 * 
 * **Note:** you can use both _string_ or _numeric_ values for both
 * parameters.
 *
 * ```ts
 * type T = "World";
 * type U = "Hello ";
 * // "Hello World"
 * type R = EnsureLeading<T,U>;
 * ```
 * 
 * **Related:** `EnsureLeadingEvery`, `EnsureTrailing`, `EnsureSurround`, `Surround`
 */
export type EnsureLeading<
  TContent extends string | number | readonly (string|number)[], 
  TLeading extends string | number
> = TContent extends readonly (string|number)[]
? IterateOver<TContent,TLeading>
: TContent extends string | number
  ? PreProcess<TContent,TLeading>
  : never;
