import type { IsNever, IsUnknown, IsDictionary, IsAny,  IsUnion, UnionMemberExtends } from "inferred-types/types";


type Shape = {
    getDate: Function;
    getMonth: Function;
    getMilliseconds: Function;
    getTimezoneOffset: Function;
    getUTCDate: Function;
    getUTCDay: Function;
    getUTCFullYear: Function;
}

/**
 * **IsJsDate**`<T>`
 *
 * Boolean utility to test whether `T` is a Javascript Date object.
 */
export type IsJsDate<T> =
[IsAny<T>] extends [true]
    ? false
: [IsNever<T>] extends [true]
    ? false
: [IsUnknown<T>] extends [true]
    ? boolean
: [IsUnion<T>] extends true
    ? UnionMemberExtends<T, Shape> extends true
        ? boolean
        : false
: IsDictionary<T> extends true
    ? T extends Shape
        ? true
        : false

: false;


