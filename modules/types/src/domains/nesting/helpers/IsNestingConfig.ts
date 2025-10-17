import { IsNestingKeyValue, IsNestingTuple } from "inferred-types/types";

/**
 * boolean operator which tests whether `T` is a valid nesting configuration.
 */
export type IsNestingConfig<T> = IsNestingKeyValue<T> extends true
    ? true
    : IsNestingTuple<T> extends true
        ? true
        : false;
