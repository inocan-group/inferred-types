import type { FourDigitYear } from "inferred-types/types";

export function fourDigitYear<T extends FourDigitYear<"strong">>(year: T): FourDigitYear<T> {
    return year as FourDigitYear<T>;
}
