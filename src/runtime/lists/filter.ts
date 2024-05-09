import { Filter,  ComparatorOperation, Narrowable } from "src/types/index";
import { isSameTypeOf } from "../type-guards/higher-order/isSameTypeOf";
import {  isString, startsWith } from "../type-guards";


export const filter = <
  TList extends readonly unknown[],
  TComparator extends Narrowable | readonly unknown[],
  TOp extends ComparatorOperation
>(
  list: TList, 
  comparator: TComparator,
  op: TOp = "extends" as TOp
) => {
  let result: unknown;

  switch(op) {
    case "equals":
      result = list.filter(i => i === comparator);
      break;
    case "extends":
      result = list.filter(i => isSameTypeOf(i)(comparator));
      break;
    case "startsWith":
      result =  list.filter(
        i => isString(i)
        ? startsWith(String(comparator))(String(i))
        : false
      );
      break;
  }

  return result as Filter<TList, TComparator, TOp>;
};
