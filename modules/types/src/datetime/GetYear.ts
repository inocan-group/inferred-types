import type {
    AsNumber,
    DateLike,
    IsIsoYear,
    IsWideType,
    ParseDate,
    ParsedDate,
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
            : ParseDate<T> extends ParsedDate
                ? ParseDate<T>[0] extends null
                    ? number
                    : AsNumber<ParseDate<T>[0]>
                : number
        : number;
