import { Whitespace } from "@inferred-types/types";

type Process<
S extends string
> = string extends S
? string
: S extends `${Whitespace}${infer Right}`
? Process<Right>
: S extends `${infer Left}${Whitespace}`
? Process<Left>
: S;


/**
 * Trims off blank spaces, `\n` and `\t` characters from both sides of a _string literal_.
 * ```ts
 * // "foobar"
 * type T = Trim<"\n\t  foobar ">;
 * // string
 * type T = Trim<string>;
 * ```
 */
export type Trim<
  S extends string
> = Process<S> extends string
? Process<S>
: never;

