import {
    err,
    isEpochInSeconds,
    parseIsoDate
} from "inferred-types/runtime";
import { DateMeta } from "inferred-types/types";

/**
 * Parses a number as a `epoch` timestamp (detects whether in
 * seconds or milliseconds) into a `IsoMeta` tuple.
 */
export function parseNumericDate<T extends number>(d: T): DateMeta | Error {
    try {
        const date = isEpochInSeconds(d)
            ? new Date(d*1000)
            : new Date(d);

        return parseIsoDate(date.toISOString());
    } catch {
        return err(
            `parse-date/numeric`,
            `The numeric value trying to be parsed as a epoch timestamp -- ${d} -- is invalid!`
        )
    }
}
