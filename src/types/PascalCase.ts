/* eslint @typescript-eslint/no-unused-vars: "off" */
import { CamelCase } from "./CamelCase";
import { Capitalize } from "./Intrinsic";

type Delimiter = "_" | "-";

/** Converts a string literal type to a **PascalCase** representation */
// @ts-ignore
export type PascalCase<T extends string> = T extends `${infer Head}${Delimiter}${infer Tail}`
  ? Capitalize<CamelCase<T>>
  : Capitalize<T>;
