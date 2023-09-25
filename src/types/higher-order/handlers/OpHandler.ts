/**
 * **OpHandler**
 * 
 * A union type that provides valid type to the _handler_ property
 * of a Rule Definition:
 *
 * Error Handling: 
 * - **throw** _will convert failures to an `ErrorCondition`_
 * - **ignore** _will convert failures to a `ShouldIgnore<T>` when evaluated_
 * - **use-else** _will convert failures to the `ELSE` type provided as parameter to 
 * the operation_
 * 
 * Success Handling:
 * - **flatten** _will convert successful operations to a `ShouldFlatten<T>`; errors are
 * converted to `ErrorCondition`_
 * 
 * **Related:** `MatchDef`, `TransformDef`
 */
export type OpHandler = "throw" | "ignore" | "flatten" | "use-else";
