import type {
  AsNumber,
  AsString,
  IsString,
  IsWideType,
} from "inferred-types/types";

type P<
  TContent extends string,
  TTrailing extends string,
> = TContent extends `${string}${TTrailing}`
  ? TContent
  : `${TContent}${TTrailing}`;

type IterateOver<
  TContent extends readonly unknown[],
  TTrailing extends string,
> = {
  [K in keyof TContent]: TContent[K] extends string
    ? P<TContent[K], TTrailing>
    : TContent[K] extends number
      ? AsNumber<P<`${TContent[K]}`, TTrailing>>
      : P<`${AsString<TContent[K]>}`, TTrailing>
};

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
  TContent extends string | number | readonly (string | number)[],
  TTrailing extends string | number,
> = IsWideType<TContent> extends true
  ? IsWideType<TTrailing> extends true
    ? TContent
    : `${string}${TTrailing}`
  : IsWideType<TTrailing> extends true
    ? IsString<TContent> extends true
      ? `${AsString<TContent>}${string}`
      : never
    : TContent extends number
      ? AsNumber<P<`${TContent}`, `${TTrailing}`>>
      : TContent extends string
        ? P<TContent, `${TTrailing}`>
        : TContent extends readonly unknown[]
          ? IterateOver<TContent, `${TTrailing}`>
          : never;
