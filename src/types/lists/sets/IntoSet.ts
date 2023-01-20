import { IfReadonlyArray } from "src/types/boolean-logic";
import { Narrowable } from "src/types/Narrowable";
import { Mutable, UnionToTuple } from "src/types/type-conversion";
import { SetCandidate } from "./SetCandidate";

/**
 * **IntoSet**`<T>`
 * 
 * Receives a type that extends `SetCandidate` and turns it into a "set"; where
 * a set means it is a readonly array of _narrowable_ values.
 * 
 * ```ts
 * // readonly ["foo", "bar", "baz"]
 * type T1 = UniqueSet<"foo" | "bar" | "baz">;
 * type T2 = UniqueSet<["foo", "bar", "baz"]>;
 * ```
 */
export type IntoSet<T extends SetCandidate> = IfReadonlyArray<
  T, 
  T extends readonly Narrowable[] ? readonly [...T] : never, 
  readonly [...UnionToTuple<Mutable<T>>]
>;
