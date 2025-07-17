import type { Constant } from "inferred-types/constants";
import type {
    AfterFirst,
    As,
    ExpandDictionary,
    First,
    IsErrorCondition,
    IsFalse,
    IsNever,
    Keys,
    ObjectKey,
} from "inferred-types/types";

export interface OnPassRemap<
    TNever = unknown,
    TFalse = unknown,
    TError = unknown,
> {
    never: TNever;
    false: TFalse;
    error: TError;
}

type Merge<
    TUser extends Partial<OnPassRemap>,
    TKeys extends readonly (ObjectKey & keyof TUser)[],
    TConfig extends OnPassRemap = { never: never; false: false; error: Constant<"not-set"> },
> = [] extends TKeys
    ? TConfig
    : Merge<
        TUser,
        AfterFirst<TKeys>,
        As<ExpandDictionary<
            Record<
                First<TKeys>,
                TUser[First<TKeys>]
            > & Omit<TConfig, First<TKeys>>
        >, OnPassRemap>
    >;

type Process<
    TTest,
    TPass,
    TRemap extends OnPassRemap<unknown, unknown, unknown>,
> = [IsNever<TTest>] extends [true]
    ? TRemap["never"]
    : [IsErrorCondition<TTest>] extends [true]
        ? TRemap["error"] extends Constant<"not-set"> ? TTest : TRemap["error"]
        : [IsFalse<TTest>] extends [true]
            ? TRemap["false"]
            : TPass;

type Iterate<
    TTest extends readonly unknown[],
    TPass,
    TRemap extends OnPassRemap<unknown, unknown, unknown>,
> = [] extends TTest
    ? TPass
    : Process<
        First<TTest>,
        TPass,
        TRemap
    > extends TPass

        ? Iterate<
            AfterFirst<TTest>,
            TPass,
            TRemap
        >
        : Process<
            First<TTest>,
            TPass,
            TRemap
        >

;

/**
 * **OnPass**`<TTest, TPass,[TRemap],[TFalse]>`
 *
 * Branching utility which evaluates `TTest` for being
 * `never`, `false`, and `Error` class and
 * passes that through when it occurs.
 *
 * In all other cases, the type of `TPass` is proxied through
 * as the type.
 *
 * - the `TRemap` allows you to remap error conditions
 * as well if needed
 */
export type OnPass<
    TTest,
    TPass,
    TRemap extends Partial<OnPassRemap<unknown, unknown, unknown>> = OnPassRemap<never, false, Constant<"not-set">>,
> = TTest extends readonly unknown[]
    ? Iterate<
        TTest,
        TPass,
        TRemap extends OnPassRemap<never, false, Constant<"not-set">>
            ? TRemap
            : Merge<TRemap, Keys<TRemap>>
    >

    : Process<
        TTest,
        TPass,
        TRemap extends OnPassRemap<never, false, Constant<"not-set">>
            ? TRemap
            : Merge<TRemap, Keys<TRemap>>
    >;
