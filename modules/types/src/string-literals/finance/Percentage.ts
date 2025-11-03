/**
 * **Percentage**
 *
 * A type meant to represent the _shape_ of a percentage.
 *
 * - to keep the type complexity low we make no effort to
 *   force the type to be between 0 and 100%; in fact there
 *   are cases where this is not even desirable.
 *
 * **Related:**
 * - `IsPercentage<T>` validates that the numeric percentage
 *   fits withing expected bounds
 */
export type Percentage = `${number}%`;
