import type { IsEqual } from "types/boolean-logic/operators/compare/IsEqual";
import type { IsUnion, UnionIncludes } from "types/boolean-logic/operators/unions";

export type IsNot<TTest, TCompare> = IsUnion<TTest> extends true
    ? UnionIncludes<TTest, TCompare> extends true
        ? Exclude<TTest, TCompare>
        : TTest
    : IsEqual<TTest, TCompare> extends true
        ? never
        : TTest;
