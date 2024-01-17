import { isObject } from "src/runtime/index";
import { Container } from "src/types/index";

export function isContainer<T>(value: T): value is T & Container {
  return Array.isArray(value) || isObject(value) ? true : false;
}
