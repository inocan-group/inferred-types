/* eslint @typescript-eslint/no-unused-vars: "off" */

import type { DashUppercase, LowerAllCaps, Trim } from "~/types";

/** convert space to dash */
type SpaceToDash<T extends string> = T extends `${infer Begin}${" "}${infer Rest}`
  ? SpaceToDash<`${Begin}-${Rest}`>
  : T;

/**
 * Converts a string literal type to _snake_case_.
 * ```ts
 * // "foo_bar"
 * type T = SnakeCase<"fooBar">;
 * type T = SnakeCase<"FooBar">;
 * type T = SnakeCase<"foo-bar">;
 * type T = SnakeCase<"\n foo bar \t">;
 * ``` */
export type SnakeCase<S extends string> = string extends S ? string :
  DashUppercase<Uncapitalize<SpaceToDash<Trim<LowerAllCaps<S>>>>> extends `${infer Begin}${"-"}${infer Rest}`
  ? SnakeCase<`${Lowercase<Begin>}_${Rest}`>
  : Lowercase<DashUppercase<Uncapitalize<Trim<LowerAllCaps<S>>>>>;
