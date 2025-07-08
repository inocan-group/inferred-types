import type { Dictionary } from "inferred-types/types";

export type AsDictionary<T> = T extends Dictionary
    ? T
    : never;
