import { Narrowable } from "~/types";

export type IsBoolean<T> = T extends boolean ? true : false;

/**
 * Runtime and type checks whether a variable is a boolean value.
 */
export function isBoolean<T extends Narrowable>(i: T) {
  return (typeof i === "boolean") as T extends boolean ? true : false;
}
