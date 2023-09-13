/* eslint-disable @typescript-eslint/ban-types */
import { 
  AnyObject, 
  RemoveIndexKeys,
  EmptyObject,
  IsEqual,
  Keys,
  IndexableObject,
  IfNotEqual
} from "../..";

/**
 * **IsObjectLiteral**`<T>`
 * 
 * Tests whether an object is a literal. An object literal is any of the following:
 * 
 * - an `EmptyObject`
 * - an `Indexable` object with at least one explicit key defined 
 */
export type IsObjectLiteral<T> = T extends AnyObject
? IsEqual<T, EmptyObject> extends true
  ? true
  : RemoveIndexKeys<T> extends IndexableObject
    ? IfNotEqual<
        Keys<RemoveIndexKeys<T>>, readonly [],
        true, 
        false
      >
    : false
: false;
