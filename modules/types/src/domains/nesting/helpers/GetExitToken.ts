import { As, Err, IsNull, Nesting, NestingKeyValue } from "inferred-types/types";

type _GetExitToken<
    TEntry extends string,
    TNesting extends Nesting
> = [TNesting] extends [NestingKeyValue]
    ? TEntry extends keyof TNesting
        ? TNesting[TEntry] extends infer Value
            // Handle hierarchical form (readonly tuple)
            ? Value extends readonly [infer Exit extends string, infer _NextLevel]
                ? Exit
                // Handle hierarchical form (mutable tuple)
                : Value extends [infer Exit extends string, infer _NextLevel]
                    ? Exit
                    // Handle simple form (string)
                    : Value extends string
                        ? Value
                        : never
            : never
        : Err<
            `invalid-lookup`,
            `GetNestingEnd<TStartChar,TNesting> got a start/entering character '${TEntry}' which is NOT defined in the configuration (a NestingKeyValue config)!`,
            { config: TNesting }
        >
    : [TNesting] extends [[infer StartingChars extends readonly string[], infer EndingChars extends readonly string[], ...infer _Rest]]
        ? TEntry extends StartingChars[number]
            ? EndingChars extends readonly string[]
                ? EndingChars[number]
                : never
            : Err<
                "invalid-lookup",
            `GetNestingEnd<TStartChar,TNesting> got a start/entering character '${TEntry}' which is NOT defined in the configuration (a NestingTuple config)!`,
            { config: TNesting }
            >
        : [TNesting] extends [[infer StartingChars extends readonly string[], infer EndingChars extends readonly string[]]]
            ? TEntry extends StartingChars[number]
                ? EndingChars extends readonly string[]
                    ? EndingChars[number]
                    : never
                : Err<
                    "invalid-lookup",
                `GetNestingEnd<TStartChar,TNesting> got a start/entering character '${TEntry}' which is NOT defined in the configuration (a NestingTuple config)!`,
                { config: TNesting }
                >
            : never;

/**
 * **GetExitToken**`<TStartChar, TNesting>`
 *
 * Provides the END/EXIT character(s) which the passed in `TStartChar` character
 * along with the configuration of `TNesting` match up to.
 *
 * - if no match is found a `Err<'invalid-lookup'>` will be returned.
 * - when using a `NestingTuple` config, the return value will typically be a _union_ of exit characters
 * - in contrast, a `NestingKeyValue` config will typically just return a single character variant to
 * match with.
 */
export type GetExitToken<
    TEntry extends string | null,
    TNesting extends Nesting
> = [IsNull<TEntry>] extends [true]
    ? null
    : [string] extends [TEntry]
        ? string | Err<`invalid-lookup`>
        : _GetExitToken<As<TEntry, string>, TNesting>;
