import type { Narrowable } from "inferred-types/types";

/**
 * partial application of the equalsSome(...some) utility.
 */
export type EqualsSome__Partial<
    TSome extends readonly Narrowable[]
> = <const TVal extends Narrowable>(val: TVal) => (
    TVal extends TSome[number] ? true : false
);

/**
 * **equalsSome**`(...some) -> (val) -> boolean`
 *
 * A higher order function which:
 *
 * 1. _takes_ a set of "possible values/types" and then
 * 2. _takes_ a value/type and returns a boolean value indicating whether
 * the value is **equal** to _any_ of the possible values this was configured
 * with.
 *
 *
 * ```ts
 * //
 * const test = equalsSome("foo","bar","baz");
 * ```
 */
export function equalsSome<
    const TSome extends readonly Narrowable[]
>(
    ...some: TSome
): EqualsSome__Partial<TSome> {
    return <const TVal extends Narrowable>(val: TVal) => {
        return some.includes(val) as unknown as (
            TVal extends TSome[number] ? true : false
        );
    };
}
