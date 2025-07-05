import { DateType } from "@inferred-types/types";
import { DateMeta } from "types/datetime";

/**
 * converts the parsed components of a `DateMeta` dictionary
 * to the representative ISO String.
 */
function convert<
    T extends Omit<
        DateMeta,
        | "toString"
        | "asYear" | "asYearIndependent" | "asYearMonth"
        | "asDate" | "asDateTime"
    > & { format: "auto" | DateType }
>(
    meta: T
) {
    let {
        format,
        dateType, hasTime,
        year, month, date,
        hour, minute, second, ms,
        timezone
    } = meta;

    if (format === "auto") {
        format = dateType;
    }

    switch (format) {
        case "date":
            return () => `${year}-${month}-${date}`;
        case "datetime":
            let base: string;
            if (hasTime) {
                base = `${year}-${month}-${date}T${hour}:${minute}`;
                if (second) {
                    base = `${base}:${second}`;
                    if (ms) {
                        base = `${base}.${ms}`;
                    }
                }
                if (timezone) {
                    base = `${base}${timezone}`
                }
                return () => base;
            } else {
                return () => `${year}-${month}-${date}`;
            }
        case "year":
            return () => `${year}`;
        case "year-independent":
            return () => `--${month}-${date}`;
        case "year-month":
            return () => `-${year}-${month}`;
    }
}


export function toString<
    T extends Omit<
        DateMeta,
        | "toString"
        | "asYear" | "asYearIndependent" | "asYearMonth"
        | "asDate" | "asDateTime"
    >
>(meta: T) {
    return convert({ format: "auto", ...meta })
}

export function asYear<
    T extends Omit<
        DateMeta,
        | "toString"
        | "asYear" | "asYearIndependent" | "asYearMonth"
        | "asDate" | "asDateTime"
    >
>(meta: T) {
    return convert({ format: "year", ...meta })
}

export function asYearIndependent<
    T extends Omit<
        DateMeta,
        | "toString"
        | "asYear" | "asYearIndependent" | "asYearMonth"
        | "asDate" | "asDateTime"
    >
>(meta: T) {
    return convert({ format: "year-independent", ...meta })
}

export function asYearMonth<
    T extends Omit<
        DateMeta,
        | "toString"
        | "asYear" | "asYearIndependent" | "asYearMonth"
        | "asDate" | "asDateTime"
    >
>(meta: T) {
    return convert({ format: "year-month", ...meta })
}

export function asDate<
    T extends Omit<
        DateMeta,
        | "toString"
        | "asYear" | "asYearIndependent" | "asYearMonth"
        | "asDate" | "asDateTime"
    >
>(meta: T) {
    return convert({ format: "date", ...meta })
}

export function asDateTime<
    T extends Omit<
        DateMeta,
        | "toString"
        | "asYear" | "asYearIndependent" | "asYearMonth"
        | "asDate" | "asDateTime"
    >
>(meta: T) {
    return convert({ format: "datetime", ...meta })
}


