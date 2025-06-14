import {
    AsNumber,
    DateLike,
    IsIsoExplicitDate,
    IsIsoImplicitDate,
    IsIsoYear,
    IsWideType,
    NumberLike,
    Slice,
    Split
} from "inferred-types/types";


/**
 * Takes any `DateLike` value and converts it into:
 *
 * - if possible a numeric literal value
 * - if not possible then it just converts it to a `number`
 */
export type GetYear<T extends DateLike> = IsWideType<T> extends true
? number
: T extends string
    ? IsIsoYear<T> extends true
        ? AsNumber<T>
    : IsIsoExplicitDate<T> extends true
        ? Split<T,"-"> extends readonly [infer Year, string, string]
            ? Year extends NumberLike
                ? AsNumber<Year>
                : number
        : number
    : IsIsoImplicitDate<T> extends true
        ? Slice<T,0,4> extends `${number}`
            ? AsNumber<Slice<T,0,4>>
            : number
        : number
: number;
