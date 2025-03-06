import type {
    AfterFirst,
    First,
    LogicFunction,
    TypedFunction,
} from "inferred-types/types";

/**
 * **Or**`<TConditions, [TEmpty]>`
 *
 * Allows an array of conditions (either a boolean value or a
 * function which evaluates to a boolean value) to be logically OR'd together.
 *
 * - by default if an empty tuple of conditions is passed in then this utility
 * resolves to `false` but this can be changed by modifying `TEmpty`
 *
 * **Related:** `And`
 */
export type Or<
    TConditions extends readonly (boolean | LogicFunction)[],
    TEmpty extends boolean = false,
> = [] extends TConditions
    ? TEmpty
    : First<TConditions> extends true
        ? true
        : First<TConditions> extends TypedFunction
            ? ReturnType<First<TConditions>> extends true
                ? true
                : Or<AfterFirst<TConditions>, TEmpty>
            : Or<AfterFirst<TConditions>, TEmpty>;
