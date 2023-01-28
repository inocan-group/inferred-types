import { Narrowable , KvPair } from "../../types";
import { isKvPair } from "./isKvPair";

export function isKvPairArray<
  K extends string, 
  V extends Narrowable, 
  T extends KvPair<K,V>[]
>(value: unknown | T): value is T {
  return Array.isArray(value) && (value as any[]).every(v => isKvPair(v));
}
