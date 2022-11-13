import { IfStringLiteral } from "src/types/type-checks";

/**
 * **StartsWith**
 *
 * A type utility which returns true/false based on whether a passed in
 * `T` is both a _string literal_ and that it starts with the string literal
 * defined by `U`.
 */
export type StartsWith<T extends unknown, U extends unknown> = IfStringLiteral<
  T,
  IfStringLiteral<U, true, false>,
  false
>;

// IsStringLiteral<T> extends true
//   ? IsStringLiteral<U> extends true
//     ? `${U}${string}`
//       ? true
//       : false
//     : false
//   : false;
