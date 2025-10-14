/**
 * **TypeError**
 *
 * An error resulting from a type assertion.
 *
 * **Related:** `AssertEquals`, `AssertExtends`, `AssertTrue`, `AssertFalse`
 */
export type TypeError<
    TType extends string,
    TMsg extends string,
    TContext extends { test: unknown; expected: unknown; [key: string]: unknown }
> = {
    classification: TType;
    message: TMsg;
    testType: TContext["test"];
    expectedType: TContext["expected"];
};
