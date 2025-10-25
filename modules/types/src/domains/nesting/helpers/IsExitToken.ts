import type { Nesting, NestingKeyValue, NestingTuple, Values } from "inferred-types/types";
import { ExtractExitTokens } from "./ExtractExitTokens"


/**
 * Tests the character `T` to see if it is a
 * terminal character in the Nesting configuration.
 */
export type IsExitToken<
    TChar extends string,
    TNesting extends Nesting
> = [string] extends [TChar]
    ? boolean
    : [TNesting] extends [NestingKeyValue]
        // Extract exit tokens from values (handles both string and [exit, nextLevel])
        ? [TChar] extends [ExtractExitTokens<Values<TNesting>[number]>]
            ? true
            : false
        : [TNesting] extends [NestingTuple]
            ? [TNesting[1]] extends [readonly string[]]
                ? [TChar] extends [TNesting[1][number]]
                    ? true
                    : false
                : [TNesting[1]] extends [undefined]
                    ? [TChar] extends [TNesting[0][number]]
                        ? false
                        : true
                    : never
            : never;
