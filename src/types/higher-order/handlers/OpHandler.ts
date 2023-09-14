/**
 * **OpHandler**
 * 
 * A union type that provides valid type to the _handler_ property
 * of a Rule Definition:
 * 
 * - **throw** _will convert failures to an `ErrorCondition`_
 * - **ignore** _will convert failures to a `ShouldIgnore<T>` when evaluated_
 * - **flatten** _will convert successful arrays to a `ShouldFlatten<T>`; error are
 * converted to `ErrorCondition`_
 * - **use-else** _will convert failures to the `ELSE` type provided as parameter to 
 * the operation_
 * 
 * **Related:** `MatchDef`, `TransformDef`
 */
export type OpHandler = "throw" | "ignore" | "flatten" | "use-else";
