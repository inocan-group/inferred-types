import { Narrowable } from "src/literals";


export type LexerState<
    T extends string = string,
    U extends readonly Narrowable[] = readonly Narrowable[]
> = {
    remaining: T;
    tokens: U;
}
