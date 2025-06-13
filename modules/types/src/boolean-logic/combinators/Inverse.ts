import { Logic, LogicHandler, Not } from "inferred-types/types";
/**
 * **Inverse**`<T,[U]>`
 *
 * A type utility for tuples which uses the "truthy" formula to
 * invert the logical type of each entity in the passed in tuple
 * `<T>`.
 *
 * - functions are judged by their return types
 * - if you wish, you can convert all non-boolean based types to
 * use a different strategy than whether or not it is `truthy`;
 * alternatives are:
 *    - "false"
 *    - "never"
 *
 * **Related:** `Not`, `Logic`
 */
export type Inverse<
    T extends readonly unknown[],
    U extends LogicHandler = "truthy"
> = {
    [K in keyof T]: Not<Logic<T[K], U>>
}
