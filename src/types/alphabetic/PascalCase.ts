/* eslint @typescript-eslint/no-unused-vars: "off" */
import type { LowerAllCaps, Trim } from "~/types";

type Delimiter = "_" | "-" | " ";

/** convert all delimiters to dashes */
type DashDelim<T extends string> = T extends `${infer Begin}${" "}${infer Rest}`
  ? DashDelim<`${Begin}-${Rest}`>
  : T extends `${infer Begin}${"_"}${infer Rest}`
  ? DashDelim<`${Begin}-${Rest}`>
  : T;

/**
 * Converts a string literal type to a **PascalCase** representation.
 * ```ts
 * // "FooBar"
 * type T = PascalCase<"fooBar">;
 * type T = PascalCase<"foo-bar">;
 * type T = PascalCase<"foo_bar">;
 * type T = PascalCase<"\n foo_bar \t">;
 * ```
 */
export type PascalCase<S extends string> = string extends S
  ? string
  : Trim<DashDelim<LowerAllCaps<S>>> extends `${infer Begin}${Delimiter}${infer Rest}`
  ? PascalCase<`${Capitalize<Begin>}${Capitalize<Rest>}`>
  : Capitalize<Trim<LowerAllCaps<S>>>;
