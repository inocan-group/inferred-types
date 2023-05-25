import type { AnyObject } from "src/types";

/**
 * **IsErrorCondition**`<T>`
 * 
 * Boolean type utility which checks whether `T` is an `ErrorCondition` type.
 */
export type IsErrorCondition<T> = T extends AnyObject
  ? "_type" extends keyof T
    ? T["_type"] extends "ErrorCondition"
      ? true
      : false
    : false
  : false;
