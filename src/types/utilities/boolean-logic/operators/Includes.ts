import {  IfNever, SomeEqual,  IfOr, IsWideType } from "src/types";


/**
 * **Includes**`<TSource, TValue>`
 *
 * Type utility which returns `true` or `false` based on whether `TValue` is found
 * in `TSource`. Where `TSource` can be a string literal or an array of string literals.
 *
 * **Note:** if the source is a _wide_ type (aka, `string` or `string[]`) then there is
 * no way to know at design-time whether the value includes `TValue` and so it will return
 * a type of `boolean`.
 */
export type Includes<
  TSource extends string | readonly string[],
  TValue extends string
> = IfNever<TValue, false,
  IfOr<[IsWideType<TValue>, IsWideType<TSource>], boolean,
  TSource extends string[]
    ? SomeEqual<TValue,TSource>
    : TSource extends `${string}${TValue}${string}`
      ?  true
      : false
>>;

