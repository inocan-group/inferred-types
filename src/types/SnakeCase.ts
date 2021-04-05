/* eslint @typescript-eslint/no-unused-vars: "off" */

import { Uncapitalize, DashToSnake } from "./index";

type Dash = "-";

/**
 * Converts a string literal type to _kebab-case_
 */
// @ts-ignore
export type SnakeCase<S, T extends string = ""> = S extends `${infer HEAD}${Dash}${infer TAIL}`
  ? DashToSnake<S>
  : S extends `${infer First}${infer Rest}`
  ? First extends Uncapitalize<First>
    ? SnakeCase<Rest, `${T}${First}`>
    : T extends ""
    ? SnakeCase<Rest, `${Uncapitalize<First>}`>
    : SnakeCase<Rest, `${T}_${Uncapitalize<First>}`>
  : T;
