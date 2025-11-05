import type {
    Err,
    Slice,
    StartsWith,
    StringKeys,
    TakeStart,
    TakeStartFn,
    TakeStartMatches,
    TakeState
} from "inferred-types/types";

import {
    asTakeState,
    createFnWithProps,
    isErr,
    keysOf,
    slice,
    stripLeading
} from "inferred-types/runtime";
import {
    isArray,
    isNarrowableDictionary,
    isStringArray
} from "runtime/type-guards";

type Which<
    T extends TakeState,
    M extends readonly string[]
> = M extends [
    infer Head extends string,
    ...infer Rest extends readonly string[]
]
    ? StartsWith<T["parseString"], Head> extends true
        ? Head
        : Which<T, Rest>
    : undefined;

function findMatch<
    T extends TakeState,
    M extends readonly string[]
>(
    state: T,
    matches: M
) {
    return matches.find(i => state.parseString.startsWith(i)) as Which<T, M>;
}

function isCallback(val: unknown): val is TakeStartMatches<"callback"> {
    return isArray(val) && val.length > 2 && typeof val[0] === "function" && typeof val[1] === "string";
}

function isMapper(val: unknown): val is TakeStartMatches<"mapper"> {
    return isArray(val) && val.length === 1
        && isNarrowableDictionary(val[0]) && isStringArray(keysOf(val[0]));
}

type GetVariant<T extends TakeStartMatches> = T extends TakeStartMatches<"callback">
    ? {
        variant: "callback";
        callback: T[0];
        matches: Slice<T, 1>;
        lookup: undefined;
    }
    : T extends TakeStartMatches<"mapper">
        ? {
            variant: "mapper";
            callback: undefined;
            matches: StringKeys<T>;
            lookup: T[0];
        }
        : T extends TakeStartMatches<"default">
            ? {
                variant: "default";
                callback: undefined;
                matches: T;
                lookup: undefined;
            }
            : never;

function getVariant<const T extends TakeStartMatches>(matches: T): GetVariant<T> {
    if (isCallback(matches)) {
        return {
            variant: "callback",
            callback: matches[0],
            matches: slice(matches, 1),
            lookup: undefined
        } as unknown as GetVariant<T>;
    }
    else if (isMapper(matches)) {
        return {
            variant: "mapper",
            callback: undefined,
            matches: keysOf(matches[0]),
            lookup: matches[0]
        } as unknown as GetVariant<T>;
    }
    else {
        return {
            variant: "default",
            callback: undefined,
            matches,
            lookup: undefined
        } as unknown as GetVariant<T>;
    }
}

function handleCallback<T extends TakeState | Err<"skip"> | Err<"no-token"> | Err<"invalid-token">>(result: T) {
    return result;
}

/**
 * **takeStart**`(...matches) -> (value) -> TakeState | Err<"invalid-token">`
 *
 * A higher order function which:
 *
 * 1. first takes a list of "matches" (aka., string literal which it will look to
 * match to the the value passed in)
 * 2. the second call takes a string value (or alternatively a `TakeState` object)
 * and tries to match the parse string with the list of matches provided in the first
 * call.
 *
 * ### Tokenization
 *
 * By default this utility will populate the `tokens` property of the `TakeState`
 * with the matched string it finds. In the default state, the `tokens` it produces are
 * the same as the `parsed` strings it produces.
 *
 * If you wish to produce a _variant_ of the string found you can use either of the two
 * approaches:
 *
 * 1. **Mapper Object:**
 *
 *     A _mapper_ object is a dictionary where the _keys_ are the substrings you're trying to
 *     match on and the _values_ are the runtime value that you will map to when this substring is found.
 *     If this approach is used then the dictionary object _replaces_ the tuple of strings you
 *     would typically put into the `matches` variable. If you want to set not only the "value" but also
 *     the "type" you can set the _values_ of the object to a tuple of: `[ value: any, type: InputToken ]`.
 *
 *     Here is an example:
 *     ```ts
 *     const take = takeStart({
 *         foo: "fooy",
 *         bar: ["bar", "string"]
 *     });
 *     ```
 *
 *     In this example:
 *       - when the "foo" substring is parsed from the parse string the value _and_ type of the token will be "fooy"
 *       - when the "bar" substring is parsed from the parse string the value will be "bar" but the type will be `string`
 *
 *
 * 2. **Callback Function:**
 *
 *     You can also provide a callback function to handle mapping to `tokens`. Unlike the mapper object,
 *     using a callback function which will be _in addition to_ the tuple of match substrings. This callback
 *     will take the form of:
 *
 *     ```ts
 *
 *     function callback(
 *         value: string,
 *         state: TakeState
 *     ): TakeState | Err<"invalid-token"> | Err<"skip"> | Err<"no-token">
 *     ```
 *
 *     where:
 *       - `TakeState` allows the callback to mutate the state
 *       - `Err<"skip">` will keep the state exactly as it was
 *       - `Err<"no-token">` will keep the tokens as they were but remove the substring from
 *         the parse string and add it to the `parsed` property.
 *       - `Err<"invalid-token">` will immediately exit with this error
 *
 * **Note:** all variants of this function work on an enumerated set of "matches"
 * and because of this this function is able to handle non-matches by itself. If you want an
 * unconstrained set of start tokens then use the `take()` utility to create this yourself.
 */
export function takeStart< T extends TakeStartMatches>(...config: T): TakeStartFn<T> {
    const { variant, matches, callback, lookup } = getVariant(config);

    const fn = <const U extends string | TakeState>(value: U): TakeStart<T, U> => {
        const state = asTakeState(value);

        const match = findMatch(state, matches);

        // no match; return state unchanged
        if (!match) {
            return state as unknown as TakeStart<T, U>;
        }

        if (variant === "default") {
            const token = match;
            return {
                kind: "TakeState",
                parsed: [...state.parsed, match],
                parseString: stripLeading(state.parseString, match),
                tokens: [...state.tokens, token]
            } as unknown as TakeStart<T, U>;
        }

        if (variant === "mapper") {
            const mapped = lookup[match as keyof typeof lookup];
            const token = Array.isArray(mapped) ? (mapped as unknown[])[0] : mapped;

            return {
                kind: "TakeState",
                parsed: [...state.parsed, match],
                parseString: stripLeading(state.parseString, match),
                tokens: [...state.tokens, token]
            } as unknown as TakeStart<T, U>;
        }

        // callback variant
        const cbResult = handleCallback(callback!(match, state));
        if (isErr(cbResult, "invalid-token")) {
            return cbResult as unknown as TakeStart<T, U>;
        }
        if (isErr(cbResult, "skip")) {
            return state as unknown as TakeStart<T, U>;
        }
        if (isErr(cbResult, "no-token")) {
            return {
                kind: "TakeState",
                parsed: [...state.parsed, match],
                parseString: stripLeading(state.parseString, match),
                tokens: [...state.tokens]
            } as unknown as TakeStart<T, U>;
        }

        // assume callback returned a valid TakeState
        return cbResult as unknown as TakeStart<T, U>;
    };

    const result = createFnWithProps(fn, {
        variant,
        matches
    });

    return result;
}
