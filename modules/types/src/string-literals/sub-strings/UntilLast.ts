import type {
    As,
    Contains,
    Err,
    Join,
    Last,
    Or,
    Pop,
    Split,
    StripAfter,
    Unset
} from "inferred-types/types";

type Until<
    TParts extends readonly string[],
    TFind extends string,
> = Last<TParts> extends TFind
    ? Join<Pop<TParts>>
    : Last<TParts> extends `${infer Lead}${TFind}`
        ? Lead
        : Last<Pop<TParts>> extends `${string}${TFind}`
            ? Join<Pop<TParts>> extends `${infer Value extends string}${TFind}`
                ? Value
                : Join<Pop<TParts>>
            : Err<`until`, ``>;

export type UntilLastOptions = {
    break?: Unset | string;
    handle?: Error | string;
};

type Break<T extends UntilLastOptions> = T["break"] extends string
    ? T["break"]
    : Unset;

type Handle<
    T extends string,
    O extends UntilLastOptions
> = Or<[
    O["handle"] extends string ? true : false,
    O["handle"] extends Error ? true : false,
]> extends true
    ? O["handle"]
    : T;

/**
 * **UntilLast**`<TText,TFind,[TBreak],[THandle]>`
 *
 * Provides the text in `TText` up to (but not including) the `TFind`
 * character.
 *
 * - if the `TBreak` character is provided then all text in `TText`
 * after the _first_ occurrence of the break character will be discarded
 * before looking for the last `TFind` character.
 * - if no instances of `TFind` are found then `THandle` will be returned
 *      - by default `THandle` is just `TText` but you can set it
 * what ever is most appropriate
 *      - note that any string literal value provided will have the content
 * _after_ the `TBreak` character removed from the string literal
 *
 * **Related:** `AfterLast`
 */
export type UntilLast<
    TText extends string,
    TFind extends string,
    TOpt extends UntilLastOptions = { break: Unset; handle: TText }
> = Contains<TText, TFind> extends true
    ? As<
        Break<TOpt> extends string
            ? Until<
                Split<
                    StripAfter<TText, As<Break<TOpt>, string>>,
                    TFind,
                    "before"
                >,
                TFind
            >
            : Until<
                Split<TText, TFind, "before">,
                TFind
            >,
        string
    >
    : Handle<TText, TOpt> extends string
        ? Break<TOpt> extends string
            ? StripAfter<Handle<TText, TOpt>, Break<TOpt>>
            : Handle<TText, TOpt>
        : Handle<TText, TOpt>;
