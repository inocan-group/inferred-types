import {
    Container,
    Err,
    Extends,
    HasSameKeys,
    IsAny,
    IsEqual,
    IsNever,
    Join,
    Keys
} from "inferred-types/types";

type Op = "equals" | "extends" | "hasSameKeys";

type TypeTest<
    TType extends string,
    TMsg extends string,
    TContext extends { test: unknown; expected: unknown }
> = {
    classification: TType,
    message: TMsg,
    testType: TContext["test"],
    expectedType: TContext["expected"]
}

export type Expect<T extends true> = T;

type Assert<
    TTest,
    TOp extends Op,
    TExpected
> = TOp extends "equals"
? [IsEqual<TTest,TExpected>] extends [true]
    ? true
    : TypeTest<
        `failed/equals`,
        `The type being tested did not equal the expected type!`,
        { test: TTest, expected: TExpected }
    >
: TOp extends "extends"
? Extends<TTest, TExpected> extends true
    ? true
    : TypeTest<
        `failed/extends`,
        `The type being tested did not extend the expected type!`,
        { test: TTest, expected: TExpected }
    >
: TOp extends "hasSameKeys"
? TTest extends Container
    ? TExpected extends Container
        ? HasSameKeys<TTest, TExpected> extends true
            ? true
            : TypeTest<
                `failed/has-same-keys`,
                `The test type had the keys of [ ${Join<Keys<TTest>, ", ">} ] which did not match the expected keys of [ ${Join<Keys<TExpected>, ", ">} ]`,
                { test: TTest, expected: TExpected }
            >
        : TypeTest<
            `invalid-test/non-container`,
            `While using the test assertion of 'hasSameKeys' the expected value was NOT a container type!`,
            { test: TTest, expected: TExpected}
        >
    : TypeTest<
        `failed/has-same-keys`,
        `While using the test assertion of 'hasSameKeys' the test type was found NOT to be a container which by extension makes this test fail!`,
        { test: TTest, expected: TExpected}
    >
: never;



export type Test<
    TTest,
    TOp extends Op,
    TExpected
> = IsAny<TTest> extends true
? Err<
    `invalid-test/any-type`,
    `A type test passed in a type value which evaluated to "any"! This is not allowed.`,
    { type: TTest, expected: TExpected}
>
: IsAny<TExpected> extends true
? Err<
    `invalid-test/any-type`,
    `A type test provided an expected type of "any"! This is not allowed.`,
    { type: TTest, expected: TExpected}
>
: IsNever<Assert<TTest,TOp,TExpected>> extends true
    ? Err<
    `invalid-test/never`,
    `The type test evaluated to NEVER! Was expected to be true!`
>
    : Assert<TTest,TOp,TExpected>;

