import type { DateLike } from "inferred-types/types";
import { asDate } from "inferred-types/runtime";

export function asEpochTimestamp<T extends DateLike>(dt: T): number {
    const d = asDate(dt);
    return Math.floor(d.getTime() / 1000); // seconds
}
