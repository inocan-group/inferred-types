type Process<
    T extends string,
    E
> = T extends `${infer Head}${string}`
    ? Head
    : E;

type Iterate<
    TContent extends readonly string[],
    E
> = {
    [K in keyof TContent]: Process<TContent[K], E>
};

/**
 * **FirstChar**`<TContent, [TEmpty]>`
 *
 * When `TContent` extends a _string_:
 *   - will return the first character in a string literal
 *   - returns `string` when a wide type is encountered
 *   - returns `never` when an empty string is passed in
 *   - Note: you can choose a different value than `never` if you
 *     like for when a string literal is empty by setting the `TEmpty`
 *     generic.
 *
 * When `TContent` is a tuple of strings:
 *   - each item will be processed as described above
 *
 * **Related:** `LastChar`, `AfterFirstChar`
 */
export type FirstChar<
    TContent extends string | readonly string[],
    TEmpty = never
> = TContent extends readonly string[]
    ? Iterate<TContent, TEmpty>
    : TContent extends string
        ? string extends TContent
            ? string
            : Process<TContent, TEmpty>
        : never;
