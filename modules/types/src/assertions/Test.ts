import type {
    And,
    As,
    Container,
    ContainsAll,
    DoesNotExtend,
    TypeError,
    Err,
    Extends,
    HasSameKeys,
    HasSameValues,
    IsAny,
    IsEqual,
    IsNever,
    IsString,
    Join,
    Keys,
} from "inferred-types/types";





/** ensure the expected type for error checking is valid */
type IsValidExpectedError<T> = T extends Error | null | true | undefined | string
    ? true
    : false;

/**
 * hands validation for Errors which are being checked for type/subtype
 */
type ValidateErrorType<
    TTest,
    TExpected extends string
> = TTest extends Error
    ? TExpected extends `${infer Type}/${infer Subtype}`
        ? "type" extends keyof TTest
            ? "subType" extends keyof TTest
                ? And<[
                    TTest["type"] extends Err<TExpected>["type"] ? true : false,
                    TTest["subType"] extends Err<TExpected>["subType"] ? true : false,
                ]> extends true
                    ? true // PASS
                    : TypeError<
                        `failed/isError`,
                        `The tested type is an Error but does not match the type/subtype of '${TExpected}'. Instead it was '${As<TTest["type"], string>}/${As<TTest["subType"], string>}'`,
                        { test: TTest; expected: TExpected; type: Type; subType: Subtype }
                    >
                : TTest["type"] extends Err<TExpected>["type"]
                    ? true // PASS
                    : TypeError<
                        `failed/isError`,
                    `The tested type is an Error but it's type was not of the type "${Type}"!`,
                    { test: TTest; expected: TExpected; type: Type; subType: Subtype }
                    >
            : "type" extends keyof TTest
                ? TTest["type"] extends Err<TExpected>["type"]
                    ? true // PASS
                    : TypeError<
                        `failed/isError`,
                    `The tested type is an Error but it's type was not of the type "${Type}"!`,
                    { test: TTest; expected: TExpected }
                    >
                : TypeError<
                    `failed/isError`,
                `The tested type is an Error but has no 'type' property defined so unable to test it's value against the expected type of '${Err<TExpected>["type"]}'`,
                { test: TTest; expected: TExpected }
                >

        : "type" extends keyof TTest
            ? TTest["type"] extends Err<TExpected>["type"]
                ? true // PASS
                : TypeError<
                    `failed/isError`,
                    `The tested type is an Error but it's type was not of the type ${Err<TExpected>["type"]}; instead type property was: ${As<TTest["type"], string>}`,
                    { test: TTest; expected: TExpected }
                >
            : TypeError<
                `failed/isError`,
                `The tested type is an Error but has no 'type' property defined so unable to test it's value against the expected type of ${Err<TExpected>["type"]}`,
                { test: TTest; expected: TExpected }
            >
    : TypeError<
        `invalid-test/isError`,
        `The test appears to be an attempt to test if a type is particular type/subtype of an Error but must be a valid string literal and wasn't!`,
        { test: TTest; expected: TExpected }
    >;



type Assert<
    TTest,
    TOp extends AssertionType,
    TExpected
> = TOp extends "equals"
    ? [IsEqual<TTest, TExpected>] extends [true]
        ? true
        : TypeError<
            `failed/equals`,
            `The type being tested did not equal the expected type!`,
            { test: TTest; expected: TExpected }
        >
    : TOp extends "extends"
        ? Extends<TTest, TExpected> extends true
            ? true
            : TypeError<
                `failed/extends`,
                `The type being tested did not extend the expected type!`,
                { test: TTest; expected: TExpected }
            >
        : TOp extends "doesNotExtend"
            ? DoesNotExtend<TTest, TExpected> extends true
                ? true
                : TypeError<
                    `failed/doesNotExtend`,
                    `The test type extended the comparison type but was not supposed to!`,
                    { test: TTest; expected: TExpected }
                >
            : TOp extends "hasSameKeys"
                ? TTest extends Container
                    ? TExpected extends Container
                        ? HasSameKeys<TTest, TExpected> extends true
                            ? true
                            : TypeError<
                                `failed/has-same-keys`,
                `The test type had the keys of [ ${Join<Keys<TTest>, ", ">} ] which did not match the expected keys of [ ${Join<Keys<TExpected>, ", ">} ]`,
                { test: TTest; expected: TExpected }
                            >
                        : TypeError<
                            `invalid-test/non-container`,
                            `While using the test assertion of 'hasSameKeys' the expected value was NOT a container type!`,
                            { test: TTest; expected: TExpected }
                        >
                    : TypeError<
                        `failed/has-same-keys`,
                        `While using the test assertion of 'hasSameKeys' the test type was found NOT to be a container which by extension makes this test fail!`,
                        { test: TTest; expected: TExpected }
                    >
                : TOp extends "hasSameValues"
                    ? TTest extends Container
                        ? TExpected extends Container
                            ? HasSameValues<TTest, TExpected> extends true
                                ? true
                                : TypeError<
                                    `failed/has-same-values`,
                                    `The 'has-same-values' test assertion failed because the tuple elements had different types!`,
                                    { test: TTest; expected: TExpected }
                                >
                            : TypeError<
                                `invalid-test/has-same-values`,
                                `The expected type for this test was NOT a 'Container' type and it must be when using the 'has-same-values' test assertion!`,
                                { test: TTest; expected: TExpected }
                            >
                        : TypeError<
                            `failed/has-same-values`,
                            `The 'has-same-values' test assertion failed because the test value was NOT a tuple type!`,
                            { test: TTest; expected: TExpected }
                        >
                    : TOp extends `isError`
                        ? IsValidExpectedError<TExpected> extends true
                            ? IsString<TExpected> extends true
                                ? ValidateErrorType<TTest, As<TExpected, string>>

                                : TExpected extends null | undefined | true
                                // match  on ANY error
                                    ? TTest extends Error
                                        ? true // PASS
                                        : TypeError<
                                            `failed/isError`,
                                            `The tested type was not an error!`,
                                            { test: TTest; expected: TExpected }
                                        >
                                    : And<[
                                        TExpected extends Error ? true : false,
                                        TTest extends Error ? false : true
                                    ]> extends true
                                        ? TypeError<
                                            `failed/isError`,
                                            `The type assertion 'isError' failed because the tested type is NOT an error and therefore will never extend the expected Error!`,
                                            { test: TTest; expected: TExpected }
                                        >

                                        : And<[
                                            TExpected extends Error ? true : false,
                                            TTest extends TExpected ? true : false,
                                        ]> extends true
                                            ? true // PASS
                                            : TypeError<
                                                `failed/isError`,
                                                `While the tested type is an error, it does not extend the error type which extends the expected type`,
                                                { test: TTest; expected: TExpected }
                                            >
                            : TypeError<
                                `invalid-test/isError`,
                                `The expected error type is not a valid type! Using a string value is allowed to indicate the error's "type", Using 'null', 'undefined', or 'true' are also valid to allow matching on any error type, and of course any type which extends Error is also valid!`,
                                { test: TTest; expected: TExpected }
                            >

                        : TOp extends "containsAll"
                            ? TExpected extends readonly string[]
                                ? TTest extends string
                                    ? ContainsAll<TTest, TExpected> extends true
                                        ? true
                                        : TypeError<
                                            `failed/containsAll`,
                    `The test string -- '${TTest}' -- did not extend all of the substrings it was supposed to!`,
                    { test: TTest; expected: TExpected }
                                        >
                                    : TypeError<
                                        `failed/containsAll`,
                                        `The test value for a 'containsAll' assertion was not a string!`,
                                        { test: TTest; expected: TExpected }
                                    >
                                : TypeError<
                                    `invalid-test/containsAll`,
                                    `The expected type for a 'containsAll' assertion must be a tuple of strings!`,
                                    { test: TTest; expected: TExpected }
                                >

                            : never;

/**
 * **Test**`<TTest, TOp, TExpected>`
 *
 * A type test which `TTest` when _compared_ using the `TOp` operation
 * to `TExpected` results in a true outcome.
 *
 * ### Operations
 *
 * - `equals`
 * - `extends`
 * - `doesNotExtend`
 * - `hasSameKeys`
 * - `hasSameValues`
 * - `isError`
 * - `containsAll`
 */
export type Test<
    TTest,
    TOp extends AssertionType,
    TExpected
> = [IsAny<TTest>] extends [true]
    ? TypeError<
        `invalid-test/any-type`,
        `A type test passed in "any" as the test value! This is not allowed.`,
        { test: TTest; expected: TExpected; assertion: TOp }
    >
    : [IsAny<TExpected>] extends [true]
        ? TypeError<
            `invalid-test/any-type`,
            `A type test passed in "any" as the expected type! This is not allowed.`,
            { test: TTest; expected: TExpected; assertion: TOp }
        >
        : [IsAny<Assert<TTest, TOp, TExpected>>] extends [true]
            ? TypeError<
                `invalid-test/any`,
                `The test evaluated to ANY! This indicates a problem in the test assertion!`,
                { test: TTest; expected: TExpected; assertion: TOp }
            >
            : [IsNever<Assert<TTest, TOp, TExpected>>] extends [true]
                ? TypeError<
                    `invalid-test/never`,
                    `The test evaluated to NEVER! This indicates a problem in the test assertion!`,
                    { test: TTest; expected: TExpected; assertion: TOp }
                >
                : Assert<TTest, TOp, TExpected>;

