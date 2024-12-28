import type { Scalar } from "src/base-types";

export type Branded<T extends Scalar, B extends string> = T & {
  __brand: B;
};
