
import { 
  KV,
  UnionToTuple,
  RemoveIndexKeys,
  ExplicitlyEmptyObject,
  IsEqual,
  IsNever,
} from "src/types/index";

type _Keys<
  T extends KV
> = UnionToTuple<keyof RemoveIndexKeys<T>>;

type CheckIt<T extends KV> = IsNever<keyof T> extends true
  ? false
  : IsEqual<_Keys<T>, []> extends true
    ? false
    : true;


/**
 * **IsObjectLiteral**`<T>`
 * 
 * Tests whether an object is a literal. An object literal is any of the following:
 * 
 * - any KV-like type which has an **explicit** number of keys
 * - if `Keys<T>["length"]` translates to `number` than this is **not** a literal.
 */
export type IsObjectLiteral<T> = T extends KV
? IsEqual<T, ExplicitlyEmptyObject> extends true
  ? true
  : CheckIt<T>
: false

