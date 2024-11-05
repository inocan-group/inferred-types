import {  Dictionary,  IsObject } from "inferred-types/dist/types/index";
import { isObject } from "src/runtime/index";

type ContainerType<T> = T extends any[]
? any[]
: IsObject<T> extends true
  ? Dictionary
  : T extends Map<any,any>
  ? Map<any,any>
  : T extends Set<any>
  ? Set<any>
  : T extends WeakMap<any,any>
  ? WeakMap<any,any>
  : object;

export function isContainer<T>(value: T): value is T & ContainerType<T> {
  return Array.isArray(value) || isObject(value)
    ? true
    : false;
}
