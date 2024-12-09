import type { As } from "../narrowing/As";

/**
 * **IsNever**`<T>`
 *
 * Boolean type utility which check whether `T` is of type _never_.
 */
export type IsNever<T> = As<[T] extends [never] ? true : false, boolean>;
