/**
 * **OpHandler**
 * 
 * A union type that provides valid type to the _handler_ property
 * of a Rule Definition.
 * 
 * **Related:** `MatchDef`, `TransformDef`
 */
export type OpHandler = "throw" | "ignore" | "flatten" | "use-else";
