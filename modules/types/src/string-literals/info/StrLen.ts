import type { Tuple } from "types/base-types";
import type { IsBranded, Unbrand } from "types/literals";

type Compute<
    TStr extends string,
    TLen extends Tuple = [],
> = TStr extends `${infer _Char}${infer Rest}`
    ? Compute<Rest, [...TLen, unknown]>
    : TLen["length"];

/**
 * **StrLen**`<T>`
 *
 * Provides the length of a string if T is a string literal,
 * otherwise just returns `number` type.
 */
export type StrLen<T extends string> = IsBranded<T> extends true
    ? Compute<Unbrand<T>>
    : Compute<T>;
