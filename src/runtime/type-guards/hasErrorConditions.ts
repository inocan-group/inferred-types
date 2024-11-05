import { ErrorCondition } from "inferred-types/dist/types/index";
import { isErrorCondition } from "./isErrorCondition";

export const hasErrorConditions = <
  T extends readonly unknown[]
>(list: T): list is T & readonly [...unknown[], ErrorCondition<string>] => {
  return list.some(i => isErrorCondition(i));
};
