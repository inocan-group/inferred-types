import {
    AfterFirst,
    As,
    First,
    IsEqual,
    IsUnset,
    Join,
    Replace,
    RetainAfter,
    RetainUntil,
    Split,
    StripLeading,
    Unset
} from "inferred-types/types";

type DropAfter<
    T extends readonly string[],
    F extends string,
    R extends readonly string[] = []
> = [] extends T
? R
: IsEqual<F, First<T>> extends true
? R
: DropAfter<
    AfterFirst<T>,
    F,
    [...R, First<T>]
>

;

type Until<
    TText extends string,
    TFind extends string,
> = Split<TText,TFind, "before"> extends readonly [...infer Remaining, string]
? Remaining extends readonly string[]
    ? Join<
        DropAfter<Remaining, TFind>
    >
    : never
: never;

/**
 * ***UntilLast**`<TText,TFind,[TBreak]>`
 */
export type UntilLast<
    TText extends string,
    TFind extends string,
    TBreak extends string | Unset = Unset
> = IsUnset<TBreak> extends true
? Until<TText,TFind>
: Until<RetainUntil<TText,As<TBreak, string>>, TFind>;


type After<
TText extends string,
TFind extends string,
> = Split<TText,TFind, "before"> extends readonly [...string[], infer Last extends string]
    ? StripLeading<Last, TFind>
    : never;


/**
 * ***AfterLast**`<TText,TFind,[TBreak]>`
 */
export type AfterLast<
    TText extends string,
    TFind extends string,
    TBreak extends string | Unset = Unset
> = IsUnset<TBreak> extends true
? After<TText, TFind>
: Join<[
    After<RetainUntil<TText,As<TBreak, string>>, TFind>,
    Replace<TText, RetainUntil<TText,As<TBreak, string>>, "">
]>;
