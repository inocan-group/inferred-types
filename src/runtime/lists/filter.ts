import { Filter,  FilterOps, Narrowable } from "../../types";
import { isSameTypeOf } from "../type-guards";

export const filter = <
  TList extends readonly any[],
  TOp extends FilterOps,
  TFilter extends Narrowable
>(
  list: TList, 
  op: TOp, 
  value: TFilter
) => {
  let result: any;

  switch(op) {
    case "not-equal":
      result = list.filter(i => i !== value);
      break;
    case "equals":
      result = list.filter(i => i === value);
      break;
    case "extends":
      result = list.filter(i => isSameTypeOf(i)(value));
      break;
    case "does-not-extend":
      result = list.filter(i => !isSameTypeOf(i)(value));
      break;
  }

  return result as Filter<TList, TFilter, TOp>;
};
