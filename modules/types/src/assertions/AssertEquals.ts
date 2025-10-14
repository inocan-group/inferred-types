import type { AssertionError, AssertValidation, IsEqual } from "inferred-types/types";

/**
 * **AssertEqual**`<TTest, TExpected>`
 *
 * Type test assertion that `TTest` _equals_ `TExpected`.
 */
export type AssertEqual<
    TTest,
    TExpected
> = AssertValidation<TTest, "equals", TExpected> extends AssertionError
    ? AssertValidation<TTest, "equals", TExpected>
    : IsEqual<TTest, TExpected>;

/**
 * **AssertEquals**`<TTest, TExpected>`
 *
 * Type test assertion that `TTest` _equals_ `TExpected`.
 *
 * **Note:** _alias to `AssertEqual`_
 */
export type AssertEquals<
    TTest,
    TExpected
> = AssertEqual<TTest, TExpected>;
