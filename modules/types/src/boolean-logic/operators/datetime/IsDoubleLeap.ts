import type { IsLeapYear } from "types/boolean-logic/operators/datetime/IsLeapYear";
import type { AsDateMeta, DateMeta, FourDigitYear, IsoDate30, IsoModernDoubleLeap } from "types/datetime";

export type IsDoubleLeap<T> = T extends object
    ? boolean
    : T extends string
        ? string extends T
            ? boolean
            : AsDateMeta<T> extends DateMeta
                ? AsDateMeta<T>["year"] extends FourDigitYear<"branded">
                    ? IsLeapYear<AsDateMeta<T>["year"]> extends true
                        ? AsDateMeta<T>["year"] extends IsoModernDoubleLeap
                            ? AsDateMeta<T>["year"] extends IsoDate30
                                ? true
                                : false
                            : AsDateMeta<T>["year"] extends Exclude<IsoDate30, "30">
                                ? true
                                : false
                        : AsDateMeta<T>["year"] extends Exclude<IsoDate30, "30" | "29">
                            ? true
                            : false
                    : false
                : false
        : false;
