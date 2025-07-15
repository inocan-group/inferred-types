import { log } from "node:console";
import { parseIsoDate } from "runtime/datetime";
import { err } from "runtime/errors";
import {
    isEpochInSeconds,
} from "runtime/type-guards/datetime";

/**
 * Parses a number as a `epoch` timestamp (detects whether in
 * seconds or milliseconds) into a `IsoMeta` tuple.
 */
export function parseNumericDate<T extends number>(d: T) {
    try {
        const date = isEpochInSeconds(d)
            ? new Date(d * 1000)
            : new Date(d);

        return parseIsoDate(date.toISOString());
    }
    catch {
        return err(
            `parse-date/numeric`,
            `The numeric value trying to be parsed as a epoch timestamp -- ${d} -- is invalid!`
        );
    }
}
