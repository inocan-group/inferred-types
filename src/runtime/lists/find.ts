import {  Find , Narrowable, Tuple } from "src/types/index";
import {  isContainer } from "src/runtime/index";

/**
 * **Finder**
 * 
 * A configured utility designed to find elements in a list.
 */
export type Finder<
  TList extends Tuple,
  TDeref extends string | number | null
> = <TExtends extends Narrowable>(value: TExtends) => Find<TList, TExtends, TDeref>;

/**
 * **find**(list, [deref]) => (value) => el | undefined
 * 
 * A higher order function that allows _finding_ an element in a list
 * while preserving any available type information.
 */
export const find = <
  TList extends Tuple,
  TDeref extends string | number | null = null
>(
  list: TList, 
  deref: TDeref = null as TDeref 
): Finder<TList, TDeref> => <
  TExtends extends Narrowable
>(value: TExtends): Find<TList, TExtends, TDeref> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return list.find((i: any) => {
    const comparator = deref 
      ? isContainer(i) 
        ? deref in i ? i[deref] : undefined
        : i
      : i;
    return comparator === value;
  }) as Find<TList, TExtends, TDeref>;
};
