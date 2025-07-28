import { IsAny, IsBooleanLiteral, IsNever } from "inferred-types/types";
import { Scalar } from "types/base-types";

export type IsLiteralScalar<T> = [IsAny<T>] extends [true]
? false
: [IsNever<T>] extends [true]
? false
: [T] extends [Scalar]
    ? [string] extends [T]
        ? false
    : [number] extends [T]
        ? false
    : [IsBooleanLiteral<T>] extends [true]
        ? false
    : true
: false;
