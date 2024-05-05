import { IfUnion } from "../boolean-logic/branching/IfUnion";
import { LastInUnion } from "./UnionToTuple";

  /**
   * **ShiftUnion**`<U>`
   * 
   * Takes a type `U` and returns a tuple of the form:
   * ```ts
   * [shifted, remaining]
   * ```
   * 
   * Where `shifted` is the union segment which has been _removed_
   * and the `remaining` value is the value with that segment removed.
   * 
   * **Note:**
   * - you should not presume any explicit _ordering_ for removing elements
   * from the union
   * - when calling `ShiftUnion`<U>` where `U` is _not_ a union you will
   * get the tuple `[never, U]`
   */
  export type UnionShift<U, Last = LastInUnion<U>> = [U] extends [never]
  ? []
  : IfUnion<U, [Last, Exclude<U,Last>], U> extends readonly unknown[]
      ? IfUnion<U, [Last, Exclude<U,Last>], U>
      : [never, IfUnion<U, [Last, Exclude<U,Last>], U>];
