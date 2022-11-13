import { TupleToUnion } from "../type-conversion";
import { IsLiteral } from "./IsLiteral";
import { IsStringLiteral } from "./IsStringLiteral";

/**
 * **Includes<TSource, TValue>**
 *
 * Type utility which returns `true` or `false` based on whether `TValue` is found
 * in `TSource`. Where `TSource` can be a string literal or an array of string literals.
 *
 * **Note:** if the source is a _wide_ type (aka, `string` or `string[]`) then there is
 * no way to know at design-time whether the value includes `TValue` and so it will return
 * a type of `boolean`.
 */
export type Includes<
  TSource extends string | string[],
  TValue extends string
> = TSource extends string[]
  ? IsStringLiteral<TupleToUnion<TSource>> extends true
    ? IsLiteral<TValue> extends true
      ? TValue extends TupleToUnion<TSource>
        ? true
        : false
      : boolean
    : boolean
  : TSource extends string
  ? IsLiteral<TSource> extends true
    ? IsLiteral<TValue> extends true
      ? TSource extends `${string}${TValue}${string}`
        ? true
        : false
      : boolean
    : boolean
  : boolean;
