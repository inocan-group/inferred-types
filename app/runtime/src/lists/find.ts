import {
  Find ,
  FromDefn,
  Narrowable,
  ShapeCallback,
  Tuple
} from "src/types/index";
import { isContainer } from "src/runtime/index";


/**
 * **Finder**
 *
 * A configured utility designed to find elements in a list.
 */
export type Finder<
  TList extends Tuple,
  TDeref extends string | number | null
> = <TExtends extends Narrowable | ShapeCallback>(value: TExtends) => Find<
  TList,
  "equals",
  FromDefn<TExtends>,
  TDeref
>;

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
  TExtends extends Narrowable | ShapeCallback
>(comparator: TExtends): Find<TList, "equals", FromDefn<TExtends>, TDeref> => {

  return list.find((i: any) => {
    const val = deref
      ? isContainer(i)
        ? deref in i ? i[deref] : undefined
        : i
      : i;
    return val === comparator;
  }) as unknown as Find<TList, "equals", FromDefn<TExtends>, TDeref>;
};

