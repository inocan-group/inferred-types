import { KNOWN_NESTING_CONFIGURATIONS } from 'inferred-types/constants';
import {
    As,
    Err,
    Nesting,
    NestingTuple,
    NestingKeyValue,
} from "inferred-types/types";

import {
    ShallowQuoteNesting,
    ShallowBracketNesting,
    ShallowBracketAndQuoteNesting
} from "./shallow";
import {
    BracketNesting,
    QuoteNesting,
    BracketAndQuoteNesting
} from "./recursive";

/**
 * **KnownNestingConfig**
 *
 * the list of the known _named_ nesting configurations defined in this repo.
 */
export type KnownNestingConfig = typeof KNOWN_NESTING_CONFIGURATIONS[number];


/**
 * **AsNestingConfig**`<T>`
 *
 * convert a "named" nesting configuration to the actual shape
 * of that named configuration points to.
 */
export type AsNestingConfig<T extends Nesting> = As<
    [T] extends [string]
        ? T extends "brackets"
            ? BracketNesting
        : T extends "quotes"
            ? QuoteNesting
        : T extends "brackets-and-quotes"
            ? BracketAndQuoteNesting
        : T extends "shallow-brackets"
            ? ShallowBracketNesting
        : T extends "shallow-quotes"
            ? ShallowQuoteNesting
        : T extends "shallow-brackets-and-quotes"
            ? ShallowBracketAndQuoteNesting

        : Err<
            `invalid-nesting-config/name`,
            `The nesting config "${T}" is not a known named configuration!`,
            { config: T }
        >
    : [T] extends [NestingKeyValue]
        ? T
    : [T] extends [NestingTuple]
        ? T
    : Err<
        `invalid-nesting-config/structured`,
        `The nesting configuration passed in was invalid! You must use either a known "named configuration" like "quotes" or "brackets" or `
    >,
    Error | NestingKeyValue | NestingTuple
>

