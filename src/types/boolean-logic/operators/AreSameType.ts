import { Widen } from "../..";
import { IsEqual } from "./IsEqual";

/**
 * **AreSameType**`<A,B>`
 * 
 * Tests whether `A` and `B` are the same _wide_ type.
 * 
 * - Note: for containers, the types are rolled up to the broad category of
 * container (e.g., Dictionary, Tuple, Map, Set, WeakMap)
 * 
 * ```ts
 * // true
 * AreSameType<"foo","bar">;
 * // false
 * AreSameType<"foo",42>;
 * ```
 */
export type AreSameType<A,B> = [IsEqual<Widen<A, true>, Widen<B, true>>] extends [true]
? true
: false;
