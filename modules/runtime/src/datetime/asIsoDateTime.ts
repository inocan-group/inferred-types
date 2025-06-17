import type { DateLike, IsoDateTime } from "inferred-types/types";
import { asDateTime } from "inferred-types/runtime";

export function asIsoDateTime<T extends DateLike>(dt: T): string {
    const d = asDateTime(dt);
    return d.toISOString() as IsoDateTime;
}
