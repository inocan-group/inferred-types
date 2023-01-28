import { AnyObject , ToKV, UnionToTuple } from "../../../types";
import { SetCandidate } from "./SetCandidate";

/**
 * **IntoSet**`<T>`
 * 
 * `T` is expected to _extend_ one of the following:
 * 
 * 1. `readonly Narrowable[]`
 * 2. a literal `AnyObject` (which will be converted to an iterable KV)
 * 3. a union type of values (which will be converted into a readonly array)
 * 
 * ```ts
 * // readonly ["foo", "bar", "baz"]
 * type T1 = IntoSet<"foo" | "bar" | "baz">;
 * type T2 = IntoSet<["foo", "bar", "baz"]>;
 * // readonly [ [k,v], [k,v] ]
 * type T3 = IntoSet<Obj>;
 * ```
 */
export type IntoSet<T extends SetCandidate> = T extends readonly any[]
  ? Readonly<T>
  : T extends AnyObject
      ? ToKV<T>
      : T extends string | number ? Readonly<UnionToTuple<T>> : never;
