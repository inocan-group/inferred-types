import { Filter,  ComparatorOperation, Narrowable } from "src/types/index";
import { isSameTypeOf } from "../type-guards/higher-order/isSameTypeOf";
import {  startsWith } from "../type-guards";


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
        i => startsWith(Array.isArray(comparator) ? comparator : String(comparator))(String(i))
      );

      break;
  }

  return result as Filter<TList, TComparator, TOp>;
};
