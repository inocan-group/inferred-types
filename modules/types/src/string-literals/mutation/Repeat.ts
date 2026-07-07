type Repeater<
    TStr extends string,
    TCount extends number,
    TResult extends string = "",
    TDepth extends readonly unknown[] = [],
> = TDepth["length"] extends TCount
    ? TResult
    : TDepth["length"] extends 64
        ? string
        : Repeater<
            TStr,
            TCount,
            `${TResult}${TStr}`,
            [...TDepth, unknown]
        >;

/**
 * **Repeat**`<TStr,TCount>`
 *
 * Creates a string literal by repeating a given string -- `TStr` -- `TCount` times.
 */
export type Repeat<
    TStr extends string,
    TCount extends number
> = number extends TCount
    ? string
    : TCount extends 0
        ? ""
        : `${TCount}` extends `-${infer Positive extends number}`
            ? Repeater<
                TStr,
                Positive
            >

            : Repeater<
                TStr,
                TCount
            >;
