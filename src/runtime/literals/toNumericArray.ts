import { ToNumericArray, Tuple } from "../../types/base";

export const toNumericArray = <T extends Tuple>(arr: T) => {
  return arr.map(i => Number(i)) as ToNumericArray<T>;
};
