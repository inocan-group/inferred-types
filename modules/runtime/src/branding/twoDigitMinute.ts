import type { TwoDigitMinute } from "inferred-types/types";

export function twoDigitMinute<T extends TwoDigitMinute<"strong">>(Minute: T): TwoDigitMinute<T> {
    return Minute as TwoDigitMinute<T>;
}
