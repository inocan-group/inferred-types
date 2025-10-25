import {
    AllLengthOf,
    AllStringLiterals,
    Err,
    IsNestingConfig,
    NestingTupleConfig,
    ToStringLiteral
} from "inferred-types/types";

/**
 * IsNestingTuple<T>
 *
 * A boolean-ish operator which returns `true` when `T` is a valid `NestingTuple`
 *
 * - if `Start` or `End` tuple elements are still a union type then this
 * return `boolean`
 * - when used in the runtime, however, it should resolve the union to a literal
 * - instead of returning `false` this utility returns an error which will help
 * debug the problem.
 * - **NEW**: Now supports optional third element for hierarchical nesting
 *
 * **Related:**
 * - `IsNestingKeyValue<T>`
 * - `isNestingTuple(val)`, `isNestingKeyValue(val)`
 */
export type IsNestingTuple<T> = T extends [
    infer Start extends readonly string[],
    infer End extends readonly string[] | undefined | NestingTupleConfig,
    ...infer Rest
]
    ? [AllStringLiterals<Start>] extends [true]
        ? [AllLengthOf<Start, 1>] extends [true]
            ? [End] extends [readonly string[]]
                ? [AllStringLiterals<End>] extends [true]
                    ? [AllLengthOf<End, 1>] extends [true]
                        // Check if optional third element is valid Nesting (or absent)
                        ? Rest extends []
                            ? true
                            : Rest extends [infer NextLevel]
                                ? IsNestingConfig<NextLevel> extends true
                                    ? true
                                    : Err<
                                        `invalid-nesting/tuple`,
                                        `The optional 3rd element (nextLevel) must be a valid Nesting configuration`,
                                        { nextLevel: ToStringLiteral<NextLevel> }
                                    >
                                : Err<
                                    `invalid-nesting/tuple`,
                                    `NestingTuple can have at most 3 elements: [start, end, nextLevel?]`,
                                    { tuple: ToStringLiteral<T> }
                                >
                        : Err<
                            `invalid-nesting/tuple`,
                            `the tuple being tested had END tokens which were longer than a single character!`,
                            { end: ToStringLiteral<End> }
                        >
                    : boolean
                : [End] extends [undefined]
                    ? Rest extends []
                        ? true
                        : Rest extends [infer NextLevel]
                            ? IsNestingConfig<NextLevel> extends true
                                ? true
                                : Err<
                                    `invalid-nesting/tuple`,
                                    `The optional 3rd element (nextLevel) must be a valid Nesting configuration`,
                                    { nextLevel: ToStringLiteral<NextLevel> }
                                >
                            : Err<
                                `invalid-nesting/tuple`,
                                `NestingTuple can have at most 3 elements: [start, end, nextLevel?]`,
                                { tuple: ToStringLiteral<T> }
                            >
                : [End] extends [NestingTupleConfig]
                    ? true
                : Err<
                    `invalid-nesting/tuple`,
                    `The END segment (aka, 2nd element) of the tuple should be either undefined or a 'readonly string[]'. It was neither!`,
                    { end: ToStringLiteral<End>; tuple: ToStringLiteral<T> }
                >
            : Err<
                `invalid-nesting/tuple`,
                `The START segment (aka, 1st element) had character strings which were longer than a single character! This is not allowed.`,
                { start: ToStringLiteral<Start>; tuple: ToStringLiteral<T> }
            >
        : false
    : false;
