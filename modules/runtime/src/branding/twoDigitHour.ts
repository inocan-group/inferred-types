import type { TwoDigitHour } from "inferred-types/types";

export function twoDigitHour<T extends TwoDigitHour<"strong">>(hour: T): TwoDigitHour<T> {
    return hour as TwoDigitHour<T>;
}
