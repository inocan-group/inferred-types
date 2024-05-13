
import { 
  KV,
  IsWideType,
  IfNever,
  UnionToTuple,
  RemoveIndexKeys,
  ExplicitlyEmptyObject,
  If,
  IsEqual,
} from "src/types/index";

type _Keys<
  T extends KV
> = UnionToTuple<keyof RemoveIndexKeys<T>>;

type CheckIt<T extends KV> = IfNever<
  keyof T,
  false,
  "length" extends keyof _Keys<T>
  ? IsWideType<keyof T> extends true
    ? false
    : true
  : false
>

/**
 * **IsObjectLiteral**`<T>`
 * 
 * Tests whether an object is a literal. An object literal is any of the following:
 * 
 * - any KV-like type which has an **explicit** number of keys
 * - if `Keys<T>["length"]` translates to `number` than this is **not** a literal.
 */
export type IsObjectLiteral<T> = T extends KV
? If<
    IsEqual<T, ExplicitlyEmptyObject>,
    true,
    CheckIt<T>
  >
: false

