import { Nothing } from "src/types/index";

export function isNothing<T>(val: T): val is T & Nothing {
  return val === null || val === undefined ? true : false;
}
