import type { AsNestingConfig, KnownNestingConfig } from "inferred-types/types";
import {
    BRACKET_NESTING,
    QUOTE_NESTING,
    SHALLOW_BRACKET_NESTING,
    SHALLOW_QUOTE_NESTING
} from "inferred-types/constants";
import { err } from "runtime/errors";

/**
 * this function is used to take a "named nesting config" and
 * convert it to a proper structural definition.
 *
 * NOTE: not meant to exported for users as it's just a distraction
 */
export function assignNamedConfig<T extends KnownNestingConfig>(config: T): AsNestingConfig<T> {
    switch (config) {
        case "brackets": {
            return BRACKET_NESTING as AsNestingConfig<T>;
        }
        case "brackets-and-quotes": {
            return {
                ...BRACKET_NESTING,
                ...QUOTE_NESTING
            } as AsNestingConfig<T>;
        }
        case "quotes": {
            return QUOTE_NESTING as AsNestingConfig<T>;
        }
        case "shallow-brackets": {
            return SHALLOW_BRACKET_NESTING as AsNestingConfig<T>;
        }
        case "shallow-brackets-and-quotes": {
            return {
                ...SHALLOW_BRACKET_NESTING,
                ...SHALLOW_QUOTE_NESTING
            } as AsNestingConfig<T>;
        }
    }

    return err(
        "invalid-nesting-config/named",
        `The nesting config "${config}" is not a known named configuration!`
    ) as unknown as AsNestingConfig<T>;
}
