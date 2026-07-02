import type { Unbrand } from "inferred-types/types";
import type { IsoModernDoubleLeap } from "types/datetime";

type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

type ExtractYear<T> = Unbrand<T> extends `${infer A extends Digit}${infer B extends Digit}${infer C extends Digit}${infer D extends Digit}${string}`
    ? `${A}${B}${C}${D}`
    : never;

export type IsDoubleLeap<T> = T extends object
    ? boolean
    : T extends string
        ? string extends T
            ? boolean
            : [ExtractYear<T>] extends [never]
                ? false
                : ExtractYear<T> extends IsoModernDoubleLeap
                    ? true
                    : false
        : T extends number
            ? number extends T
                ? boolean
                : [ExtractYear<`${T}`>] extends [never]
                    ? false
                    : ExtractYear<`${T}`> extends IsoModernDoubleLeap
                        ? true
                        : false
            : false;
