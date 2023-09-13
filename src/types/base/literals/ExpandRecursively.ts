import { AfterFirst, Decrement, First, Tuple } from "..";

type ExpandTuple<
  TLength extends number,
  TContent extends Tuple,
  TTuple extends Tuple = []
> = TLength extends 0
  ? Readonly<TTuple>
  : ExpandTuple<
      Decrement<TLength>,
      AfterFirst<TContent>,
      [...TTuple, First<TContent>]
  >;

/**
 * Recursively goes over an object based structure and tries to reduce
 * it down to just a simple key/value type.
 */
export type ExpandRecursively<T> = T extends Tuple
  ? T["length"] extends number
    ? ExpandTuple<T["length"], T>
    : T
  : T extends object
  ? { [K in keyof T]: ExpandRecursively<T[K]> }
  : T;
