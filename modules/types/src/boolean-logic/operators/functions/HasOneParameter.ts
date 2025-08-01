import { As, IsFunction, TypedFunction } from "inferred-types/types";


export type HasOneParameter<T> = IsFunction<T> extends true
? Parameters<As<T, TypedFunction>>
: false;
