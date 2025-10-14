import { AssertionOp, IsAny,  IsNever,  IsUnknown,  TypeError } from "inferred-types/types";


export type AssertionMapper = {
    any: boolean | TypeError<any,any,any>;
    unknown: boolean | TypeError<any,any,any>;
    never: boolean | TypeError<any,any,any>;
}


export type AssertValidation<
    TTest,
    TOp extends AssertionOp | AssertionMapper,
    TExpected
> = TOp extends AssertionOp


? [IsAny<TTest>] extends [true]
    ? TypeError<
        `invalid-test/any-type`,
        `The test value passed in was of type 'any'! This is not allowed.`,
        { test: TTest; expected: TExpected; assertion: TOp }
    >
    : [IsAny<TExpected>] extends [true]
        ? TypeError<
            `invalid-test/any-type`,
            `The expected type passed into this test was 'any'! This is not allowed.`,
            { test: TTest; expected: TExpected; assertion: TOp }
        >
    : undefined
: TOp extends AssertionMapper
    ? [IsNever<TTest>] extends [true]
        ? TOp["never"]
    : [IsAny<TTest>] extends [true]
        ? TOp["any"]
    : [IsUnknown<TTest>] extends [true]
        ? TOp["unknown"]
    : [IsAny<TExpected>] extends [true]
        ? TypeError<
            `invalid-test/any-type`,
            `The expected type passed into this test was 'any'! This is not allowed.`,
            { test: TTest; expected: TExpected; assertion: TOp }
        >
    : undefined
: never;
