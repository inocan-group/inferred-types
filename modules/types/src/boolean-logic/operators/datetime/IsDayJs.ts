import type { AnyFunction, IsAny, IsDictionary, IsNever, IsUnion, IsUnknown } from "inferred-types/types";

interface Shape {
    add: AnyFunction;
    clone: AnyFunction;
    date: AnyFunction;
    endOf: AnyFunction;
    isAfter: AnyFunction;
    isBefore: AnyFunction;
    daysInMonth: AnyFunction;
    millisecond: AnyFunction;
    calendar: unknown;
}

/**
 * **IsDayJs**`<T>`
 *
 * Boolean utility to test whether `T` is DayJS date object.
 */
export type IsDayJs<T>
    = [IsAny<T>] extends [true]
        ? false
        : [IsNever<T>] extends [true]
                ? false
                : [IsUnknown<T>] extends [true]
                        ? boolean
                        : [IsUnion<T>] extends [true]
                                ? true extends (T extends Shape ? true : false)
                                    ? T extends Shape ? true : boolean
                                    : false
                                : IsDictionary<T> extends true
                                    ? T extends Shape
                                        ? true
                                        : false
                                    : false;
