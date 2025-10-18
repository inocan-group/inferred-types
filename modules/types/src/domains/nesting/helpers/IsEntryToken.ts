import { Keys, Nesting, NestingKeyValue, NestingTuple } from "inferred-types/types";

/**
 * Tests the character `T` to see if it is a
 * starting character in the Nesting configuration.
 */
export type IsEntryToken<
    TChar extends string,
    TNesting extends Nesting
> = [string] extends [TChar]
    ? boolean
    // Handle empty config {} - no starting characters
    : [TNesting] extends [Record<string, never>]
        ? false
        : [Keys<TNesting>] extends [never]
            ? false
            : [TNesting] extends [NestingKeyValue]
                ? [TChar] extends [Keys<TNesting>[number]]
                    ? true
                    : false
                : [TNesting] extends [NestingTuple]
                    ? TNesting[0] extends readonly string[]
                        ? TChar extends TNesting[0][number]
                            ? true
                            : false
                        : never
                    : never;
