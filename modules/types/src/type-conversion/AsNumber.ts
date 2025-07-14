import type { As, Contains, RetainAfter, StartsWith, StripAfter, StripLeading, StripWhile, TrimCharEnd } from "inferred-types/types";

/**
 * **ParseInt**`<T>`
 *
 * Converts a known string literal representation of a number
 * to an actual number.
 */
export type ParseInt<T> = T extends `${infer Int}.${infer Dec}`
? `${Int}.${TrimCharEnd<Dec,"0">}` extends `${infer N extends number}`
    ? N
: never
: T extends `${infer N extends number}`
    ? N
    : never;

type JustZeros<T extends string> = T extends `${infer HEAD extends string}${infer REST extends string}`
    ? HEAD extends "0"
        ? JustZeros<REST>
        : false
    : true;

/**
 * Addresses the possibility of leading zeros for both integer values
 * and decimal values, positive and negative values
 */
type Handler<T extends `${number}`> = StartsWith<T, "0"> extends true
    ? Contains<T, "."> extends true
        ? JustZeros<StripAfter<T,".">> extends true
            ? As<`0.${RetainAfter<T,".">}`, `${number}`>
        : As<StripWhile<T, "0">, `${number}`>
    : JustZeros<T> extends true
        ? "0"
        : StripWhile<T, "0">
: StartsWith<T, "."> extends true
    ? As<`0${T}`, `${number}`>
    : T;

/**
 * **AsNumber**`<T>`
 *
 * Returns a _number_ for `T` where `T` extends a _number_ or
 * `${number}` type; otherwise return _never_. Literal types are
 * preserved.
 *
 * ```ts
 * // 4
 * type Num = AsNumber<"4">;
 * ```
 * **Related:** `ToNumber`
 */
export type AsNumber<T> = T extends number
    ? T
    : T extends `${number}`
        ? StartsWith<T, "-"> extends true
            ? ParseInt<
                `-${Handler<StripLeading<T,"-">>}`
            >
            : ParseInt<
                Handler<T>
            >
        : never;

