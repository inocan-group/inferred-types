import type { TwoDigitSecond } from "inferred-types/types";

export function twoDigitSecond<T extends TwoDigitSecond<"strong">>(Second: T): TwoDigitSecond<T> {
    return Second as TwoDigitSecond<T>;
}
