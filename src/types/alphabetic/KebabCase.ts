import type { Dasherize } from "~/types/alphabetic";

/**
 * **KebabCase<T>** is an _alias_ for **Dasherize<T>**.
 * ```ts
 * // "foo-bar"
 * type Kebab = KebabCase<"foo_bar">;
 * type Kebab = KebabCase<"fooBar">;
 * type Kebab = KebabCase<"FooBar">;
 * // "\n  foo-bar \t"
 * type Kebab = KebabCase<"\n  foo bar \t">;
 * ``` */
export type KebabCase<T extends string> = Dasherize<T>;
