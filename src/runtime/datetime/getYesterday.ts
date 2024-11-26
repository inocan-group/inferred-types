import { Iso8601Date } from "inferred-types/types";

/**
 * Returns a
 * [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date string
 * for yesterday..
*/
export const getYesterday = (): Iso8601Date<"explicit"> => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split("T")[0] as Iso8601Date<"explicit">;
};
