import type { DateLike } from "inferred-types/types";
import { toDate } from "src/datetime/toDate";

export function asEpochTimestamp<T extends DateLike>(dt: T): number {
    const d = toDate(dt);
    return Math.floor(d.getTime() / 1000); // seconds
}
