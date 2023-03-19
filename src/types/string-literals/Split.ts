import {  And, IfEquals, IfStringLiteral, IsEqual } from "src/types/boolean-logic";
import { Tuple } from "../base-types";
import { Last, Pop } from "../lists";
import { BeforeLast } from "../lists/BeforeLast";

type SplitAcc<
T extends string,
SEP extends string,
ANSWER extends string[] = []
> = T extends `${infer HEAD}${SEP}${infer TAIL}`
  ? SplitAcc<TAIL, SEP, [...ANSWER, HEAD]>
  : [...ANSWER, T];

type Cleanup<
  TSep extends string,
  TList extends Tuple<string>
> = And<
  [
    IsEqual<Last<TList>, "">,
    IsEqual<TSep, "">
  ]> extends true 
    ? Pop<TList>
    : TList;


/**
 * **Split**`<T, [SEP]>`
 *
 * Splits a string `T` by a separator `SEP`. 
 * 
 * - the result is an array of string literals when `T` and `SEP` 
 * are string literals.
 * - if `T` or `SEP` are wide string then the resultant type is just `string[]`
 * - if no `SEP` is provided then an empty string literal is used which has the
 * effect of converting the string into an array of characters.
 */
export type Split<
  T extends string,
  SEP extends string = "",
> = IfStringLiteral<
  T,
  IfStringLiteral<
    SEP,
    Cleanup<SEP, SplitAcc<T,SEP>>,
    string[]
  >,
  string[]
>;


