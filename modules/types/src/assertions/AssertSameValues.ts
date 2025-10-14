import { AssertValidation, Container, HasSameValues } from "inferred-types/types";


/**
 * **AssertSameValues**`<TTest>`
 *
 * Type test assertion that `TTest` is `false`.
 */
export type AssertSameValues<
    TTest extends Container,
    TExpected extends Container
> = AssertValidation<TTest, "hasSameValues", TExpected> extends Error
    ? AssertValidation<TTest, "hasSameValues", TExpected>
    : HasSameValues<TTest, TExpected>;
