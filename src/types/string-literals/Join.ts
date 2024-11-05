import {
  IsGreaterThan,
  AfterFirst,
  First,
  ToStringArray,
  TakeFirst
} from "inferred-types/dist/types/index";


type Process<
  TTuple extends readonly string[],
  TSeparator extends string,
  TResult extends string = ""
> = [] extends TTuple
? TResult
: Process<
    AfterFirst<TTuple>,
    TSeparator,
    TResult extends ""
    ? First<TTuple> extends ""
      ? TResult
      : `${First<TTuple>}`
    : First<TTuple> extends ""
      ? TResult
      : `${TResult}${TSeparator}${First<TTuple>}`
  >;

type Slicer<
  TTuple extends readonly unknown[],
  TMax extends number | null,
  TEllipsis extends string | false
> = TMax extends number
? TakeFirst<TTuple,TMax> extends readonly unknown[]
  ? TEllipsis extends string
    ? ToStringArray<[...TakeFirst<TTuple,TMax>, TEllipsis]>
    : ToStringArray<TakeFirst<TTuple,TMax>>
  : never
: ToStringArray<TTuple>;

/**
 * **Join**`<TArr,[TSeparator],[TMax]>`
 *
 * Joins together an array of items into a string.
 *
 * - the _separator_ between items defaults to an empty string this can be
 * changed to whatever is needed
 * - non-string types will be converted to strings as best as possible
 * - specifying a value for `TMax` will truncate tuples which are greater
 * than the specified length and add an ellipsis marker as the last element
 *
 * **Related:** `Concat<TArr>`
 */
export type Join<
  TTuple extends readonly unknown[],
  TSeparator extends string = "",
  TMax extends number | null = null,
  TEllipsis extends string | false = "..."
> = ToStringArray<TTuple> extends readonly string[]
? TMax extends number
  ? IsGreaterThan<TTuple["length"], TMax> extends true
    ? Process<Slicer<TTuple,TMax,TEllipsis>, TSeparator>
    : Process<ToStringArray<TTuple>, TSeparator>
  : Process<ToStringArray<TTuple>, TSeparator>
: never;
