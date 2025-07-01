export type LexerState<
    T extends string = string,
    U extends readonly unknown[] = readonly unknown[]
> = {
    parse: T;
    tokens?: U;
};
