import {  IfNever, SomeEqual, IsStringLiteral, IfAnd } from "src/types/index";


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
  TSource extends string[]
    ? SomeEqual<TSource, TValue>
    : IfAnd<
        [IsStringLiteral<TValue>, IsStringLiteral<TSource>], 
        [TSource] extends [`${string}${TValue}${string}`]
          ? true
          : false,
        boolean
      >
>;

