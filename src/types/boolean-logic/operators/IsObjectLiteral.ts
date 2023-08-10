/* eslint-disable @typescript-eslint/ban-types */
import { 
  AnyObject, 
  IfNever,
  RemoveIndexKeys,
  IfSomeEqual
} from "src/types";

/**
 * **IsObjectLiteral**`<T>`
 * 
 * Tests whether an object is a literal. An object literal is any of the following:
 * 
 * - an `EmptyObject`
 * - an `Indexable` object with at least one explicit key defined 
 */
export type IsObjectLiteral<T> = T extends AnyObject
? IfNever<
    RemoveIndexKeys<T>,
    false,
    IfSomeEqual<
      keyof RemoveIndexKeys<T>, [string | symbol, string, symbol],
      false,
      true
    >
  >
: false;
