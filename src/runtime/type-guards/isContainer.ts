import { isObject } from "src/runtime";

export function isContainer<T>(value: T): value is T extends readonly unknown[] 
  ? T & unknown[]
  : T & object {
  return Array.isArray(value) || isObject(value);
}
