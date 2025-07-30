import { IsAny,  IsNever } from "inferred-types/types";

export type IsLiteralScalar<T> = [IsAny<T>] extends [true]
? false
: [IsNever<T>] extends [true]
? false
: string extends T
    ? false
: number extends T
    ? false
: bigint extends T
    ? false
: boolean extends T
    ? false
: symbol extends T
    ? false
: T extends string | number | bigint | boolean | symbol | null | undefined
    ? true
: false;
