import { ErrorCondition } from "../../types/base";
import { isErrorCondition } from "src/runtime";

export const hasErrorConditions = <
  T extends readonly unknown[]
>(list: T): list is T & readonly [...unknown[], ErrorCondition<string>] => {
  return list.some(i => isErrorCondition(i));
};
