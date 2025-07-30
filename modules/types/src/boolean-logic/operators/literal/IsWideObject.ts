import type {
    AnyFunction,
    IsAny,
    IsEqual,
    IsLiteral,
    IsLiteralObject,
    IsNever,
    IsUnion,
} from "inferred-types/types";

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
export type IsWideObject<
    T
> =
[IsAny<T>] extends [true]
? false
: [IsNever<T>] extends [true]
? false
: [T] extends [AnyFunction]
? false
: [T] extends [object]
    ? [IsEqual<T,object>] extends [true]
        ? true
    : [T] extends [Map<infer Key, any>]
        ? IsLiteral<Key> extends true
            ? false
            : true
    : [T] extends [WeakMap<infer Key, any>]
        ? IsLiteral<Key> extends true
            ? false
            : true
    : [T] extends [Set<infer Type>]
        ? IsLiteral<Type> extends true
            ? false
            : true

    : [IsLiteralObject<T>] extends [true]
        ? false
    : [IsUnion<keyof T>] extends [true]
        ? false
    : [keyof T] extends [never]
        ? false
    : true
: false;


