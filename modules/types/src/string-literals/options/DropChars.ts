import {
  Chars,
  ReplaceAll,
  AfterFirst,
  First,
  IsUnion,
  UnionToTuple
} from "inferred-types/types";

/**
 * Handles dropping a non-union type which can be a single
 * character OR a sequence of characters
 */
type DropSequence<
  TContent extends string,
  TDrop extends readonly string[],
> = [] extends TDrop
? TContent
: DropSequence<
    ReplaceAll<TContent, First<TDrop>, "">,
    AfterFirst<TDrop>
  >;


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
> = IsUnion<TDrop> extends true
  ? UnionToTuple<TDrop> extends string[]
    ? DropSequence<TContent,UnionToTuple<TDrop>>
    : never
  : DropSequence<TContent, Chars<TDrop>>;
