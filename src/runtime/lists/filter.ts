// import { Filter,   Comparison } from "src/types/index";
// import { isSameTypeOf } from "../type-guards/higher-order/isSameTypeOf";
// import {  endsWith,startsWith } from "../type-guards";
// import { asArray } from "./asArray";
// import { Never } from "src/constants/index";


// /**
//  * **createFilter**(op,comparator) → (list) → _filtered results_
//  *
//  * A higher order runtime utility.
//  *
//  * - on it's first call it specifies the comparison that will be
//  * made in the future
//  * ```ts
//  * const filterOutStrings = createFilter("extends", s => s.string())
//  * ```
//  *  - all subsequent calls will receive an array of items and _filter out_
//  * the specified criteria
//  * ```ts
//  * // ["foo", "bar"]
//  * filterOutStrings([1,2,"foo","bar"]);
//  * ```
//  */
// export const createFilter = <
//   TComparison extends Comparison
// >(
//   comparison: TComparison
// ) => <
//  TList extends readonly unknown[]
// >(list: TList) => {
//   let result: unknown;



//   switch(op) {
//     case "equals":
//       result = list.filter(i => i === comparator);
//       break;
//     case "extends":
//       result = list.filter(i => isSameTypeOf(i)(comparator));
//       break;
//     case "startsWith":
//       result =  list.filter(i => startsWith(String(comparator))(String(i)));
//       break;
//     case "endsWith":
//       result = list.filter(i => endsWith(String(comparator))(String(i)));
//       break;
//     case "contains":
//       result = list.filter(i => contains(asArray(comparator))(i));
//       break;
//     case "containsAll":
//       // result = list.filter(i => contains())
//       break;
//     default:
//       result = Never
//   }

//   return result as Filter<TList, TComparator, TOp>;
// };

export const filter = "NOT READY";
