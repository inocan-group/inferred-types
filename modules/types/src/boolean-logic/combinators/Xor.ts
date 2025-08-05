import type { IsWideBoolean } from "inferred-types/types";

/**
 * **Xor**`<A,B>`
 *
 * - true when one (but not both) of `A` and `B` are true
 * - otherwise false
 */
export type Xor<A extends boolean, B extends boolean>
  = IsWideBoolean<A> extends true ? boolean
      : IsWideBoolean<B> extends true ? boolean
          : A extends true
              ? (B extends false ? true : false)
              : (A extends false
                  ? (B extends true ? true : false)
                  : false);
