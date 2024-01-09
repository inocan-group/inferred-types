import {  HasCharacters, IfNever, IfStringLiteral } from "../..";

/**
 * **IsDotPath**`<T>`
 * 
 * Boolean operator which detects whether a given `T` should be considered a
 * "dot path". Results based on `T` are:
 * 
 * - `false` - any non-string type or any string literal in which `DotPath<T>` resolves
 * to false (including _never_ value).
 * - `boolean` - a wide string type
 * - `true` - a string literal value where `DotPath<T>` does not resolve to _never_.
 * 
 * Note: this utility does not validate that `T` is a _valid_ dot path for any indexable
 * container; only that it is a valid looking dotpath. If you want this validation use
 * `IsValidDotPath<TContainer, TKey>` instead.
 */
export type IsDotPath<T> = IfNever<
  T,
  false,
  T extends string
    ? IfStringLiteral<
        T, 
        HasCharacters<T, ["/", "*", "!", "&", "$", "\\"]> extends true ? false : true,
        boolean
      >
    : false
>;
