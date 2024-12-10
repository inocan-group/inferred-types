import type { ErrorCondition } from "inferred-types/types";
import { isErrorCondition } from "./isErrorCondition";

export function hasErrorConditions<
  T extends readonly unknown[],
>(list: T): list is T & readonly [...unknown[], ErrorCondition<string>] {
  return list.some(i => isErrorCondition(i));
}
