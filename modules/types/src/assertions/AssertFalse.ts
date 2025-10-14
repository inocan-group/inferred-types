import type { AssertValidation, IsEqual } from "inferred-types/types";

/**
 * **AssertFalse**`<TTest>`
 *
 * Type test assertion that `TTest` is `false`.
 */
export type AssertFalse<
    TTest
> = AssertValidation<TTest, "equals", false> extends Error
    ? AssertValidation<TTest, "equals", false>
    : IsEqual<TTest, false>;
