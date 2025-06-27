import type { Thenable } from "inferred-types/types";

/**
 * **Awaited**`<T>`
 *
 * Unwraps the expected return value inside a promise-like
 * result.
 */
export type Awaited<T> = T extends Promise<infer Type>
    ? Type
    : T extends PromiseLike<infer Type>
        ? Type
        : T extends Thenable
            ? ReturnType<T["then"]>
            : never;
