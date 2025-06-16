import type { DateLike, IsoDateTime } from "inferred-types/types";
import { asDate } from "inferred-types/runtime";

export function asIsoDateTime<T extends DateLike>(dt: T): string {
    const d = asDate(dt);
    return d.toISOString() as IsoDateTime;
}
