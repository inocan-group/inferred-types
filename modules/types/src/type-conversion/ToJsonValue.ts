import type {
  As,
  Join,
  ToStringArray,
  Tuple,
} from "inferred-types/types";

type AsJsonArray<T extends Tuple> = Join<
  [
    "[ ",
    ...ToStringArray<T>,
    " ]",
  ]
>;

/**
 * **ToJsonValue**`<T>`
 *
 * Converts the value in `T` to a form appropriate for a
 * JSON value.
 *
 * Note: all outputs are a _string_ but:
 *
 * - string are placed in double quotes
 * - tuples are processed recursively
 */
export type ToJsonValue<T> = T extends string
  ? `"${T}"`
  : T extends number
    ? `${T}`
    : T extends boolean
      ? `${T}`
      : T extends undefined
        ? "undefined"
        : T extends null
          ? "null"
          : T extends Tuple
            ? AsJsonArray<
              As<{ [K in keyof T]: ToJsonValue<T[K]> }, string>
            >
            : never;
