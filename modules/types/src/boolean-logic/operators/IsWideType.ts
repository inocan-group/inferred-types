import type {
    Container,
    EmptyObject,
    ExplicitlyEmptyObject,
    IsContainer,
    IsEqual,
    IsLiteralUnion,
    IsNever,
    IsNumericLiteral,
    IsStringLiteral,
    IsUnion,
    IsWideUnion,
    Keys,
    ObjectKey,
    Or,
    Scalar,
} from "inferred-types/types";

/**
 * **IsWideScalar**`<T>`
 *
 * Boolean operator which validates whether or not `T`
 * is considered a "wide type" which extends `Scalar`
 */
export type IsWideScalar<T> = [T] extends [Scalar]
    ? [
        IsEqual<T, string, true, false>,
        IsEqual<T, number, true, false>,
        IsEqual<T, boolean, true, false>,
        IsEqual<T, null, true, false>,
        IsEqual<T, symbol, true, false>,
    ] extends [
        false,
        false,
        false,
        false,
        false,
    ]
        ? false
        : true
    : false;

/**
 * **IsWideObject**`<T>`
 *
 * Tests whether `T` is a _wide_ variant of an object. Wide variants
 * include:
 *
 * - `object`
 * - `Dictionary`
 * - `Record`, `Map`, and `WeakMap` are considered **wide** in cases
 * where the _keys_ of the type are a union type rather than a discrete type
 * - Set is considered wide when the type it's holding is wide
 */
export type IsWideObject<T> = object extends T
? true
: T extends Map<infer Key, infer _Val>
    ? IsContainer<Key> extends true
        ? false
    : IsLiteralUnion<Key> extends true
        ? false
        : true
: T extends Record<infer Key extends PropertyKey, infer _Val>
    ? IsLiteralUnion<Key> extends true
        ? true
        : number extends Keys<T>["length"]
            ? true
            : false
: IsEqual<T, EmptyObject> extends true
    ? false
    : Record<ObjectKey, any> extends T
        ? true
        : T extends object
            ? [IsEqual<T, ExplicitlyEmptyObject>] extends [true]
                ? false
                : [IsNever<keyof T>] extends [true]
                    ? true
                    : number extends Keys<T>["length"]
                        ? true
                        : false
            : true;

/**
 * **IsWideContainer**`<T>`
 *
 * Boolean operator which tests wether `T` is a `Container` and
 * also a `wide type` (aka, not a literal).
 */
export type IsWideContainer<T> = T extends Container
    ? T extends readonly unknown[]
        ? IsEqual<T["length"], number> extends true
            ? true
            : false
        : IsWideObject<T>
    : false;

/**
 * **IsWideType**`<T, [TNever]>`
 *
 * Identifies types which are "wide" (and have a narrow variant):
 *
 * - string, number, and boolean types
 * - `string[]`, `number[]` array types
 * - wide union types like `string | number`
 *
 * **Note:**
 * - types such as `null` and `undefined` **are** considered wide.
 * - If the `T` passed in is _never_ the result of this operation is
 * ErrorCondition<"invalid-never"> but this can be made into whatever
 * you like by setting the `TNever` generic.
 * - If an ErrorCondition is in `T` then it will be bubbled up
 */
export type IsWideType<
    T,
    TNever = never
> = IsNever<T> extends true
    ? TNever
    : IsEqual<T, EmptyObject> extends true
        ? false
        : IsUnion<T> extends true
            ? IsWideUnion<T>
            : [T] extends [Scalar]
                ? [IsWideScalar<T>] extends [true]
                    ? true
                    : false
                : [T] extends Container
                    ? IsWideContainer<T> extends true
                        ? true
                        : false
                    : never;
