import { Filter,  FilterOps, Narrowable } from "../../types/base";
import { isSameTypeOf } from "src/runtime";

export const filter = <
  TList extends readonly unknown[],
  TOp extends FilterOps,
  TFilter extends Narrowable
>(
  list: TList, 
  op: TOp, 
  value: TFilter
) => {
  let result: unknown;

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
