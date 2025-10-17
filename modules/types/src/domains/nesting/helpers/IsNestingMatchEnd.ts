import {
    IsNestingEnd,
    Last,
    Nesting,
    NestingKeyValue
} from "inferred-types/types";
import { ExtractExitTokens } from "./ExtractExitTokens"

/**
 * **IsNestingMatchEnd**`<TChar, TStack, TNesting>`
 *
 * Tests the `TChar` to see if it is not only a valid
 * _ending_ token but that it is _right_ ending token
 * based on what's on the stack.
 *
 * **NEW**: Now properly handles hierarchical configs by extracting exit tokens
 * from [exit, nextLevel] tuples
 */
export type IsNestingMatchEnd<
    TChar extends string,
    TStack extends readonly string[],
    TNesting extends Nesting
> = [IsNestingEnd<TChar, TNesting>] extends [true]
    ? [TNesting] extends [NestingKeyValue]
        ? [Last<TStack>] extends [string]
            ? TNesting[Last<TStack>] extends infer Value
                // Extract exit token from hierarchical or simple value
                ? [TChar] extends [ExtractExitTokens<Value>]
                    ? true
                    : false
                : never
            : never
        : true
    : false;

