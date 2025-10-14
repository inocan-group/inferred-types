import type { AssertionOp } from "types/assertions/AssertionOp";
import type { WithoutKeys } from "types/dictionary";

type Invalid = `invalid-test/${"any-type" | "never-type"}`;
type Failed = `failed/${AssertionOp}`;

/**
 * **TypeError**
 *
 * An error resulting from a type assertion.
 *
 * **Related:** `AssertEquals`, `AssertExtends`, `AssertTrue`, `AssertFalse`
 */
export type AssertionError<
    TType extends Invalid | Failed = Invalid | Failed,
    TMsg extends string = string,
    TContext extends { test: unknown; expected: unknown; [key: string]: unknown } = { test: unknown; expected: unknown; [key: string]: unknown }
> = {
    kind: "AssertionError";
    classification: TType;
    message: TMsg;
    testType: TContext["test"];
    expectedType: TContext["expected"];
    ctx: WithoutKeys<TContext, "test" | "expected">;
};
