import type {
    AnyFunction,
    Dictionary,
    HasNonTemplateLiteral,
    IsAny,
    IsEqual,
    IsLiteralLike,
    IsLiteralLikeObject,
    IsNever,
    IsUnion,
    Keys,
    TupleMeta,
} from "inferred-types/types";

/**
 * **IsWideObject**`<T>`
 *
 * Tests whether `T` is a _wide_ variant of an object. Wide variants
 * include:
 *
 * - `Record`, `Map`, and `WeakMap` are considered **wide** in cases
 * where the _keys_ of the type have mono-variant
 * - Set is considered wide when the type it's holding is wide
 */
export type IsWideObject<
    T
> = [IsAny<T>] extends [true]
    ? false
    : [IsNever<T>] extends [true]
        ? false
        : [T] extends [AnyFunction]
            ? false
            : [T] extends [Dictionary]
                ? [number] extends [Keys<T>["length"]]
                    ? true
                    : number extends TupleMeta<Keys<T>>["nonVariadicLength"]
                        ? true
                        : HasNonTemplateLiteral<Keys<T>> extends true
                            ? false
                            : Keys<T>["length"] extends 0
                                ? false
                                : true
                : [T] extends [object]
                    ? [IsEqual<T, object>] extends [true]
                        ? true
                        : [T] extends [Map<infer Key, any>]
                            ? IsLiteralLike<Key> extends true
                                ? false
                                : true
                            : [T] extends [WeakMap<infer Key, any>]
                                ? IsLiteralLike<Key> extends true
                                    ? false
                                    : true
                                : [T] extends [Set<infer Type>]
                                    ? IsLiteralLike<Type, "allow-mixed-unions"> extends true
                                        ? false
                                        : true
                                    : [IsLiteralLikeObject<T>] extends [true]
                                        ? false
                                        : [IsUnion<keyof T>] extends [true]
                                            ? false
                                            : [keyof T] extends [never]
                                                ? false
                                                : true
                    : false;
