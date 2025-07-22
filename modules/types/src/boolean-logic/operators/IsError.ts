/**
 * **IsError**`<T>`
 *
 * Boolean operator which validates that `T` _extends_ the `Error` type.
 */
export type IsError<T> = [T] extends [null]
    ? false
    : [T] extends [Error]
        ? true
        : false;
