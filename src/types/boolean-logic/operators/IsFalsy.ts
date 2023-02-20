import { IfExtendsSome } from "src/types/boolean-logic";

export type IsFalsy<T> = IfExtendsSome<
  T, ["", false, null, undefined, 0, -0, typeof Number.NaN],
  true,
  false
>;

