import { IfExtendsSome } from "./Extends";

export type IsFalsy<T> = IfExtendsSome<
  T, ["", false, null, undefined, 0, -0, typeof Number.NaN],
  true,
  false
>

