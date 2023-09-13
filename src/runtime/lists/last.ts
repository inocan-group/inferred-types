import { Last, Tuple } from "../../types/base";

export const last = <T extends Tuple>(list: T): Last<T> => {
  return [...list].pop() as Last<T>;
};
