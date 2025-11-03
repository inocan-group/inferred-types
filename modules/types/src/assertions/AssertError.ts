import type {
    And,
    As,
    AssertionError,
    AssertionMapper,
    AssertValidation
} from "inferred-types/types";

type Mapper<
    TType extends string | undefined,
    TSubType extends string | undefined
> = As<{
    any: AssertionError<
        `invalid-test/any-type`,
        `While testing for an Error condition, we instead got the 'any' type!`,
        { test: never; expected: Error; type: TType; subType: TSubType; op: "isError" }
    >;
    unknown: AssertionError<
        `failed/isError`,
        `The test value MIGHT be an Error but currently the type is set as 'unknown' which masks whether at runtime this value would be an error.`,
        { test: never; expected: Error; type: TType; subType: TSubType; op: "isError" }
    >;
    never: AssertionError<
        `failed/isError`,
        `The test value was 'never', not an error!`,
        { test: never; expected: Error; type: TType; subType: TSubType; op: "isError" }
    >;
}, AssertionMapper>;

/**
 * **AssertError**`<TTest, [TType], [TSubType]>`
 *
 * Tests whether `TTest` is an Error.
 *
 * - optionally also tests that the error `type` or `subType` is correct
 * - if `TType` contains a `/`, it will be split into type and subtype automatically
 */
export type AssertError<
    TTest,
    TType extends string | undefined = undefined,
    TSubType extends string | undefined = undefined
> = TType extends `${infer Type}/${infer SubType}`
    ? TSubType extends string
        ? never // Cannot provide both composite TType and explicit TSubType
        : AssertValidation<TTest, Mapper<TType, undefined>, Error> extends { kind: "AssertionError" }
            ? AssertValidation<TTest, Mapper<TType, undefined>, Error>
            : TTest extends Error
                ? And<[
                    TTest extends { type: any }
                        ? [TTest["type"]] extends [Type]
                            ? [Type] extends [TTest["type"]]
                                ? true
                                : false
                            : false
                        : false,
                    TTest extends { subType: any }
                        ? [TTest["subType"]] extends [SubType]
                            ? [SubType] extends [TTest["subType"]]
                                ? true
                                : false
                            : false
                        : false
                ]>
                : false
    : AssertValidation<TTest, Mapper<TType, TSubType>, Error> extends { kind: "AssertionError" }
        ? AssertValidation<TTest, Mapper<TType, TSubType>, Error>
        : TTest extends Error
            ? TType extends string
                ? TSubType extends string
                    ? And<[
                        TTest extends { type: any }
                            ? [TTest["type"]] extends [TType]
                                ? [TType] extends [TTest["type"]]
                                    ? true
                                    : false
                                : false
                            : false,
                        TTest extends { subType: any }
                            ? [TTest["subType"]] extends [TSubType]
                                ? [TSubType] extends [TTest["subType"]]
                                    ? true
                                    : false
                                : false
                            : false
                    ]>
                    : TTest extends { type: any }
                        ? [TTest["type"]] extends [TType]
                            ? [TType] extends [TTest["type"]]
                                ? true
                                : false
                            : false
                        : false
                : true
            : false;
