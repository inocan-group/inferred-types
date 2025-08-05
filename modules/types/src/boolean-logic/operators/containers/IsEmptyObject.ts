import type { AnyFunction, IsAny, IsNever, IsNull, IsObject, IsUndefined, ObjectKeys, TupleMeta } from "inferred-types/types";

/**
 * **IsEmptyObject**`<T>`
 *
 * - T must be an object (but not a function and not an array/tuple)
 * - T must expose **no known keys** (`keyof T` is `never`)
 * - `any`, `unknown`, and `never` are rejected
 */
export type IsEmptyObject<T> =
IsAny<T> extends true ? false
: IsNever<T> extends true ? false
: IsNull<T> extends true ? false
: IsUndefined<T> extends true ? false
: T extends AnyFunction ? false
: IsObject<T> extends true
    ? ObjectKeys<T> extends readonly PropertyKey[]
        ? TupleMeta<ObjectKeys<T>>["isEmpty"]
        : false
: false;
