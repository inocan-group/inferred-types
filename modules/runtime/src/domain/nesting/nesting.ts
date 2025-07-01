import type {
    FromNamedNestingConfig,
    IsNestingConfig,
    NestedSplit,
    NestedSplitPolicy,
    Nesting,
    NestingConfig__Named,
    RetainUntil__Nested
} from "inferred-types/types";
import {
    err,
    isError,
    isNestingKeyValue,
    isNestingTuple,
    isString,
    nestedSplit,
    retainUntil__Nested
} from "inferred-types/runtime";

type Returns<T extends Nesting | NestingConfig__Named> = IsNestingConfig<T> extends true
    ? NestingApi<FromNamedNestingConfig<T>>
    : Error;

export type NestingApi<TNesting extends Nesting> = {
    retainUntil<
        const TStr extends string,
        const TFind extends string | readonly string[],
        const TInclude extends boolean = true
    >(
        str: TStr,
        find: TFind,
        incl?: TInclude
    ): TFind extends string
        ? RetainUntil__Nested<TStr, TFind, TInclude, TNesting>
        : RetainUntil__Nested<TStr, TFind[number], TInclude, TNesting>;
    split<
        const TContent extends string,
        const TSplit extends string,
        const TPolicy extends NestedSplitPolicy = "omit"
    >(
        content: TContent,
        split: TSplit,
        policy?: TPolicy
    ): NestedSplit<TContent, TSplit, TNesting, TPolicy>;
};

function apiSurface<T extends Nesting | NestingConfig__Named>(nesting: T) {
    return {
        /**
         * calls the `retainUntil__Nested()` function with your nesting configuration.
         */
        retainUntil<
            const TStr extends string,
            const TFind extends string | readonly string[],
            const TInclude extends boolean = true

        >(
            str: TStr,
            find: TFind,
            incl: TInclude = true as TInclude
        ) {
            return retainUntil__Nested(str, find, incl, nesting);
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

    };
}

export function nesting<
    const T extends Nesting | NestingConfig__Named
>(
    config: T
): Returns<T> {
    let nesting: Nesting;

    if (isString(config)) {
        if (config === "default" || config === "brackets") {
            nesting = {
                "{": "}",
                "[": "]",
                "<": ">",
                "(": ")"
            };
        }
        else if (config === "quotes") {
            nesting = {
                "\"": "\"",
                "'": "'",
                "`": "`"
            };
        }
        else {
            throw err("invalid/named-nesting", `An unknown named nesting type of "${config}" was passed into createNestingConfig()!`);
        }
    }
    else {
        if (isNestingTuple(config) || isNestingKeyValue(config)) {
            nesting = config;
        }
        else if (isError(config)) {
            return config as unknown as Returns<T>;
        }
        else {
            return err("invalid-nesting", `The configuration provided to the 'nesting()' function was not a valid nesting configuration`) as unknown as Returns<T>;
        }
    }

    return apiSurface(nesting) as Returns<T>;
}
