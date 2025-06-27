import type {
    Dictionary,
    ToKv,
} from "inferred-types/types";

/**
 * **ObjectToTuple**`<TObj,[TCompact]>`
 *
 * Type utility to convert an object to an array of object based key-value pairs.
 *
 * **Example:**
 * ```ts
 * // readonly [ {key: "foo", value: 1} ]
 * type T = ObjectToTuple<{ foo: 1 }>
 * // readonly [ { foo: 1 } ]
 * type C = ObjectToTuple< foo: 1 }, true>;
 * ```
 *
 * **Related:** `ToKv`, `FromKv`
 * @deprecated prefer use of `ToKv`
 */
export type ObjectToTuple<
    TObj extends Dictionary
> = ToKv<TObj>;
