import { AssertValidation, IsEqual, Not } from "inferred-types/types";

/**
 * **AssertNotEqual**`<TTest, TExpected>`
 *
 * Type test assertion that `TTest` _does not equal_ `TExpected`.
 */
export type AssertNotEqual<
    TTest,
    TExpected
> = AssertValidation<TTest, "equals", TExpected> extends Error
    ? AssertValidation<TTest, "equals", TExpected>
    : Not<IsEqual<TTest, TExpected>>;

