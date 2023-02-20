import { IfAnd, IfEqual, IsLiteral } from "src/types/boolean-logic";

type SplitAcc<
T extends string,
SEP extends string,
ANSWER extends string[] = []
> = T extends `${infer HEAD}${SEP}${infer TAIL}`
  ? SplitAcc<TAIL, SEP, [...ANSWER, HEAD]>
  : [...ANSWER, T];

/**
 * **Split**`<T, SEP>`
 *
 * Splits a string `T` by a separator `SEP`. 
 * 
 * The result is an array of string literals where `T` and `SEP` 
 * are string literals. Otherwise we resolve to just `string[]`.
 */
export type Split<
  T extends string,
  SEP extends string,
> = IfAnd<
  [ IsLiteral<T>, IsLiteral<SEP> ],
  IfEqual<T, SEP, [] & string[],SplitAcc<T,SEP>>,
  string[]
>;
