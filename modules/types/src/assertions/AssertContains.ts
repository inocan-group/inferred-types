import type {
    As,
    AssertionError,
    AssertionMapper,
    AssertValidation,
    Contains
} from "inferred-types/types";

type Mapper = As<{
    any: AssertionError<
        `invalid-test/any-type`,
        `While testing for containment, we instead got the 'any' type!`,
        { test: never; expected: never; op: "contains" }
    >;
    unknown: AssertionError<
        `failed/contains`,
        `The test value is 'unknown', which masks whether the value contains the expected element.`,
        { test: never; expected: never; op: "contains" }
    >;
    never: AssertionError<
        `failed/contains`,
        `The test value was 'never', which cannot contain anything!`,
        { test: never; expected: never; op: "contains" }
    >;
}, AssertionMapper>;

/**
 * **AssertContains**
 *
 * Tests whether a string, number, or array type in `TTest` _contains_ `TExpected`
 */
export type AssertContains<
    TTest,
    TExpected
> = AssertValidation<TTest, Mapper, TExpected> extends { kind: "AssertionError" }
    ? AssertValidation<TTest, Mapper, TExpected>
    : [TTest] extends [string]
        ? Contains<TTest, TExpected>
        : [TTest] extends [number]
            ? Contains<TTest, TExpected>
            : [TTest] extends [readonly unknown[]]
                ? Contains<TTest, TExpected>
                : false;
