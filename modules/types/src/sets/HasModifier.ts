import type { As, AsArray, Contains, IsNull } from "inferred-types/types";

/**
 * **HasModifier**`<TTest, TConfig, [TDefn]>`
 *
 * Tests whether `T` is defined in the modifiers set `TConfig`.
 *
 * - you can optionally include the full modifiers definition to get
 * type validation for `TTest`.
 */
export type HasModifier<
    TTest extends Exclude<TDefn, string | null>[number],
    TConfig extends readonly string[] | string | null,
    TDefn extends readonly string[] | string | null = TConfig
> = string extends TTest
    ? boolean
    : string extends TConfig
        ? boolean
        : IsNull<TConfig> extends true
            ? false
            : Contains<
                As<AsArray<TConfig>, readonly string[]>,
                TTest
            >;
