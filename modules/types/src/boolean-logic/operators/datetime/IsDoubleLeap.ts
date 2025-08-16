import type { Unbrand } from "inferred-types/types";
import type { AsDateMeta, AsFourDigitYear, DateMeta, FourDigitYear, IsoModernDoubleLeap } from "types/datetime";

export type IsDoubleLeap<T> = T extends object
    ? boolean
    : T extends string
        ? string extends T
            ? boolean
            : AsDateMeta<T> extends DateMeta
                ? AsDateMeta<T>["year"] extends FourDigitYear<"branded">
                    ? Unbrand<AsDateMeta<T>["year"]> extends IsoModernDoubleLeap
                        ? true
                        : false
                    : false
                : false
        : T extends number
            ? number extends T
                ? boolean
                : AsFourDigitYear<T> extends Error
                    ? false
                    : AsFourDigitYear<T> extends IsoModernDoubleLeap
                        ? true
                        : false
            : false;
