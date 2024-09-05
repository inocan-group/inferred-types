import { IsUnion } from "src/types/index";

type ElementOf<T> = T extends (infer U)[] ? U : never;

/**
 * **IsUnionArray**`<T>`
 *
 * Boolean operator which tests whether `T` is an array of
 * a _union type_.
 */
export type IsUnionArray<T> = T extends any[]
  ? IsUnion<ElementOf<T>>
  : false;
