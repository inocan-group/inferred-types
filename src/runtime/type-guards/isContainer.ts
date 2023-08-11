import { isObject } from "src/runtime";
import { Container } from "src/types";

export function isContainer<T>(value: T): value is T & Container {
  return Array.isArray(value) || isObject(value) ? true : false;
}
