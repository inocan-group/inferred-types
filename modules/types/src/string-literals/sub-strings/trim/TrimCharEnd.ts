import {  Reverse } from "types/lists";

type Strip<
    TChars extends string,
    TWhile extends string
> = TChars extends `${TWhile}${infer Rest}`
? Strip<Rest, TWhile>
: Reverse<TChars>;


/**
 * **TrimCharEnd**`<T,U>`
 *
 * Trims the character `U` from the end of the string `T`.
 *
 * **Related:**
 * - `TrimStart`, `TrimEnd`
 */
export type TrimCharEnd<
    T extends string,
    U extends string
> = string extends T
    ? string
: string extends U
    ? string
: Strip<
    Reverse<T>,
    U
>;
