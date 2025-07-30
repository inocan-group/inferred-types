import type { HasVariadicTail } from "types/lists/Variadic";
import type { DropVariadicTail } from "./Variadic";

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
    ? IndicesTuple<DropVariadicTail<TList>>
    : IndicesTuple<TList>;

type X = HasVariadicTail<[]>;

type A = HasVariadicTail<[]>; // false
type B = HasVariadicTail<[1, 2, 3]>; // false
type C = HasVariadicTail<[1, ...string[]]>; // true
type D = HasVariadicTail<readonly [1, ...string[]]>; // true
type E = HasVariadicTail<string[]>; // false
type F = HasVariadicTail<readonly number[]>; // false
