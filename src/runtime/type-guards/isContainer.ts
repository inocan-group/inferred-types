import { isObject } from "src/runtime";
import { Container } from "../../types/base";

export function isContainer<T>(value: T): value is T & Container {
  return Array.isArray(value) || isObject(value) ? true : false;
}
