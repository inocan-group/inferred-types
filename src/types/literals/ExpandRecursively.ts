import { AnyFunction } from "src/types/index";

// type ExpandTuple<
//   TLength extends number,
//   TContent extends Tuple,
//   TTuple extends Tuple = []
// > = TLength extends 0
//   ? Readonly<TTuple>
//   : ExpandTuple<
//       Decrement<TLength>,
//       AfterFirst<TContent>,
//       [...TTuple, First<TContent>]
//   >;

/**
 * Recursively goes over an object based structure and tries to reduce
 * it down to just a simple key/value type.
 */
export type ExpandRecursively<T> = T extends object
  ? { [K in keyof T]: T[K] extends AnyFunction
      ? T[K]
      : ExpandRecursively<T[K]> 
    }
  : T;
