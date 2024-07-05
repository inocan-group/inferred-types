
import {AsStringUnion } from "src/types/index";

type Process<
  TContent extends string,
  TLeading extends string
>= TContent extends `${TLeading}${string}`
? TContent
: `${TLeading}${TContent}`;

type IterateOver<
  TContent extends readonly (string | number)[],
  TLeading extends string | number
> = {
  [K in keyof TContent]: TContent[K] extends string
    ? Process<TContent[K], AsStringUnion<TLeading>>
    : TContent[K] extends number
    ? Process<`${TContent[K]}`, AsStringUnion<TLeading>>
    : never
}

/**
 * **EnsureLeading**`<TContent, TLeading>`
 *
 * Will ensure that `TContent` _starts with_ the `TLeading`; adding
 * it when it wasn't present or proxying the value through when it was.
 *
 * **Note:**
 * - you can use both _string_ or _numeric_ values for both
 * parameters.
 * - you can provide a tuple for content and each item will be processed
 * separately
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
: TContent extends string
  ? Process<TContent,AsStringUnion<TLeading>>
  : TContent extends number
  ? Process<`${TContent}`, AsStringUnion<TLeading>>
  : never;
