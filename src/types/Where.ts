import { Include } from "./Include";
/**
 * Allows filtering down `T` to those which extend a given type `U`.
 *
 * - `T` is either a dictionary (where keys will be used to compare) or
 * a readonly sting array.
 * ```ts
 * const arr = ["foo", "bar", "baz"];
 * // "bar" | "baz"
 * type BA = Where<typeof arr, `ba${string}`>;
 * ```
 */
export type Where<
  T extends Record<string, any> | readonly string[],
  U
> = T extends readonly string[]
  ? Include<T[number], U>
  : {
      [K in keyof T]: K extends U ? K : never;
    }[keyof T];

/**
 * Allows filtering down `T` to those which extend a given type `U`.
 *
 * - `T` is either a dictionary (where keys will be used to compare) or
 * a readonly sting array.
 * ```ts
 * const arr = ["foo", "bar", "baz"];
 * // "foo"
 * type F = WhereNot<typeof arr, `ba${string}`>;
 * ```
 */
export type WhereNot<
  T extends Record<string, any> | readonly string[],
  U
> = T extends readonly string[]
  ? Exclude<T[number], U>
  : {
      [K in keyof T]: K extends U ? never : K;
    }[keyof T];
