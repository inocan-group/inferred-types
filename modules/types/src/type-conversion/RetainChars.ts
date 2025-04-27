import type {
    AfterFirst,
    Chars,
    First,
    IsWideType,
    Or,
} from "inferred-types/types";

type Retention<
    TChar extends string,
    TRemove extends string,
    TRetain extends string = ""
> = TChar extends `${infer Head}${infer Rest}`
? Head extends TRemove
    ? Retention<Rest, TRemove, `${TRetain}${Head}`>
    : Retention<Rest, TRemove, TRetain>
: TRetain;



// TContent extends `${infer Head}${infer Remaining}`
//     ? Retention<
//         Remaining,
//         TRemove,
//         `${TCollect}${Head extends TRemove ? Head : ""}`
//     >
//     : TCollect;

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
> = Or<[IsWideType<TContent>, IsWideType<TRetain>]> extends true
    ? string
    : Retention<TContent, TRetain>;
