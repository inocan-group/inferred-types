/**
 * Takes a fluent API and converts into an _explicit_ format.
 * An API might look something like:
 *
 * ```ts
 * {
 *    increment: ExplicitFluent<[],
 * }
 * ```
 */
// export function ExplicitFluent<
//   F extends { [K in F]: (...args: any[]) => F & E } & E,
//   E extends object = never
// >(fluent: F, escape?: E) {
//   //
// }
