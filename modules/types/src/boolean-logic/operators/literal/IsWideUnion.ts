import { IsUnion } from "inferred-types/types";


export type IsWideUnion<T> = IsUnion<T> extends true
? // TODO
: false;
