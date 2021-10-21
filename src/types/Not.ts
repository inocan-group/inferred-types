/**
 * Provides a negation of a type of the type `T` _not_ `U`.
 * ```ts
 * const foo = 42;
 * // 33
 * type NotTheMeaningOfLife = Not<33, 42>;
 * // never
 * type NotTheMeaningOfLife = Not<42, 42>;
 * ```
 * 
 * Note: same as `Exclude`
 */
export type Not<T, U> = T extends U ? never : T;
