import type {
    As,
    AsArray,
    AsNestingConfig,
    NestedSplit,
    NestedSplitPolicy,
    Nesting,
    RetainUntil__Nested,
} from "inferred-types/types";

/**
 * **NestingApi**
 *
 * An API surface which gives you direct access to all runtime utilities
 * which are _nesting aware_. This surface is the direct result of calling the
 * `nesting(config)` utility.
 */
export type NestingApi<T extends Nesting> = {
    config: T;
    /**
     * **retainUntil**`(content, find, [include])`
     *
     * Trims off content after `find` is found in `content`. But
     * works in a _nested_ manner so the character match must
     * happen at the root level.
     */
    retainUntil<
        const TStr extends string,
        const TFind extends string | readonly string[],
        const TInclude extends boolean = true
    >(
        str: TStr,
        find: TFind,
        incl?: TInclude
    ): RetainUntil__Nested<
        TStr,
        AsArray<TFind> extends infer Find extends readonly string[]
            ? As<Find[number], string>
            : never,
        {
            config: As<T, Nesting>;
            include: As<TInclude, boolean>;
        }
    >;
    /**
     * **split**`(content, splitOn, [policy])`
     *
     * Splits the content provided using `splitOn` as the delimiter.
     *
     * - you may optionally provide a "policy"; by default this policy
     * is "omit".
     */
    split<
        const TContent extends string,
        const TSplit extends string,
        const TPolicy extends NestedSplitPolicy = "omit"
    >(
        content: TContent,
        split: TSplit,
        policy?: TPolicy | undefined
    ): NestedSplit<TContent, TSplit, T, TPolicy>;
};

/**
 * used to convert a valid nesting configuration into the `NestingApi`
 */
export type AsNestingApi<T extends Nesting>
    = [T] extends [Error]
        ? T
        : [AsNestingConfig<T>] extends [Error]
            ? AsNestingConfig<T>
            : [AsNestingConfig<T>] extends [Nesting]
                ? NestingApi<T>
                : never;
