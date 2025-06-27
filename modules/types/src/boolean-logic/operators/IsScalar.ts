import type {
    IfNever,
    Scalar,
} from "inferred-types/types";

/**
 * **IsScalar**`<T>`
 *
 * Type utility which checks if a value is a _scalar_ value (aka, it is
 * an atomic value and doesn't _contain_ other types). In practical terms this just
 * means if it's a string, number, boolean, null, or symbol then it is
 * a **scalar**. Arrays and records of any type are _not_ scalars.
 *
 * - Typically this resolves at design-time to true/false, however, in some
 * cases a union type can not resolve until runtime and a `boolean` value will
 * be returned.
 *
 * **Related:** `IsOptionalScalar`
 */
export type IsScalar<T> = IfNever<T, false, T extends Scalar ? true : false>;
