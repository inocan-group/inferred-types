

type Retention<
    TChar extends string,
    TRemove extends string,
    TRetain extends string = ""
> = TChar extends `${infer Head}${infer Rest}`
? Head extends TRemove
    ? Retention<Rest, TRemove, `${TRetain}${Head}`>
    : Retention<Rest, TRemove, TRetain>
: TRetain;



/**
 * **RetainChars**`<TContent,TRetain>`
 *
 * Converts a string `TContent` into a string with all
 * of the characters in `TRetain` _retained_ while all
 * other characters are removed.
 */
export type RetainChars<
    TContent extends string,
    TRetain extends string,
> = string extends TContent
    ? string
: string extends TRetain
    ? string
    : Retention<TContent, TRetain>;
