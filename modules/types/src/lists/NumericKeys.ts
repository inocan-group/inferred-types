import type { HasVariadicTail } from "types/lists/Variadic";
import type { DropVariadicTail } from "./Variadic";

/* eslint-disable ts/no-unused-vars, unused-imports/no-unused-vars */

type IndicesTuple<
    T extends readonly unknown[],
    Acc extends number[] = []
> = number extends T["length"]
    ? number[]
    : T extends readonly [any, ...infer R]
        ? IndicesTuple<R, [...Acc, Acc["length"]]>
        : Acc;

/**
 * **NumericKeys**<`TList`>
 *
 * Will provide a tuple of numeric keys for
 * a literal array and `number[]` for a wide array.
 *
 * ```ts
 * type Arr = ["foo", "bar", "baz"];
 * // readonly [0, 1, 2]
 * type T = NumericKeys<Arr>;
 * ```
 *
 * **Related:** `NumericKeys__Union`, `Keys`, `ObjectKeys`
 */
export type NumericKeys<
    TList extends readonly unknown[],
> = HasVariadicTail<TList> extends true
    ? DropVariadicTail<TList> extends infer NonVariadic extends readonly unknown[]
        ? IndicesTuple<NonVariadic> extends infer NonVariadic extends readonly unknown[]
            ? [...NonVariadic, ...number[]]
            : never
        : never
    : IndicesTuple<TList>;
