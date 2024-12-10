import type { Iso8601Date } from "inferred-types/types";

/**
 * Returns a
 * [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date string
 * for tomorrow.
 */
export function getTomorrow(): Iso8601Date<"explicit"> {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0] as Iso8601Date<"explicit">;
}
