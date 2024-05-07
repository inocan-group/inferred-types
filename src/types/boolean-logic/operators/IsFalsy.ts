import { IfExtendsSome } from "src/types/index";

/**
 * **IsFalsy**`<T>`
 * 
 * Boolean operator which tests whether `T` is _falsy_.
 */
export type IsFalsy<T> = IfExtendsSome<
  T, ["", false, null, undefined, 0, -0, typeof Number.NaN],
  true,
  false
>;

