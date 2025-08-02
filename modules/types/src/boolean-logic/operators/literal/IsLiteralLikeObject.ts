import type {
    Dictionary,
    EmptyObject,
    ExplicitlyEmptyObject,
    IsAny,
    IsEqual,
    IsNever,
    IsUnknown,
    RemoveIndexKeys,
    UnionToTuple,
} from "inferred-types/types";

type _Keys<
    T extends Dictionary,
> = UnionToTuple<keyof RemoveIndexKeys<T>>;

type CheckIt<T extends Dictionary> = IsNever<keyof T> extends true
    ? false
    : IsEqual<_Keys<T>, []> extends true
        ? false
        : true;

/**
 * **IsLiteralLikeObject**`<T>`
 *
 * Tests whether an object is a literal. An object literal is any of the following:
 *
 * - any KV-like type which has an **explicit** number of keys
 * - if `Keys<T>["length"]` translates to `number` than this is **not** a literal.
 */
export type IsLiteralLikeObject<T> =
[IsAny<T>] extends [true]
    ? false
: [IsNever<T>] extends [true]
    ? false
: [IsUnknown<T>] extends [true]
    ? boolean
: [T] extends [readonly any[]]
    ? false
: T extends Dictionary
    ? IsEqual<T, ExplicitlyEmptyObject> extends true
        ? true

            : CheckIt<T>
    : false;


