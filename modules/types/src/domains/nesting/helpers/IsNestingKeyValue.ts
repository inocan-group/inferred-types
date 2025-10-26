import type {
    AllLengthOf,
    As,
    Err,
    IsNestingConfig,
    Nesting,
    StringKeys,
    ToStringLiteral,
    Values
} from "inferred-types/types";

/**
 * Returns `true` if `T` is a valid `NestingKeyValue` otherwise returns a `invalid-nesting`
 * Error
 *
 * **NEW**: Now supports both:
 * - Simple form: `{ "(": ")" }` (values are strings)
 * - Hierarchical form: `{ "(": [")", {}] }` (values are [exit, nextLevel] tuples)
 * - Mixed form: `{ "(": [")", {}], "[": "]" }` (some values strings, some tuples)
 */
export type IsNestingKeyValue<T> = T extends Record<string, infer V>
    ? AllLengthOf<StringKeys<T>, 1> extends true
        // Check if ALL values are valid (either strings or tuples)
        ? V extends string
            // All values are simple strings
            ? AllLengthOf<As<Values<T>, readonly string[]>, 1> extends true
                ? true
                : Err<
                    `invalid-nesting/key-value`,
                    `Some of the values in this key-value were not a single character in length!`,
                    { values: ToStringLiteral<Values<T>> }
                >
            : V extends [infer Exit extends string, infer NextLevel]
                // All values are hierarchical tuples
                ? Exit extends string
                    ? Exit["length"] extends 1
                        ? IsNestingConfig<NextLevel> extends true
                            ? true
                            : Err<
                                `invalid-nesting/key-value`,
                                `The nextLevel configuration in the hierarchical tuple must be a valid Nesting config`,
                                { nextLevel: ToStringLiteral<NextLevel> }
                            >
                        : Err<
                            `invalid-nesting/key-value`,
                            `The exit token (first element of hierarchical tuple) must be a single character`,
                            { exit: ToStringLiteral<Exit> }
                        >
                    : Err<
                        `invalid-nesting/key-value`,
                        `The exit token must be a string`,
                        { exit: ToStringLiteral<Exit> }
                    >
                : V extends readonly [infer Exit extends string, infer NextLevel]
                    // All values are readonly hierarchical tuples
                    ? Exit extends string
                        ? Exit["length"] extends 1
                            ? IsNestingConfig<NextLevel> extends true
                                ? true
                                : Err<
                                    `invalid-nesting/key-value`,
                                    `The nextLevel configuration in the hierarchical tuple must be a valid Nesting config`,
                                    { nextLevel: ToStringLiteral<NextLevel> }
                                >
                            : Err<
                                `invalid-nesting/key-value`,
                                `The exit token (first element of hierarchical tuple) must be a single character`,
                                { exit: ToStringLiteral<Exit> }
                            >
                        : Err<
                            `invalid-nesting/key-value`,
                            `The exit token must be a string`,
                            { exit: ToStringLiteral<Exit> }
                        >
                    // Mixed values (union type) - validate each member
                    : V extends string | readonly [string, Nesting] | [string, Nesting]
                        ? true // Accept mixed configs
                        : Err<
                            `invalid-nesting/key-value`,
                            `Values must be either strings or [exit, nextLevel] tuples`,
                            { values: ToStringLiteral<V> }
                        >
        : Err<
            `invalid-nesting/key-value`,
            `Some of the keys in this key-value were not a single character in length!`,
            { keys: ToStringLiteral<StringKeys<T>> }
        >
    : Err<
        `invalid-nesting/key-value`,
        `Not a key-value type!`,
        { type: ToStringLiteral<T> }
    >;
