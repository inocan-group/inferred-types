import { IsUnion } from "inferred-types/types";


export type IsMixedUnion<T> = IsUnion<T> extends true
? // TODO
: false;
