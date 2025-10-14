import { AssertValidation, Extends } from "inferred-types/types";

/**
 * **AssertExtends**`<TTest, TBase>`
 *
 * Type test assertion that `TTest` _extends_ the type of `TBase`.
 */
export type AssertExtends<
    TTest,
    TBase
> = AssertValidation<TTest, "extends", TBase> extends Error
    ? AssertValidation<TTest, "extends", TBase>
    : Extends<TTest, TBase>;
