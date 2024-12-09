import type { IsGreaterThan } from "../boolean-logic";
import type { If } from "../boolean-logic/branching/If";
import type { StrLen } from "../string-literals";
import type { AfterFirst } from "./AfterFirst";
import type { First } from "./First";

type Reduce<
  T extends readonly ([string, number])[],
  TMax extends number = 0,
  TVal extends string = "",
> = [] extends T
  ? TVal
  : Reduce<
    AfterFirst<T>,
    First<T> extends [string, infer Len extends number]
      ? If<
        IsGreaterThan<Len, TMax>,
        Len,
        TMax
      >
      : TMax,
    First<T> extends [infer Val extends string, infer Len extends number]
      ? If<
        IsGreaterThan<Len, TMax>,
        Val,
        TVal
      >
      : TVal
  >;

/**
 * **MaxLength**`<T>`
 *
 * Utility which reduces a tuple of strings to only the
 * string which is longest.
 */
export type MaxLength<T> =
T extends readonly string[]
  ? Reduce<{
    [K in keyof T]: T[K] extends string
      ? [T[K], StrLen<T[K]>]
      : never
  }>
  : never;
