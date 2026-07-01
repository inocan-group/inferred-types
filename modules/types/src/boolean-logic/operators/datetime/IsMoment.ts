import type {
    AnyFunction,
    IsAny,
    IsNever,
    IsUnion,
    IsUnknown,
    UnionMemberExtends
} from "inferred-types/types";

interface Shape {
    isValid: AnyFunction;
    toDate: AnyFunction;
    format: AnyFunction;
    isDST: AnyFunction;
    add: AnyFunction;
    subtract: AnyFunction;
    calendar: AnyFunction;
    fromNow: AnyFunction;
    creationData: AnyFunction;
    // _isAMomentObject: any;
}

/**
 * **IsMoment`<T>`
 *
 * a boolean operator which returns `true` when `T` appears to be a Moment.js instance.
 */
export type IsMoment<T>
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
                                : T extends Shape
                                    ? true
                                    : false;
