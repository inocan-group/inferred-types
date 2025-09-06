import type {
    IsAny,
    IsNever,
    IsUnion,
    IsUnknown,
    UnionMemberExtends
} from "inferred-types/types";

type Shape = {
    isValid: Function;
    toDate: Function;
    format: Function;
    isDST: Function;
    add: Function;
    subtract: Function;
    calendar: Function;
    fromNow: Function;
    creationData: Function;
    // _isAMomentObject: any;
};

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
