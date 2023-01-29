import { Find , Narrowable } from "../../types";
import { indexOf } from "./indexOf";

/**
 * **Finder**
 * 
 * A configured utility designed to find elements in a list.
 */
export type Finder<
  TList extends readonly any[],
  TDeref extends string | number | null
> = <TExtends extends Narrowable>(value: TExtends) => Find<TList, TExtends, TDeref>;

/**
 * **find**(list, [deref]) => (value) => el | undefined
 * 
 * A higher order function that allows _finding_ an element in a list
 * while preserving any available type information.
 */
export const find = <
  TList extends readonly any[],
  TDeref extends string | number | null = null
>(
  list: TList, 
  deref: TDeref = null as TDeref 
): Finder<TList, TDeref> => <
  TExtends extends Narrowable
>(value: TExtends): Find<TList, TExtends, TDeref> => {
  return list.find(i => indexOf(i,deref) === value) as Find<TList, TExtends, TDeref>;
};
