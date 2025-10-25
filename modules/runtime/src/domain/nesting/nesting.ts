import {
    AsNestingApi,
    isNamedNestingConfig,
    NestingApi,
    type AsNestingConfig,
    type NestedSplit,
    type NestedSplitPolicy,
    type Nesting,
    type RetainUntil__Nested
} from "inferred-types/types";

import {
    err,
    isError,
    isNestingKeyValue,
    isNestingTuple,
    isOk,
    isString,
    nestedSplit,
    retainUntil__Nested
} from "inferred-types/runtime";
import { assignNamedConfig } from "./assignNamedConfig";
import { BRACKET_NESTING } from "inferred-types/constants";

/**
 * given a valid nesting configuration, this produces the runtime API surface
 * for the `NestingApi`.
 */
function apiSurface<T extends Nesting | Error | undefined>(nesting: T): AsNestingApi<T> {
    if (isOk(nesting) ) {
        return {
            config: nesting,
            /**
             * calls the `retainUntil__Nested()` function with your nesting configuration.
             */
            retainUntil(
                str,
                find,
                incl = true
            ) {
                return retainUntil__Nested(
                    str,
                    find,
                    { include: incl, config: nesting }
                );
            },
            split<
                const TContent extends string,
                const TSplit extends string,
                const TPolicy extends NestedSplitPolicy = "omit"
            >(
                content: TContent,
                split: TSplit,
                policy: TPolicy = "omit" as TPolicy
            ) {
                return nestedSplit(content, split, nesting, policy);
            }

        } as NestingApi<T>;
    } else {
        return nesting as AsNestingApi<T>;
    }
}


/**
 * **Nesting** API
 *
 * This higher level function takes a valid `Nesting` configuration and returns a set of
 * function which are able to operate with nesting.
 */
export function nesting<
    const T extends Nesting
>(
    config: T
): AsNestingApi<T> {

    if (isNamedNestingConfig(config)) {
        const c = assignNamedConfig(config);
        return apiSurface(c) as AsNestingApi<T>;
    }
    if (isString(config)) {
        const err = err(
            "invalid-nesting-config/named",
            `The nesting config "${config}" is not a known named configuration!`
        );

        return apiSurface(err) as AsNestingApi<T>;
    }
    if (isNestingTuple(config) || isNestingKeyValue(config)) {
        return apiSurface(config) as AsNestingApi<T>;
    }
    if (isError(config)) {
        return apiSurface(config) as AsNestingApi<T>;
    }

    return err(
        "invalid-nesting-config",
        `The configuration provided to the 'nesting()' function was not a valid nesting configuration`
    ) as AsNestingApi<T>;
}
