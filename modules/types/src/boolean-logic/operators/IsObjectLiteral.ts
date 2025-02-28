import type {
    Dictionary,
    ExplicitlyEmptyObject,
    IsEqual,
    IsNever,
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
 * **IsObjectLiteral**`<T>`
 *
 * Tests whether an object is a literal. An object literal is any of the following:
 *
 * - any KV-like type which has an **explicit** number of keys
 * - if `Keys<T>["length"]` translates to `number` than this is **not** a literal.
 */
export type IsObjectLiteral<T> = IsNever<T> extends true
    ? false
    : T extends Dictionary
        ? IsEqual<T, ExplicitlyEmptyObject> extends true
            ? true
            : CheckIt<T>
        : false;
