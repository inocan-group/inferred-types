import type { DateLike } from "inferred-types/types";
import { asDate } from "inferred-types/runtime";

export function asIsoDateTime<T extends DateLike>(dt: T): string {
    const d = asDate(dt);
    return d.toISOString() as IsoDateTime; // full ISO string with Z
}
