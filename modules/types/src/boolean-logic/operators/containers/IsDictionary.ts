import type { Dictionary, IsArray, Not } from "inferred-types/types";

export type IsDictionary<T> = T extends Dictionary
    ? Not<IsArray<T>>
    : false;
