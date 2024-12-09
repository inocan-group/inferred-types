import type { Dictionary } from "../base-types";

export type AsDictionary<T> = T extends Dictionary
  ? T
  : never;
