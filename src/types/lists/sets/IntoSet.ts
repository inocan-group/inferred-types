import { 
  AnyObject , 
  ToKV, 
  UnionToTuple } 
from "src/types";
import { IfUnion } from "src/types/boolean-logic";

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
export type IntoSet<T> = T extends readonly unknown[]
  ? readonly [...T]
  : IfUnion<
    T, 
    Readonly<UnionToTuple<T>>, 
    T extends AnyObject
      ? ToKV<T>
      : never
  >;
