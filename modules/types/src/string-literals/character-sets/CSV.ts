import type { Digit } from "inferred-types/types";

/**
 * **CSV**
 *
 * A string literal type meant to enforce CSV data.
 *
 * - when used _without_ the provided generic it is a fairly loose type which only ensures that somewhere in the string is a comma
 * - the generic, however, allows you to state the minimum number of
 * commas you expect in your data.
 * - today we only provide a single _digit_ so 9 represents 9 commas
 * and 0 represents 10 (the max we'll check for).
 */
export type CSV<T extends Digit = 1> = T extends 1
  ? `${string},${string}`
  : T extends 2 ? `${string},${string},${string}`
    : T extends 3 ? `${string},${string},${string},${string}`
      : T extends 4 ? `${string},${string},${string},${string},${string}`
        : T extends 5 ? `${string},${string},${string},${string},${string},${string}`
          : T extends 6 ? `${string},${string},${string},${string},${string},${string},${string}`
            : T extends 7 ? `${string},${string},${string},${string},${string},${string},${string},${string}`
              : T extends 8 ? `${string},${string},${string},${string},${string},${string},${string},${string},${string}`
                : T extends 9 ? `${string},${string},${string},${string},${string},${string},${string},${string},${string},${string}`
                  : T extends 0 ? `${string},${string},${string},${string},${string},${string},${string},${string},${string},${string},${string}`
                    : never;
