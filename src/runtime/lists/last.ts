import { Last, Tuple } from "src/types";

export const last = <T extends Tuple>(list: T): Last<T> => {
  return [...list].pop() as Last<T>;
};
