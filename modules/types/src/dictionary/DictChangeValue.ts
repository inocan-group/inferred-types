import type { SimplifyObject } from "inferred-types/types";

/**
 * Allow a dictionary to have it's value's type changed to `T` while maintaining the keys in
 * the original object `I` so long as the original value for the KV pair extends `V`.
 *
 * If `V` is not specified then it defaults to _any_ and therefore all KVs are preserved.
 *
 * ```ts
 * type Obj = { foo: "hello", bar: 42, baz: () => "world" };
 * // { foo: number, bar: number, baz: number };
 * type AllNumbers = DictChangeValue<Obj, number>;
 * // { foo: number }
 * type StringToBool = DictChangeValue<Obj, boolean, string>
 * ```
 */
export type DictChangeValue<
    /** the object who's value-type we're changing */
    I extends Record<string, unknown>,
    /** the return type that functions should be modified to have */
    T,
    /**
     *The type we expect in the value; if the value extends type `V` then the value will
     * be converted to type `O`; if not then the KV pair will be discarded
     */
    V = unknown,
> = SimplifyObject<
    {
        [K in keyof I]: I[K] extends V
            ? // it's a function (or at least the scoped down type of function we're looking for)
            Record<K, T>
            : never;
    }[keyof I]
>;
