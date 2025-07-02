import { IsStringLiteral, Length } from "inferred-types/types";

/**
 * Boolean operator which tests whether `T` is a ISO Year (
 * a four digit year)
 */
export type IsIsoYear<T> = IsStringLiteral<T> extends true
    ? T extends `${number}`
        ? Length<T> extends 4
            ? true
            : false
        : false
    : boolean;
