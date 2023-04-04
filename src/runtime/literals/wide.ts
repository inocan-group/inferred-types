/* eslint-disable @typescript-eslint/ban-types */
import {  AnyFunction, AnyObject, Narrowable, Widen } from "src/types";


/**
 * **wide**
 *
 * Provides a dictionary of _wide_ types
 */
export const wide = {
  boolean: false as boolean,
  string: "" as string,
  number: 0 as number,
  symbol: Symbol() as symbol,
  null: null,
  function: (() => null) as AnyFunction,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  anyArray: [] as any[],
  anyObject: {} as AnyObject,
  unknownObject: {} as Record<string, unknown>,
  emptyObject: {} as {} & object,
  undefined: undefined,
} as const;

/**
 * **widen**(value)
 * 
 * Runtime utility which takes any _type_ and ensures it's widened to a wide
 * type of passed in value is a literal.
 */
export function widen<T extends Narrowable>(value: T): Widen<T> {
  return value as Widen<T>;
}
