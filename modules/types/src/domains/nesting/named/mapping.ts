import { As } from "inferred-types/types";
import { Nesting } from "types/domains";
import {
    ShallowQuoteNesting,
    ShallowBracketNesting,
    ShallowBracketAndQuoteNesting
} from "./shallow";
import {
    DefaultNesting,
    BracketNesting,
    QuoteNesting,
    BracketAndQuoteNesting
} from "./recursive";

/**
 * the list of named nesting configurations defined in this repo
 */
export type NestingConfig__Named =
    | "default"
    | "brackets"
    | "quotes"
    | "brackets-and-quotes"
    | "shallow-brackets"
    | "shallow-quotes"
    | "shallow-brackets-and-quotes";


/**
 * maps the named nesting configuration
 */
export type FromNamedNestingConfig<T extends Nesting | NestingConfig__Named> = As<
    T extends Nesting
        ? T
        : T extends "default"
            ? DefaultNesting
        : T extends "brackets"
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
            : never,
    Nesting
>;
