import type { IsEqual } from "types/boolean-logic/operators/compare/IsEqual";
import type { IsUnion, UnionIncludes } from "types/boolean-logic/operators/unions";

/**
 * **IsNot**`<TTest, TCompare>`
 *
 * Ensures that `TTest` does not equal or extend `TCompare`
 *
 * - if `TTest` is a union with `TCompare` as an element of the union
 *   then `TCompare` will be removed from the union
 * - if `TTest` is equal to `TCompare` then the type is converted to `never`
 * - in all other cases `TTest` remains unchanged
 */
export type IsNot<TTest, TCompare> = IsUnion<TTest> extends true
    ? UnionIncludes<TTest, TCompare> extends true
        ? Exclude<TTest, TCompare>
        : TTest
    : IsEqual<TTest, TCompare> extends true
        ? never
        : TTest;
