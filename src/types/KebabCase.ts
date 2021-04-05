/* eslint @typescript-eslint/no-unused-vars: "off" */
import { Uncapitalize, SnakeToDash } from "./index";

type Snake = "_";

/**
 * Converts a string literal type to _kebab-case_
 */
// @ts-ignore
export type KebabCase<S, T extends string = ""> = S extends `${infer HEAD}${Snake}${infer TAIL}`
  ? SnakeToDash<S>
  : S extends `${infer First}${infer Rest}`
  ? First extends Uncapitalize<First>
    ? KebabCase<Rest, `${T}${First}`>
    : T extends ""
    ? KebabCase<Rest, `${Uncapitalize<First>}`>
    : KebabCase<Rest, `${T}-${Uncapitalize<First>}`>
  : T;
