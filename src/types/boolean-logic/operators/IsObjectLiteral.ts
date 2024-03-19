/* eslint-disable @typescript-eslint/ban-types */
import { 
  RemoveIndexKeys,
  EmptyObject,
  IsEqual,
  Keys,
  IfNotEqual,
  KV
} from "src/types/index";

/**
 * **IsObjectLiteral**`<T>`
 * 
 * Tests whether an object is a literal. An object literal is any of the following:
 * 
 * - an `EmptyObject`
 * - an `Indexable` object with at least one explicit key defined 
 */
export type IsObjectLiteral<T> = T extends KV
? IsEqual<T, EmptyObject> extends true
  ? true
  : RemoveIndexKeys<T> extends KV
    ? IfNotEqual<
        Keys<RemoveIndexKeys<T>>, readonly [],
        true, 
        false
      >
    : false
: false;
