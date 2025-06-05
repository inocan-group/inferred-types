

type Removal<
    TContent extends string,
    TRemove extends string,
    TCollect extends string = ""
> = TContent extends `${infer Head}${infer Remaining}`
    ? Removal<
        Remaining,
        TRemove,
        `${TCollect}${Head extends TRemove ? "" : Head}`
    >
    : TCollect;

/**
 * **StripChars**`<TContent,TStrip>`
 *
 * Converts a string `TContent` into a string with all
 * of the characters in `TStrip` removed.
 *
 * - `TStrip` must be a single character or a union
 * of single characters
 */
export type StripChars<
    TContent extends string,
    TStrip extends string,
> = string extends TContent
    ? string
: string extends TStrip
    ? string
    : Removal<TContent, TStrip>;
