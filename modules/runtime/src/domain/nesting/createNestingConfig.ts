import type { BracketNesting, DefaultNesting, Nesting, QuoteNesting } from "inferred-types/types";
import { err, isString } from "inferred-types/runtime";

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

export function createNestingConfig<
    const T extends Nesting | NamedNestingConfig
>(
    config: T
): Returns<T> {
    if (isString(config)) {
        if (config === "default" || config === "brackets") {
            return {
                "{": "}",
                "[": "]",
                "<": ">",
                "(": ")"
            } as Returns<T>;
        }
        else if (config === "quotes") {
            return {
                "\"": "\"",
                "'": "'",
                "`": "`"
            } as Returns<T>;
        }
        else {
            throw err("invalid/named-nesting", `An unknown named nesting type of "${config}" was passed into createNestingConfig()!`);
        }
    }
    else {
        return config as Returns<T>;
    }
}
