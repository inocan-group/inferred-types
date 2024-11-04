import { Dictionary } from "../base-types";

export type AsDictionary<T> = T extends Dictionary
  ? T
  : never;
