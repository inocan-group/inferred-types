import type {
    IsWideType,
    Or,
} from "inferred-types/types";

type Removal<
    TContent extends string,
    TRemove extends string,
    TCollect extends string = ""
> = TContent extends `${infer Head}${infer Remaining}`
    ? Removal<Remaining, TRemove, `${TCollect}${Head extends TRemove ? "" : Head}`>
    : TCollect;



/**
 * **StripChars**`<TContent,TStrip>`
 *
 * Converts a string `TContent` into a string with all
 * of the characters in `TStrip` removed.
 *
 * - `TStrip` must be a single character or a union
 * of single characters or this will throw
 * `ErrorCondition<"invalid-strip-char">`
 */
export type StripChars<
    TContent extends string,
    TStrip extends string,
> = Or<[IsWideType<TContent>, IsWideType<TStrip>]> extends true
    ? string
    : Removal<TContent, TStrip>;
