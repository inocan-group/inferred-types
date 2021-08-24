/**
 * Provides a unary condition for the type system:
 * ```ts
 * // "a"
 * type T = If<true, "a", "b'>;
 * // "b"
 * type F = If<false, "a", "b">;
 * ```
 */
export type If<C extends boolean, T, F> = C extends T ? C | F : never;
