import type { KnownNestingConfig } from "@inferred-types/types";
import type {
    AsNestingApi,
    NestedSplitPolicy,
    Nesting,
    NestingApi
} from "inferred-types/types";

import {
    err,
    fallback,
    isError,
    isNestingKeyValue,
    isNestingTuple,
    isString,
    isUndefined,
    nestedSplit,
    retainUntil__Nested
} from "inferred-types/runtime";
import {
    isNamedNestingConfig

} from "inferred-types/types";
import { assignNamedConfig } from "./assignNamedConfig";

/**
 * given a valid nesting configuration, this produces the runtime API surface
 * for the `NestingApi`.
 */
function apiSurface<T extends Nesting>(nesting: T): NestingApi<T> {
    return {
        config: nesting,
        retainUntil(
            str,
            find,
            incl
        ) {
            return retainUntil__Nested(
                str,
                find,
                { include: fallback(incl, true), config: nesting || "brackets" }
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
            return nestedSplit(content, split, nesting, policy) as unknown;
        }

    } as NestingApi<T>;
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
        const c: KnownNestingConfig = assignNamedConfig(config) as KnownNestingConfig;
        return apiSurface(c) as AsNestingApi<T>;
    }
    if (isUndefined(config)) {
        return apiSurface("brackets") as AsNestingApi<T>;
    }

    if (isString(config)) {
        const e = err(
            "invalid-nesting-config/named",
            `The nesting config "${config}" is not a known named configuration!`
        );

        return apiSurface(e) as unknown as AsNestingApi<T>;
    }
    if (isNestingTuple(config) || isNestingKeyValue(config)) {
        return apiSurface(config) as AsNestingApi<T>;
    }
    if (isError(config)) {
        return apiSurface(config) as unknown as AsNestingApi<T>;
    }

    return err(
        "invalid-nesting-config",
        `The configuration provided to the 'nesting()' function was not a valid nesting configuration`
    ) as unknown as AsNestingApi<T>;
}
