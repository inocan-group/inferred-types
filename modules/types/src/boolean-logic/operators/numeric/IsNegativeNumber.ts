import type {
    AsString,
    IsWideType,
    NumberLike,
} from "inferred-types/types";

/**
 * **IsNegativeNumber**`<T>`
 *
 * A boolean utility which returns true when `T` is a numerically
 * negative value. This includes string literal representations of
 * a number.
 */
export type IsNegativeNumber<T> = T extends NumberLike
    ? IsWideType<T> extends true
        ? boolean
        : T extends number
            ? AsString<T> extends `-${number}`
                ? true
                : false
            : T extends string
                ? T extends `-${number}`
                    ? true
                    : false
                : false
    : false;
