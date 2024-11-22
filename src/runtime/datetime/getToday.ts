import { Iso8601Date } from "src/types/index";

/**
 * Returns the current date as an
 * [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date string.
*/
export const getToday = (): Iso8601Date<"explicit"> => {
  const today = new Date();
  return today.toISOString().split("T")[0] as Iso8601Date<"explicit">;
};
