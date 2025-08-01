import type { Not } from "inferred-types/types";
import type { Dictionary } from "types/base-types";
import type { IsArray } from "types/boolean-logic/operators/containers/IsArray";

export type IsDictionary<T> = T extends Dictionary
    ? Not<IsArray<T>>
    : false;
