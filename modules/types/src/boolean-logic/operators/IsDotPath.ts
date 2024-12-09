import type {
  Contains,
  EndsWith,
  HasCharacters,
  IsEqual,
  IsNever,
  IsStringLiteral,
  StartsWith,
} from "inferred-types/types";

type CheckForInvalid<
  T extends string,
> = HasCharacters<T, ["/", "*", "!", "&", "$", "\\"]> extends true
  ? true
  : StartsWith<T, "."> extends true
    ? true
    : EndsWith<T, "."> extends true
      ? true
      : Contains<T, ".."> extends true
        ? true
        : false;

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
 * Note: this utility does not validate that `T` is a _valid_ dot path for a particular
 * container; only that it is a valid looking dotpath. If you want this validation use
 * `IsValidDotPath<TContainer, TKey>` instead.
 */
export type IsDotPath<
  T,
  TIf = true,
  TElse = false,
  TMaybe = TIf | TElse,
> = [IsNever<T>] extends [true]
  ? false
  : T extends string
    ? [IsEqual<T, ""> ] extends [true]
        ? true
        : IsStringLiteral<T> extends true
          ? CheckForInvalid<T> extends true
            ? TElse
            : TIf
          : TMaybe
    : false;
