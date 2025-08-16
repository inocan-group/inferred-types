import type { ThreeDigitMillisecond } from "inferred-types/types";

export function threeDigitMillisecond<T extends ThreeDigitMillisecond<"strong">>(Millisecond: T): ThreeDigitMillisecond<T> {
    return Millisecond as ThreeDigitMillisecond<T>;
}
