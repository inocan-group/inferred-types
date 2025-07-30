import { IsAny, IsNever, IsUndefined, IsNull } from "inferred-types/types";

/**
 * **IsObject**`<T>`
 *
 * Boolean operator which tests whether `T` extends `object` in a non-nullable fashion.
 */
export type IsObject<T> = [IsAny<T>] extends [true]
    ? false
: [IsNever<T>] extends [true]
    ? false
: [IsNull<T>] extends [true]
    ? false
: [IsUndefined<T>] extends [true]
    ? false
: T extends object
    ? true
: false;
