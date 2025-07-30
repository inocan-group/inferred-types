import { IsAny, IsEqual, IsFalse, IsNever, IsTrue, IsWideArray, IsWideObject, Or } from "inferred-types/types";

/**
 * **IsWideType**`<T>`
 *
 * boolean operator which test whether `T` is considered a "wide" type.
 */
export type IsWideType<T> = [IsAny<T>] extends [true]
? false
: [IsNever<T>] extends [true]
? false
: [string] extends [T]
? true
: [number] extends [T]
? true
: [IsTrue<T>] extends [true]
? false
: [IsFalse<T>] extends [true]
? false
: T extends boolean
? true
: [IsEqual<T,Function>] extends [true]
? true
: [T] extends [readonly unknown[]]
    ? IsWideArray<T>
: [T] extends [object]
    ? IsWideObject<T>
: false;
