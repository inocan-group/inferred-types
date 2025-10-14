import { AssertValidation, IsEqual } from "inferred-types/types";


/**
 * **AssertTrue**`<TTest>`
 *
 * Type test assertion that `TTest` is `true`.
 */
export type AssertTrue<
    TTest
> = AssertValidation<TTest, "equals", true> extends Error
    ? AssertValidation<TTest, "equals", true>
    : IsEqual<TTest, true>;
