import { Not } from "inferred-types/types";
import { Dictionary } from "types/base-types";
import { IsArray } from "types/boolean-logic/operators/IsArray";


export type IsDictionary<T> = T extends Dictionary
    ? Not<IsArray<T>>
    : false;
