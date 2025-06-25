import { BracketNesting, DefaultNesting, Nesting, QuoteNesting } from "inferred-types/types";
import { err, isError, isNestingKeyValue, isNestingTuple, isString } from "inferred-types/runtime";

type NamedNestingConfig = "default" | "brackets" | "quotes";

type Returns<
    T extends Nesting | NamedNestingConfig
> = T extends string
? T extends "default"
    ? DefaultNesting
: T extends "brackets"
    ? BracketNesting
: T extends "quotes"
    ? QuoteNesting
: never
: T & Nesting;

function apiSurface<T extends Nesting>(nesting: T) {

    return {
        retainUntil: null,

    }

}


export function nesting<
    const T extends Nesting | NamedNestingConfig
>(
    config: T
) {
    let nesting: Nesting;

    if (isString(config)) {
        if(config === "default" || config === "brackets") {
            nesting = {
                "{": "}",
                "[": "]",
                "<": ">",
                "(": ")"
            };
        }
        else if (config === "quotes") {
            nesting = {
                '"': '"',
                '\'': '\'',
                '`': '`'
            };
        }
        else {
            throw err("invalid/named-nesting", `An unknown named nesting type of "${config}" was passed into createNestingConfig()!`)
        }
    } else {
        if(isNestingTuple(config) || isNestingKeyValue(config)) {
            nesting = config;
        } else if (isError(config)) {
            return config;
        } else {
            return err("invalid-nesting", `The configuration provided to the 'nesting()' function was not a valid nesting configuration`)
        }
    }

    return apiSurface(nesting);

}

