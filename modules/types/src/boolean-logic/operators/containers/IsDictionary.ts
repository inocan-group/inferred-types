import type { Not } from "inferred-types/types";
import type { Dictionary } from "inferred-types/types";
import type { IsArray } from "inferred-types/types";

export type IsDictionary<T> = T extends Dictionary
    ? Not<IsArray<T>>
    : false;
