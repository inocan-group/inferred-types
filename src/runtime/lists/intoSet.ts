import {  IntoSet, SetCandidate } from "src/types/lists/sets";
import { Never } from "../runtime";
import { toKv } from "../type-conversion/toKv";
import {  isArray, isObject } from "../type-guards";



export function intoSet<T extends SetCandidate>(set: T) {
  return (
    isArray(set) 
      ? set
      : isObject(set) ? toKv(set) : Never
  ) as IntoSet<T>;
}
