import { IsAny, IsNever, IsUnknown } from "inferred-types/types";

/**
 * **IsBooleanLike**`<T>`
 *
 * Boolean operator which checks whether `T` is a string literal of
 * either "boolean", "true", or "false".
 */
export type IsBooleanLike<T> = [IsNever<T>] extends [true]
? false
: [IsAny<T>] extends [true]
    ? boolean
: [IsUnknown<T>] extends [true]
    ? boolean
: T extends string
? string extends T
    ? boolean
    : T extends "boolean" | "true" | "false"
        ? true
        : false
: false;
