import { isEpochInSeconds, IsoMeta, parseIsoDate } from "inferred-types/runtime";

/**
 * Parses a number as a `epoch` timestamp (detects whether in
 * seconds or milliseconds) into a `IsoMeta` tuple.
 */
export function parseNumericDate<T extends number>(d: T): IsoMeta {
    const date = isEpochInSeconds(d)
        ? new Date(d*1000)
        : new Date(d);

    return parseIsoDate(date.toISOString()) as IsoMeta
}
