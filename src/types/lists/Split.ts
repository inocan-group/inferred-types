/**
 * **Split**`<T, SEP>`
 *
 * Splits a string literal `T` by string literal _separator_ `SEP`. The result is an array
 * of string literals.
 */
export type Split<
  T extends string,
  SEP extends string,
  ANSWER extends string[] = []
> = string extends T
  ? // wide string so we can only return wide string[]
    string[]
  : T extends SEP
  ? // the string === separator results in empty array
    ANSWER
  : // test whether can recurse
  T extends `${infer HEAD}${SEP}${infer TAIL}`
  ? // recurse to produce strong literal type
    Split<TAIL, SEP, [...ANSWER, HEAD]>
  : [...ANSWER, T];
