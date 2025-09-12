import type { Not, Dictionary, IsArray } from "inferred-types/types";

export type IsDictionary<T> = T extends Dictionary
    ? Not<IsArray<T>>
    : false;
