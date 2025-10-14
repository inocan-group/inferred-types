import { And, As, AssertionMapper, AssertValidation, TypeError } from "inferred-types/types";

type Mapper<
    TType extends string| undefined,
    TSubType extends string | undefined
> = {
    any: TypeError<
        `invalid-test/any-type`,
        `While testing for an Error condition, we instead got the 'any' type!`,
        { test: never; expected: Error;  type: TType; subType: TSubType; op: "isError"; }
    >,
    unknown: TypeError<
        `failed/isError`,
        `The test value MIGHT be an Error but currently the type is set as 'unknown' which masks whether at runtime this value would be an error.`,
        { test: never; expected: Error; type: TType; subType: TSubType; op: "isError";  }
    >,
    never: TypeError<
        `failed/isError`,
        `The test value was 'never', not an error!`,
        { test: never; expected: Error; type: TType; subType: TSubType; op: "isError";  }
    >
}

/**
 * **AssertError**`<TTest, [TType], [TSubType]>`
 *
 * Tests whether `TTest` is an Error.
 *
 * - optionally also tests that the error `type` or `subType` is correct
 */
export type AssertError<
    TTest,
    TType extends string | undefined = undefined,
    TSubType extends string | undefined = undefined
> = AssertValidation<TTest, Mapper<TType,TSubType>, Error> extends Error
    ? AssertValidation<TTest, Mapper<TType,TSubType>, Error>
    : TTest extends Error
        ? TType extends string
            ? TSubType extends string
                ? And<[
                    TTest extends { type: TType } ? true : false,
                    TTest extends { subType: TSubType } ? true : false,
                ]>
                : TTest extends { type: TType }
                    ? true
                    : false
            : true
        : false;
