import type { IsAny, IsDictionary, IsNever, IsUnion, IsUnknown, UnionMemberExtends } from "inferred-types/types";

type Shape = {
    add: Function;
    clone: Function;
    date: Function;
    endOf: Function;
    isAfter: Function;
    isBefore: Function;
    daysInMOnth: Function;
    millisecond: Function;
    calendar: any;
};

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
                : [IsUnion<T>] extends true
                    ? UnionMemberExtends<T, Shape> extends true
                        ? boolean
                        : false
                    : IsDictionary<T> extends true
                        ? T extends Shape
                            ? true
                            : false
                        : false;
