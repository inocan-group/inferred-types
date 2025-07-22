import type { IsBooleanExactly } from "inferred-types/types";

/**
 * **Xor**`<A,B>`
 *
 * - true when one (but not both) of `A` and `B` are true
 * - otherwise false
 */
export type Xor<A extends boolean, B extends boolean>
  = IsBooleanExactly<A> extends true ? boolean
      : IsBooleanExactly<B> extends true ? boolean
          : A extends true
              ? (B extends false ? true : false)
              : (A extends false
                  ? (B extends true ? true : false)
                  : false);
