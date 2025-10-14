import type { As, AssertionError, AssertionMapper, AssertValidation } from "inferred-types/types";

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
 * **AssertAssertionError**`<TTest, [TType], [TSubType]>`
 *
 * Tests whether `TTest` is an `AssertionError`.
 *
 * - optionally also tests that the error `type` or `subType` is correct
 */
export type AssertAssertionError<
    TTest,
    TType extends `invalid-test` | `failed` | undefined = undefined,
    TSubType extends string | undefined = undefined
> = AssertValidation<TTest, Mapper<TType, TSubType>, Error> extends Error
    ? AssertValidation<TTest, Mapper<TType, TSubType>, Error>
    : TTest extends AssertionError<any, any, any>
        ? TType extends string
            ? TSubType extends string
                ? TTest extends { classification: `${TType}/${TSubType}` } ? true : false
                : TTest extends { classification: `${TType}/${string}` }
                    ? true
                    : false
            : true
        : false;
