import type { TupleToUnion } from "inferred-types/types";

/**
 * **RuntimeUnion**`<T>`
 *
 * Represents a _union type_ at runtime where the `ReturnType` is the
 * union type of the member in the `members` array.
 */
export interface RuntimeUnion<
    T extends readonly unknown[],
> {
    kind: "Union";
    members: T;
    type: TupleToUnion<T>;
    includes: (v: unknown) => boolean;
}
