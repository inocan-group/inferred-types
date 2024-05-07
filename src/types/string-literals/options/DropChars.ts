import { IfContains, Chars,  Concat,  IfUnion, Filter } from "src/types/index";

/**
 * Handles dropping a non-union type which can be a single
 * character OR a sequence of characters
 */
type DropSequence<
  TContent extends readonly string[],
  TDrop extends readonly string[],
> = Filter<{
  [K in keyof TContent]: IfContains<
    TDrop, TContent[K],
    never, // filter out
    TContent[K]
  >
}, never>;

/**
 * Handles dropping a union of single characters
 */
type DropUnion<
  TContent extends readonly string[],
  TDrop extends string,
> = Filter<{
  [K in keyof TContent]: TContent[K] extends TDrop
    ? never
    : TContent[K]
}, never>;

type Process<
  TContent extends string,
  TDrop extends string
> = IfUnion<
  TDrop,
  DropUnion<Chars<TContent>, TDrop>,
  DropSequence<Chars<TContent>, Chars<TDrop>>
>

/**
 * **DropChars**`<TContent,TDrop>`
 * 
 * Removes all character sequences found in `TDrop` from the string content
 * in `TContent`. If you use a _union_ type for `TDrop` then each of the
 * union members will be extracted (but union member must only be a single
 * character).
 * 
 * ```ts
 * // "foobarbaz"
 * DropChars<"foo, bar, baz", ", ">;
 * // "oo, ar, az"
 * DropChars<"foo, bar, baz", "f" | "b">;
 * ```
 */
export type DropChars<
  TContent extends string,
  TDrop extends string
> = Concat<
  Process<TContent, TDrop> extends readonly string[]
    ? Process<TContent, TDrop>
    : never
>;


