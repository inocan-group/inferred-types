import { ToNumericArray, Tuple } from "src/types/index";

export const toNumericArray = <T extends Tuple>(arr: T) => {
  return arr.map(i => Number(i)) as ToNumericArray<T>;
};
