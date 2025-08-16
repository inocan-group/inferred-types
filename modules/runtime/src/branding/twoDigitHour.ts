import type { TwoDigitHour } from "types/datetime";

export function twoDigitHour<T extends TwoDigitHour<"strong">>(hour: T): TwoDigitHour<T> {
    return hour as TwoDigitHour<T>;
}
