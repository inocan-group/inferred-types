import type { Length } from "inferred-types/types";

/**
 * Boolean operator which tests whether `T` is a ISO Year (
 * a four digit year)
 */
export type IsIsoYear<T> = [T] extends [string]
    ? [string] extends [T]
        ? boolean
        : T extends `${number}`
            ? Length<T> extends 4
                ? true
                : false
            : false
    : false;
