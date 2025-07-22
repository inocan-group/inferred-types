import type {
    AfterFirst,
    First,
    IsUnion,
    Length,
    UnionToTuple
} from "inferred-types/types";

type HandleUnion<
    T extends readonly unknown[],
    THasIso extends boolean = false,
    TNonIso extends boolean = false
> = [] extends T
    ? THasIso extends true
        ? TNonIso extends true
            ? boolean
            : true
        : false
    : IsIsoYear<First<T>> extends true
        ? HandleUnion<AfterFirst<T>, true, TNonIso>
        : HandleUnion<AfterFirst<T>, THasIso, true>;

/**
 * **IsIsoYear**`<T>`
 *
 * Boolean operator which tests whether `T` is a ISO Year (
 * a four digit year)
 */
export type IsIsoYear<T>
= [IsUnion<T>] extends [true]
    ? HandleUnion<UnionToTuple<T>>
    : [T] extends [string]
        ? [string] extends [T]
            ? boolean
            : T extends `${number}`
                ? Length<T> extends 4
                    ? true
                    : false
                : false
        : false;
