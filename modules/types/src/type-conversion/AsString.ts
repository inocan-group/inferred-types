import type { IsWideType } from "../boolean-logic";
import type { Join } from "../string-literals/Join";

/**
 * **AsString**<T>
 *
 * Attempts to narrow `T` to a string type where possible.
 *
 * - will convert any string, boolean, or numeric value
 * to a string value
 * - union types which include a variant which is `T` can be
 *
 * **Related:** `ToString`
 */
export type AsString<T> = T extends string
  ? T & string
  : T extends number
    ? `${T}`
    : T extends boolean
      ? `${T}`
      : string extends T
        ? string
        : T extends string[]
          ? IsWideType<T> extends true
            ? never
            : Join<T>
          : never;
