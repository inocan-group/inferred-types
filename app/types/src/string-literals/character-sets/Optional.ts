import { AfterFirst, First } from "../../types";

type Cascade<
  T extends readonly string[],
  TResult extends string = ""
> = [] extends T
? TResult
: Cascade<
    AfterFirst<T>,
    `${TResult}${First<T> | ""}`
  >;


/**
 * **Optional**`<T>`
 *
 * String literal utility which makes the text `T` either present
 * or just an _empty string_ (aka, "optional").
 *
 * - if you send in an array of strings they will build a
 * string literal up left-to-right.
 */
export type Optional<
  T extends string | readonly string[]
> = T extends readonly string[]
? Cascade<T>
: T | "";


/**
 * **Opt**`<T>`
 *
 * > _alias for `Optional<T>`_
 *
 * String literal utility which makes the text `T` either present
 * or just an _empty string_ (aka, "optional").
 *
 * - if you send in an array of strings they will build a
 * string literal up left-to-right.
 */
export type Opt<T extends string | readonly string[]> =
Optional<T>;


/**
 * an _optional_ percentage symbol
 */
export type OptPercent = "%" | "";
