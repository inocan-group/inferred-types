/**
 * **IsErrorCondition**`<T>`
 * 
 * Boolean type utility which checks whether `T` is an `ErrorCondition` type.
 */
export type IsErrorCondition<T> = T extends {}
  ? "_type" extends keyof T
    ? T["_type"] extends "ErrorCondition"
      ? true
      : false
    : false
  : false;
