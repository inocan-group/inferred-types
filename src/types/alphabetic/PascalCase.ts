/* eslint @typescript-eslint/no-unused-vars: "off" */
import { CamelCase, Capitalize } from "~/types/alphabetic";

type Delimiter = "_" | "-";

/** Converts a string literal type to a **PascalCase** representation */
// @ts-ignore
export type PascalCase<S extends string> = S extends `${infer B}${Delimiter}${infer A}${infer R}`
  ? `${Capitalize<B>}${Capitalize<A>}${CamelCase<R>}`
  : Lowercase<S>;
