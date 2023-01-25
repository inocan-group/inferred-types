import { ErrorCondition } from "../literals/ErrorCondition";
import { isErrorCondition } from "./isErrorCondition";

export const hasErrorConditions = <
  T extends readonly any[]
>(list: T): list is T & readonly [...any[], ErrorCondition<string>] => {
  return list.some(i => isErrorCondition(i));
};
