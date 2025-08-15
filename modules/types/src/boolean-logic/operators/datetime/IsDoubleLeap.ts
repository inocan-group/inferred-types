import type { AsDateMeta, DateMeta, FourDigitYear, IsoModernDoubleLeap } from "types/datetime";

export type IsDoubleLeap<T> = T extends object
    ? boolean
    : T extends string
        ? string extends T
            ? boolean
            : AsDateMeta<T> extends DateMeta
                ? AsDateMeta<T>["year"] extends FourDigitYear<"branded">
                    ? AsDateMeta<T>["year"] extends IsoModernDoubleLeap
                        ? true
                        : false
                    : false
                : false
        : false;
