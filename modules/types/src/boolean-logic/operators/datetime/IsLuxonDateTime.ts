import type {
    IsDictionary,
    IsAny,
    IsNever,
    IsUnknown,
    IsUnion,
    UnionMemberExtends
} from "inferred-types/types";


type Shape = {
    diff: Function;
    diffNow: Function;
    hasSame: Function;
    getPossibleOffsets: Function;
}


/**
 * **IsLuxonDateTime`<T>`
 *
 * A boolean operator which returns `true` when `T` appears to be a Luxon DateTime instance.
 */
export type IsLuxonDateTime<T> =
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
