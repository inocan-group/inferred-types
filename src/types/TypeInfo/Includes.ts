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
  ? Keys<TSource> extends TValue
    ? true
    : false
  : TSource extends `${string}${TValue}${string}`
  ? true
  : false;

type T = Includes<"hello world", "hello">;
type T2 = Includes<"hello world", "nope">;

type IsStringLiteral<T extends string> = string extends T ? false : true;

type T3 = IsStringLiteral<"hello">;
type T4 = IsStringLiteral<string>;
