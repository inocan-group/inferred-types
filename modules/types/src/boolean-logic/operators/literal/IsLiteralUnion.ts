import { IsUnion } from "inferred-types/types";


export type IsLiteralUnion<T> = IsUnion<T> extends true
? // TODO
: false;
