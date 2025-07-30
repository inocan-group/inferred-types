import {
    IsAny,
    IsNever,
    DropVariadicHead,
    TupleMeta,
    IsVariadicArray,
    SplitAtVariadic,
    DropVariadic
} from "inferred-types/types";

/**
 * **IsLiteralLikeArray**`<T>`
 *
 * Tests whether the _shape_ of the array has at least one fixed type
 * (aka, non-variadic).
 *
 * ```ts
 * // true
 * type T1 = IsLiteralLikeArray<[...string[], number]>;
 * type T2 = IsLiteralLikeArray<[string, number, ...boolean[]]>;
 * // false
 * type F1 = IsLiteralLikeArray<(string | number)[]>;
 * ```
 *
 * **Related:** `IsLiteralLikeTuple`
 */
export type IsLiteralLikeArray<T> =
[IsAny<T>] extends [true]
    ? false
: [IsNever<T>] extends [true]
    ? false
: [T] extends [readonly unknown[]]
    ? number extends TupleMeta<T>["nonVariadicLength"]
        ? false
        : TupleMeta<T>["isWide"] extends true
            ? false
            : true

: false;


// type T = [...string[], number];
// type T = [number, ...string[]];
// type T = [];
// type T = [...string[], number, string];
type T = [string, ...number[], boolean];

type SB = DropVariadicHead<T>; // =>

type V = TupleMeta<T>["isVariadic"]; // =>
type V2 = IsVariadicArray<T>; // =>
type Head = TupleMeta<T>["hasVariadicHead"]; // =>
type Tail = TupleMeta<T>["hasVariadicTail"]; // =>
type Min = TupleMeta<T>["minLength"]; // =>
type Max = TupleMeta<T>["maxLength"]; // =>
type Len = TupleMeta<T>["nonVariadicLength"]; // =>
type Unconstrained = TupleMeta<T>["isUnconstrained"]; // =>
type Wide = TupleMeta<T>["isWide"]; // =>
type E = TupleMeta<T>["excludingVariadicElement"]; // =>
type VT = TupleMeta<T>["variadicType"]; // =>
type Split = SplitAtVariadic<T>; // =>
type Drop = DropVariadic<T>; // =>

