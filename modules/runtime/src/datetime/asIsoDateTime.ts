import type { DateLike } from "inferred-types/types";

export function asIsoDateTime<T extends DateLike>(dt: T): string {
    const d = asDate(dt);
    return d.toISOString(); // full ISO string with Z
}
