import type { Nesting, NestingKeyValue, NestingTuple } from "inferred-types/types";

/**
 * Tests the character `T` to see if it is a
 * starting character in the Nesting configuration.
 */
export type IsEntryToken<
    TChar extends string,
    TNesting extends Nesting
> = [string] extends [TChar]
    ? boolean
    : TNesting extends string
        ? false
    // Handle empty config {} - no starting characters
        : [TNesting] extends [Record<string, never>]
                ? false
                : [keyof TNesting] extends [never]
                        ? false
                        : [TNesting] extends [NestingKeyValue]
                                ? [TChar] extends [Extract<keyof TNesting, string>]
                                        ? true
                                        : false
                                : [TNesting] extends [NestingTuple]
                                        ? TNesting[0] extends readonly string[]
                                            ? TChar extends TNesting[0][number]
                                                ? true
                                                : false
                                            : never
                                        : never;
